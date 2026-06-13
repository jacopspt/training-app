import { useState, useMemo, useRef, useEffect } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ---- COSTANTI ----
const RECUPERI = ["15s","30s","45s","60s","90s","2min","3min","4min","5min"];
const GRUPPI = ["Petto","Schiena","Spalle","Bicipiti","Tricipiti","Gambe","Glutei","Addome","Polpacci"];
const GCOL = {"Petto":"#c0392b","Schiena":"#1e3a5f","Spalle":"#8e44ad","Bicipiti":"#16a085","Tricipiti":"#d35400","Gambe":"#27ae60","Glutei":"#e91e8c","Addome":"#2980b9","Polpacci":"#7f8c8d"};
const TIPI = [{v:"fisso",l:"Carico fisso"},{v:"range",l:"Rep range"},{v:"emom",l:"EMOM"}];
const ESDB0 = {
  Petto:["Panca piana","Panca inclinata","Panca declinata","Croci manubri","Croci cavi","Dips","Push-up","Pec deck"],
  Schiena:["Trazioni","Lat machine","Rematore bilanciere","Rematore manubrio","Pulley","Facepull","Stacco","Scrollate"],
  Spalle:["Lento avanti","Lento dietro","Alzate laterali","Alzate frontali","Arnold press","Tirate al mento"],
  Bicipiti:["Curl bilanciere","Curl manubri","Curl inclinato","Curl martello","Curl concentrazione","Curl cavi"],
  Tricipiti:["French press","Pushdown cavi","Dips stretti","Kickback","Tricipiti cavi","Close grip bench"],
  Gambe:["Squat","Leg press","Affondi","Leg extension","Leg curl","Hack squat","Bulgarian split squat"],
  Glutei:["Hip thrust","Sumo squat","Abductor machine","Donkey kick","Cable kickback","Stacco rumeno"],
  Addome:["Crunch","Crunch cavi","Leg raise","Plank","Russian twist","Ab wheel"],
  Polpacci:["Calf raise in piedi","Calf raise seduto","Leg press calf","Donkey calf raise"]
};

// ---- UTILS ----
function uid(){ return Math.random().toString(36).slice(2,9); }
// Una "serie" ora vive dentro una settimana
function makeSerie(tipo="fisso"){ return {id:uid(),rec:"90s",rpe:"",tipo,kg:"",pct:"",usePct:false,rip:"",ripMin:"",ripMax:"",minuti:""}; }
function makeSettimana(){ return {serie:[makeSerie(),makeSerie(),makeSerie()]}; }
function makeEs(nW,g){ return {id:uid(),nome:"",gruppo:g||GRUPPI[0],note:"",commento:"",oneRM:"",oneRMauto:false,superset:"—",settimane:Array.from({length:nW},()=>makeSettimana())}; }
function makeScheda(){ return {id:uid(),nome:"Scheda A",nW:8,esercizi:[makeEs(8)]}; }
function makeProgSett(){ return {serie:[makeSerie(),makeSerie(),makeSerie()]}; }
function resizeEsSett(esercizio,nN){
  const cur=esercizio.settimane.length;
  if(nN>cur) return {...esercizio,settimane:[...esercizio.settimane,...Array.from({length:nN-cur},()=>makeSettimana())]};
  return {...esercizio,settimane:esercizio.settimane.slice(0,nN)};
}
function chgTipoSerie(serie,t){ return {...serie,tipo:t,kg:serie.kg,pct:serie.pct,usePct:serie.usePct,rip:"",ripMin:"",ripMax:"",minuti:""}; }
function rpeCol(v){ const n=parseFloat(v); if(!v||isNaN(n))return"#999"; if(n<=5)return"#27ae60"; if(n<=7)return"#f39c12"; if(n<=9)return"#e67e22"; return"#c0392b"; }
function getSsl(esercizi,eid){ const e=esercizi.find(x=>x.id===eid); if(!e||e.superset==="—")return null; const g=esercizi.filter(x=>x.superset===e.superset); return `${e.superset}${g.findIndex(x=>x.id===eid)+1}`; }
function ripStr(s){ if(s.tipo==="fisso")return s.rip||""; if(s.tipo==="range")return s.ripMin&&s.ripMax?`${s.ripMin}-${s.ripMax}`:""; if(s.tipo==="emom")return s.minuti&&s.rip?`${s.minuti}'x${s.rip}`:""; return""; }
function caricoStr(s){ return s.usePct?(s.pct?`${s.pct}%`:""):(s.kg?`${s.kg}kg`:""); }
function deepClone(x){ return JSON.parse(JSON.stringify(x)); }
function densitaColor(r){ const m={"15s":"#c0392b","30s":"#e67e22","45s":"#f39c12","60s":"#27ae60","90s":"#2d6a9f","2min":"#1e3a5f","3min":"#16537e","4min":"#0d3b5e","5min":"#0a2d4a"}; return m[r]||"#2d6a9f"; }
function pctChg(c,p){ if(!p||p===0)return null; return Math.round((c-p)/p*100); }

const S={
  i:(w,x={})=>({border:"1px solid var(--color-border-secondary)",borderRadius:6,padding:"3px 4px",fontSize:13,fontWeight:500,background:"var(--color-background-primary)",color:"var(--color-text-primary)",width:w,boxSizing:"border-box",textAlign:"center",...x}),
  th:{textAlign:"center",fontSize:10,fontWeight:600,color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",padding:"3px 4px",whiteSpace:"nowrap",background:"var(--color-background-secondary)"},
  td:{padding:"3px 4px",fontSize:13,verticalAlign:"top",border:"0.5px solid var(--color-border-tertiary)"},
  btn:(x={})=>({padding:"5px 12px",fontSize:12,border:"0.5px solid var(--color-border-tertiary)",borderRadius:6,background:"transparent",color:"var(--color-text-secondary)",cursor:"pointer",...x}),
  tab:(a)=>({padding:"6px 15px",fontSize:13,fontWeight:a?600:400,border:"0.5px solid "+(a?"var(--color-border-primary)":"var(--color-border-tertiary)"),borderRadius:6,background:a?"var(--color-background-secondary)":"transparent",color:a?"var(--color-text-primary)":"var(--color-text-secondary)",cursor:"pointer"}),
  wb:(a)=>({padding:"3px 8px",fontSize:11,border:"0.5px solid "+(a?"var(--color-border-primary)":"var(--color-border-tertiary)"),borderRadius:6,background:a?"var(--color-background-secondary)":"transparent",color:a?"var(--color-text-primary)":"var(--color-text-secondary)",cursor:"pointer"}),
  info:{background:"rgba(41,128,185,0.12)",color:"var(--color-text-info)",border:"0.5px solid rgba(41,128,185,0.3)"},
  success:{background:"rgba(39,174,96,0.12)",color:"var(--color-text-success)",border:"0.5px solid rgba(39,174,96,0.3)"},
};

// ---- SERIE BOX (una serie dentro una settimana) ----
function SerieBox({serie,rm,col,onUpd,onTogPct,onChgTipo,onDel,canDel,idx}){
  const eq=serie.usePct&&serie.pct&&rm?Math.round(rm*parseFloat(serie.pct)/100):null;
  return(
    <div style={{border:`1px solid ${col}33`,borderRadius:5,padding:"4px",marginBottom:4,background:"var(--color-background-primary)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:10,fontWeight:700,color:col}}>S{idx+1}</span>
        {canDel&&<button onClick={onDel} style={{fontSize:9,border:"none",background:"none",color:"#aaa",cursor:"pointer"}}>✕</button>}
      </div>
      {/* carico */}
      <div style={{display:"flex",alignItems:"center",gap:2,justifyContent:"center",marginBottom:2}}>
        <input type="number" value={serie.usePct?serie.pct:serie.kg} placeholder={serie.usePct?"%":"kg"}
          onChange={e=>onUpd(serie.usePct?"pct":"kg",e.target.value)} style={{...S.i(serie.usePct?32:38),fontSize:12}}/>
        <button onClick={onTogPct} style={{fontSize:8,padding:"1px 3px",border:"0.5px solid var(--color-border-tertiary)",borderRadius:3,background:serie.usePct?"rgba(41,128,185,0.2)":"transparent",color:serie.usePct?"var(--color-text-info)":"#999",cursor:"pointer"}}>{serie.usePct?"%":"kg"}</button>
      </div>
      {eq&&<div style={{fontSize:8,color:col,textAlign:"center",marginBottom:2}}>≈{eq}kg</div>}
      {/* rip per tipo */}
      {serie.tipo==="fisso"&&<div style={{display:"flex",alignItems:"center",gap:2,justifyContent:"center",marginBottom:2}}>
        <span style={{fontSize:8,color:"#999"}}>r</span>
        <input type="number" value={serie.rip} placeholder="—" onChange={e=>onUpd("rip",e.target.value)} style={{...S.i(32),fontSize:12}}/>
      </div>}
      {serie.tipo==="range"&&<div style={{display:"flex",alignItems:"center",gap:1,justifyContent:"center",marginBottom:2}}>
        <input type="number" value={serie.ripMin} placeholder="min" onChange={e=>onUpd("ripMin",e.target.value)} style={{...S.i(26),fontSize:11}}/>
        <span style={{fontSize:9}}>-</span>
        <input type="number" value={serie.ripMax} placeholder="max" onChange={e=>onUpd("ripMax",e.target.value)} style={{...S.i(26),fontSize:11}}/>
      </div>}
      {serie.tipo==="emom"&&<div style={{display:"flex",alignItems:"center",gap:1,justifyContent:"center",marginBottom:2}}>
        <input type="number" value={serie.minuti} placeholder="m" onChange={e=>onUpd("minuti",e.target.value)} style={{...S.i(24),fontSize:11}}/>
        <span style={{fontSize:8,color:"#999"}}>'x</span>
        <input type="number" value={serie.rip} placeholder="r" onChange={e=>onUpd("rip",e.target.value)} style={{...S.i(24),fontSize:11}}/>
      </div>}
      {/* tipo + rec + rpe */}
      <select value={serie.tipo} onChange={e=>onChgTipo(e.target.value)} style={{fontSize:9,width:"100%",marginBottom:2,padding:"1px"}}>
        {TIPI.map(t=><option key={t.v} value={t.v}>{t.l}</option>)}
      </select>
      <div style={{display:"flex",gap:2}}>
        <select value={serie.rec} onChange={e=>onUpd("rec",e.target.value)} style={{fontSize:9,flex:1,padding:"1px"}}>
          {RECUPERI.map(r=><option key={r}>{r}</option>)}
        </select>
        <input type="number" value={serie.rpe} placeholder="RPE" min={1} max={10} step={0.5}
          onChange={e=>onUpd("rpe",e.target.value)} style={{...S.i(34),fontSize:11,fontWeight:700,color:rpeCol(serie.rpe)}}/>
      </div>
    </div>
  );
}

// ---- COLONNA SETTIMANA ----
function SettColonna({sett,wi,rm,col,onUpdSerie,onTogPct,onChgTipo,onAddSerie,onDelSerie}){
  return(
    <td style={{...S.td,background:`${col}07`,minWidth:90,padding:"4px",verticalAlign:"top"}}>
      {sett.serie.map((serie,si)=>(
        <SerieBox key={serie.id} serie={serie} idx={si} rm={rm} col={col}
          canDel={sett.serie.length>1}
          onUpd={(f,v)=>onUpdSerie(wi,serie.id,f,v)}
          onTogPct={()=>onTogPct(wi,serie.id)}
          onChgTipo={(t)=>onChgTipo(wi,serie.id,t)}
          onDel={()=>onDelSerie(wi,serie.id)}/>
      ))}
      <button onClick={()=>onAddSerie(wi)} style={{width:"100%",fontSize:9,padding:"2px",border:`1px dashed ${col}55`,borderRadius:4,background:"transparent",color:col,cursor:"pointer"}}>+ serie</button>
    </td>
  );
}

// ---- CARD ESERCIZIO ----
function EsCard({e,rm,col,WL,scheda,esDB,gtag,ssLabel:ssl,inSS,uE,delEs,uSerie,togPct,chgTipo,addSerie,delSerie}){
  return(
    <div style={{marginBottom:inSS?"0":"1.75rem",border:inSS?"none":`1px solid ${col}33`,borderBottom:`1px solid ${col}22`,borderRadius:inSS?0:8,overflow:"hidden"}}>
      <div style={{background:`${col}12`,borderBottom:`2px solid ${col}55`,padding:"8px 14px",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        {ssl&&<span style={{fontSize:13,fontWeight:700,color:col,background:`${col}22`,border:`1px solid ${col}55`,borderRadius:4,padding:"2px 8px"}}>{ssl}</span>}
        <div style={{width:4,height:36,borderRadius:2,background:col,flexShrink:0}}/>
        <div style={{minWidth:200}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:3}}>{gtag(e.gruppo)}<select value={e.gruppo} onChange={ev=>uE(e.id,x=>({...x,gruppo:ev.target.value,nome:""}))} style={{fontSize:11}}>{GRUPPI.map(g=><option key={g}>{g}</option>)}</select></div>
          <select value={e.nome} onChange={ev=>uE(e.id,x=>({...x,nome:ev.target.value}))} style={{fontSize:14,fontWeight:700,border:"none",background:"transparent",color:"var(--color-text-primary)",padding:0,minWidth:190}}>
            <option value="">-- Seleziona esercizio --</option>{(esDB[e.gruppo]||[]).map(n=><option key={n}>{n}</option>)}
          </select>
        </div>
        <input placeholder="Note" value={e.note} onChange={ev=>uE(e.id,x=>({...x,note:ev.target.value}))} style={{border:"1px solid var(--color-border-secondary)",borderRadius:6,padding:"3px 5px",fontSize:11,background:"var(--color-background-primary)",color:"var(--color-text-primary)",width:110}}/>
        <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>SS:</span><select value={e.superset||"—"} onChange={ev=>uE(e.id,x=>({...x,superset:ev.target.value}))} style={{fontSize:11,width:52}}>{["—","A","B","C","D","E","F","G","H"].map(l=><option key={l}>{l}</option>)}</select></div>
        <div style={{display:"flex",alignItems:"center",gap:5,marginLeft:"auto"}}>
          <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>1RM</span>
          <label style={{fontSize:11,display:"flex",gap:3,alignItems:"center",color:"var(--color-text-secondary)"}}><input type="checkbox" checked={e.oneRMauto} onChange={ev=>uE(e.id,x=>({...x,oneRMauto:ev.target.checked}))}/>auto</label>
          {!e.oneRMauto&&<input type="number" placeholder="kg" value={e.oneRM} onChange={ev=>uE(e.id,x=>({...x,oneRM:ev.target.value}))} style={{...S.i(50)}}/>}
          <span style={{fontSize:14,fontWeight:700,color:col}}>{rm?`${Math.round(rm)}kg`:"—"}</span>
        </div>
        <button onClick={()=>delEs(e.id)} style={{padding:"4px 10px",fontSize:12,border:"0.5px solid var(--color-border-tertiary)",borderRadius:6,background:"transparent",color:"#aaa",cursor:"pointer"}}>✕</button>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:300}}>
          <thead>
            <tr>{WL.map((w,wi)=>(
              <th key={w} style={{...S.th,fontSize:11,fontWeight:700,color:col,background:`${col}18`,minWidth:90}}>
                {w} <span style={{fontSize:9,fontWeight:400,color:"var(--color-text-tertiary)"}}>({e.settimane[wi]?.serie.length||0} ser.)</span>
              </th>
            ))}</tr>
          </thead>
          <tbody>
            <tr>
              {e.settimane.map((sett,wi)=>(
                <SettColonna key={wi} sett={sett} wi={wi} rm={rm} col={col}
                  onUpdSerie={(w,sid,f,v)=>uSerie(e.id,w,sid,f,v)}
                  onTogPct={(w,sid)=>togPct(e.id,w,sid)}
                  onChgTipo={(w,sid,t)=>chgTipo(e.id,w,sid,t)}
                  onAddSerie={(w)=>addSerie(e.id,w)}
                  onDelSerie={(w,sid)=>delSerie(e.id,w,sid)}/>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{padding:"6px 12px"}}>
        <input placeholder="Commento stampa..." value={e.commento||""} onChange={ev=>uE(e.id,x=>({...x,commento:ev.target.value}))} style={{border:"1px solid var(--color-border-secondary)",borderRadius:6,padding:"3px 6px",fontSize:11,background:"var(--color-background-primary)",color:"#999",width:"100%",boxSizing:"border-box"}}/>
      </div>
    </div>
  );
}

// ---- EDITOR PROGRESSIONE ----
function ProgEditor({nWDef,onSave,onCancel}){
  const [nome,setNome]=useState("");
  const [desc,setDesc]=useState("");
  const [nW,setNW]=useState(nWDef||8);
  const [settimane,setSettimane]=useState(()=>Array.from({length:nWDef||8},()=>makeProgSett()));

  function chgNW(n){
    setNW(n);
    setSettimane(p=>n>p.length?[...p,...Array.from({length:n-p.length},()=>makeProgSett())]:p.slice(0,n));
  }
  function uSerie(wi,sid,f,v){setSettimane(p=>p.map((s,i)=>i===wi?{...s,serie:s.serie.map(sr=>sr.id===sid?{...sr,[f]:v}:sr)}:s));}
  function togPct(wi,sid){setSettimane(p=>p.map((s,i)=>i===wi?{...s,serie:s.serie.map(sr=>sr.id===sid?{...sr,usePct:!sr.usePct}:sr)}:s));}
  function chgT(wi,sid,t){setSettimane(p=>p.map((s,i)=>i===wi?{...s,serie:s.serie.map(sr=>sr.id===sid?chgTipoSerie(sr,t):sr)}:s));}
  function addS(wi){setSettimane(p=>p.map((s,i)=>i===wi?{...s,serie:[...s.serie,makeSerie()]}:s));}
  function delS(wi,sid){setSettimane(p=>p.map((s,i)=>i===wi?{...s,serie:s.serie.filter(sr=>sr.id!==sid)}:s));}

  const WL=Array.from({length:nW},(_,i)=>`W${i+1}`);

  return(
    <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,padding:"12px",background:"var(--color-background-primary)"}}>
      <p style={{fontSize:11,fontWeight:700,margin:"0 0 8px",letterSpacing:1,color:"var(--color-text-secondary)"}}>EDITOR PROGRESSIONE</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
        <input placeholder="Nome *" value={nome} onChange={e=>setNome(e.target.value)} style={{...S.i(170),textAlign:"left",fontSize:12,border:nome?"1px solid var(--color-border-secondary)":"1px solid #e74c3c"}}/>
        <input placeholder="Descrizione" value={desc} onChange={e=>setDesc(e.target.value)} style={{...S.i(200),textAlign:"left",fontSize:12}}/>
        <div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Settimane:</span>{[4,5,6,7,8,9,10,11,12].map(n=><button key={n} onClick={()=>chgNW(n)} style={S.wb(nW===n)}>{n}</button>)}</div>
      </div>
      <div style={{overflowX:"auto",marginBottom:10}}>
        <table style={{borderCollapse:"collapse"}}>
          <thead><tr>{WL.map((w,wi)=><th key={w} style={{...S.th,minWidth:90}}>{w} <span style={{fontWeight:400,fontSize:9,color:"#aaa"}}>({settimane[wi]?.serie.length} ser.)</span></th>)}</tr></thead>
          <tbody><tr>
            {settimane.map((sett,wi)=>(
              <td key={wi} style={{...S.td,minWidth:90,padding:"4px",verticalAlign:"top"}}>
                {sett.serie.map((serie,si)=>(
                  <SerieBox key={serie.id} serie={serie} idx={si} rm={null} col="#2980b9"
                    canDel={sett.serie.length>1}
                    onUpd={(f,v)=>uSerie(wi,serie.id,f,v)}
                    onTogPct={()=>togPct(wi,serie.id)}
                    onChgTipo={(t)=>chgT(wi,serie.id,t)}
                    onDel={()=>delS(wi,serie.id)}/>
                ))}
                <button onClick={()=>addS(wi)} style={{width:"100%",fontSize:9,padding:"2px",border:"1px dashed #2980b955",borderRadius:4,background:"transparent",color:"#2980b9",cursor:"pointer"}}>+ serie</button>
              </td>
            ))}
          </tr></tbody>
        </table>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{if(!nome.trim())return;onSave({id:uid(),nome:nome.trim(),desc,nW,settimane});}} style={S.btn(S.info)}>Salva nella cartella</button>
        {onCancel&&<button onClick={onCancel} style={S.btn()}>Annulla</button>}
      </div>
    </div>
  );
}

// ---- CARD PROGRESSIONE ----
function ProgCard({prog,esercizi,onApply,onDelete}){
  const [open,setOpen]=useState(false);
  const [selEs,setSelEs]=useState("");
  const [ok,setOk]=useState(false);
  function apply(){if(!selEs)return;onApply(selEs,prog);setOk(true);setTimeout(()=>setOk(false),1500);}
  const WL=Array.from({length:prog.nW},(_,i)=>`W${i+1}`);
  return(
    <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,background:"var(--color-background-primary)",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"var(--color-background-secondary)"}}>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{prog.nome}</div>{prog.desc&&<div style={{fontSize:10,color:"var(--color-text-secondary)"}}>{prog.desc}</div>}<div style={{fontSize:10,color:"#aaa"}}>{prog.nW} sett.</div></div>
        <button onClick={()=>setOpen(o=>!o)} style={{...S.btn(),padding:"3px 8px",fontSize:11}}>{open?"▲":"▼"}</button>
        {onDelete&&<button onClick={onDelete} style={{fontSize:11,border:"none",background:"none",color:"#aaa",cursor:"pointer"}}>✕</button>}
      </div>
      {open&&(
        <div style={{padding:"10px 12px"}}>
          <div style={{overflowX:"auto",marginBottom:10}}>
            <table style={{borderCollapse:"collapse",fontSize:10}}>
              <thead><tr>{WL.map((w,wi)=><th key={w} style={{...S.th,fontSize:9,minWidth:64}}>{w}</th>)}</tr></thead>
              <tbody><tr>
                {prog.settimane.map((sett,wi)=>(
                  <td key={wi} style={{...S.td,verticalAlign:"top",padding:"3px"}}>
                    {sett.serie.map((s,si)=>(
                      <div key={si} style={{fontSize:9,marginBottom:2,textAlign:"center"}}>
                        <span style={{fontWeight:700}}>S{si+1}:</span> {caricoStr(s)||"—"} {ripStr(s)?`× ${ripStr(s)}`:""}
                      </div>
                    ))}
                  </td>
                ))}
              </tr></tbody>
            </table>
          </div>
          {esercizi?.length>0&&(
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:8}}>
              <span style={{fontSize:11,color:"var(--color-text-secondary)",whiteSpace:"nowrap"}}>Applica a:</span>
              <select value={selEs} onChange={e=>setSelEs(e.target.value)} style={{fontSize:11,flex:1,minWidth:160}}><option value="">-- Esercizio --</option>{esercizi.map(e=><option key={e.id} value={e.id}>{e.nome||"(senza nome)"}</option>)}</select>
              <button onClick={apply} style={S.btn(ok?S.success:S.info)}>{ok?"✓ Applicato":"Applica"}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---- VOLUME TAB ----
function VolumeTab({schede,nW,get1RM}){
  const [sel,setSel]=useState(null);
  const WL=Array.from({length:nW},(_,i)=>`W${i+1}`);

  const dati=useMemo(()=>WL.map((w,wi)=>{
    const row={settimana:w,volume:0,_iS:0,_iC:0,_rc:{}};
    GRUPPI.forEach(g=>{row[g]={volume:0,_iS:0,_iC:0,_rc:{}};});
    schede.forEach(s=>s.esercizi.forEach(e=>{
      const rm=get1RM(e); const g=e.gruppo;
      const sett=e.settimane[wi];
      if(!sett)return;
      sett.serie.forEach(serie=>{
        row[g].volume+=1; row.volume+=1;
        let kg=null;
        if(serie.usePct&&serie.pct&&rm)kg=rm*parseFloat(serie.pct)/100;
        else if(serie.kg)kg=parseFloat(serie.kg);
        if(kg&&!isNaN(kg)){row[g]._iS+=kg;row[g]._iC++;row._iS+=kg;row._iC++;}
        const rec=serie.rec||"90s";
        row[g]._rc[rec]=(row[g]._rc[rec]||0)+1;
        row._rc[rec]=(row._rc[rec]||0)+1;
      });
    }));
    GRUPPI.forEach(g=>{
      row[g].intensita=row[g]._iC>0?Math.round(row[g]._iS/row[g]._iC):0;
      const keys=Object.keys(row[g]._rc);
      row[g].rec=keys.length?keys.sort((a,b)=>row[g]._rc[b]-row[g]._rc[a])[0]:"90s";
    });
    row.intensita=row._iC>0?Math.round(row._iS/row._iC):0;
    const keys=Object.keys(row._rc);
    row.rec=keys.length?keys.sort((a,b)=>row._rc[b]-row._rc[a])[0]:"90s";
    return row;
  }),[schede,nW]);

  const gruppiAttivi=GRUPPI.filter(g=>dati.some(d=>d[g].volume>0));
  const hasData=dati.some(d=>d.volume>0);

  const globalData=dati.map((d,i)=>({
    w:d.settimana, vol:d.volume, int:d.intensita||0,
    pct:i>0?pctChg(d.volume,dati[i-1].volume):null,
    fill:densitaColor(d.rec),
  }));

  const RBar=(props)=>{
    const {x,y,width,height,fill}=props;
    if(!height||height<=0) return null;
    return <rect x={x} y={y} width={width} height={Math.max(0,height)} fill={fill} rx={3}/>;
  };
  const makeLbl=(data)=>(props)=>{
    const {x,y,width,index}=props;
    const v=data[index]?.pct;
    if(v===null||v===undefined) return null;
    return <text x={x+width/2} y={y-5} textAnchor="middle" fontSize={9} fill={v>=0?"#27ae60":"#c0392b"} fontWeight={700}>{v>=0?`+${v}%`:`${v}%`}</text>;
  };

  const legDensita=[{c:"#c0392b",l:"15-30s"},{c:"#f39c12",l:"45-60s"},{c:"#2d6a9f",l:"90s"},{c:"#1e3a5f",l:"2-5min"}];

  if(!hasData){
    return <p style={{fontSize:12,color:"#aaa",padding:"2rem 0"}}>Nessun dato. Compila prima le schede.</p>;
  }

  const selData=sel?dati.map((d,i)=>({
    w:d.settimana, vol:d[sel]?.volume||0, int:d[sel]?.intensita||0,
    pct:i>0?pctChg(d[sel]?.volume||0,dati[i-1][sel]?.volume||0):null,
    fill:densitaColor(d[sel]?.rec||"90s"),
  })):[];

  return(
    <div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:"1rem",padding:"8px 12px",background:"var(--color-background-secondary)",borderRadius:8,alignItems:"center"}}>
        <span style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)"}}>DENSITÀ:</span>
        {legDensita.map(l=>(
          <div key={l.c} style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:11,height:11,borderRadius:2,background:l.c}}/>
            <span style={{fontSize:10,color:"var(--color-text-secondary)"}}>{l.l}</span>
          </div>
        ))}
        <span style={{fontSize:10,color:"var(--color-text-secondary)"}}>· <span style={{color:"#d4a017",fontWeight:700}}>linea</span>=intensità · <span style={{fontWeight:700}}>%</span>=variazione</span>
      </div>

      <p style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"var(--color-text-secondary)",margin:"0 0 8px"}}>RIEPILOGO GLOBALE</p>
      <div style={{width:"100%",height:290,marginBottom:"1.5rem"}}>
        <ResponsiveContainer>
          <ComposedChart data={globalData} margin={{top:22,right:44,left:-8,bottom:4}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)"/>
            <XAxis dataKey="w" tick={{fontSize:11}}/>
            <YAxis yAxisId="v" tick={{fontSize:10}}/>
            <YAxis yAxisId="i" orientation="right" tick={{fontSize:10}}/>
            <Tooltip contentStyle={{fontSize:11,borderRadius:8}} formatter={(v,n)=>n==="vol"?[v+" serie","Volume"]:n==="int"?[v+" kg","Intensità"]:v}/>
            <Bar yAxisId="v" dataKey="vol" shape={<RBar/>} label={makeLbl(globalData)}>
              {globalData.map((d,i)=><Cell key={i} fill={d.fill}/>)}
            </Bar>
            <Line yAxisId="i" type="monotone" dataKey="int" stroke="#d4a017" strokeWidth={2} dot={{r:3,fill:"#d4a017"}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"var(--color-text-secondary)",margin:"0 0 10px"}}>DETTAGLIO PER GRUPPO</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:"1rem"}}>
        {gruppiAttivi.map(g=>(
          <button key={g} onClick={()=>setSel(sel===g?null:g)} style={{padding:"4px 12px",fontSize:11,fontWeight:sel===g?700:400,border:`1px solid ${GCOL[g]}`,borderRadius:6,background:sel===g?GCOL[g]:"transparent",color:sel===g?"#fff":GCOL[g],cursor:"pointer"}}>{g}</button>
        ))}
      </div>

      {sel&&(
        <div style={{border:`1px solid ${GCOL[sel]}44`,borderRadius:8,padding:"1rem",marginBottom:"1.5rem",background:`${GCOL[sel]}07`}}>
          <p style={{fontSize:12,fontWeight:700,color:GCOL[sel],margin:"0 0 10px"}}>{sel}</p>
          <div style={{width:"100%",height:250}}>
            <ResponsiveContainer>
              <ComposedChart data={selData} margin={{top:22,right:44,left:-8,bottom:4}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)"/>
                <XAxis dataKey="w" tick={{fontSize:11}}/>
                <YAxis yAxisId="v" tick={{fontSize:10}}/>
                <YAxis yAxisId="i" orientation="right" tick={{fontSize:10}}/>
                <Tooltip contentStyle={{fontSize:11,borderRadius:8}} formatter={(v,n)=>n==="vol"?[v+" serie","Volume"]:n==="int"?[v+" kg","Intensità"]:v}/>
                <Bar yAxisId="v" dataKey="vol" shape={<RBar/>} label={makeLbl(selData)}>
                  {selData.map((d,i)=><Cell key={i} fill={d.fill}/>)}
                </Bar>
                <Line yAxisId="i" type="monotone" dataKey="int" stroke="#d4a017" strokeWidth={2} dot={{r:3,fill:"#d4a017"}}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div style={{overflowX:"auto",marginTop:"1rem"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead><tr><th style={{...S.th,textAlign:"left"}}>Sett.</th><th style={S.th}>Serie</th><th style={S.th}>Δ Vol</th><th style={S.th}>Intensità</th><th style={S.th}>Δ Int</th><th style={S.th}>Densità</th></tr></thead>
              <tbody>
                {dati.map((d,wi)=>{
                  const c=d[sel]||{volume:0,intensita:0,rec:"90s"};
                  const p=wi>0?dati[wi-1][sel]:null;
                  const dv=p?pctChg(c.volume,p.volume):null;
                  const di=p?pctChg(c.intensita,p.intensita):null;
                  const dc=densitaColor(c.rec);
                  return (
                    <tr key={wi} style={{background:wi%2===0?"transparent":"var(--color-background-secondary)"}}>
                      <td style={{...S.th,textAlign:"left",fontWeight:600}}>{WL[wi]}</td>
                      <td style={{...S.th,fontWeight:700,color:GCOL[sel]}}>{c.volume||"—"}</td>
                      <td style={{...S.th,color:dv===null?"#aaa":dv>=0?"#27ae60":"#c0392b",fontWeight:600}}>{dv===null?"—":dv>=0?`+${dv}%`:`${dv}%`}</td>
                      <td style={S.th}>{c.intensita?`${c.intensita} kg`:"—"}</td>
                      <td style={{...S.th,color:di===null?"#aaa":di>=0?"#27ae60":"#c0392b",fontWeight:600}}>{di===null?"—":di>=0?`+${di}%`:`${di}%`}</td>
                      <td style={S.th}><span style={{display:"inline-block",padding:"1px 7px",borderRadius:4,fontSize:10,background:dc+"22",color:dc,border:`1px solid ${dc}44`,fontWeight:600}}>{c.rec||"—"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- ANTEPRIMA STAMPA ----
function AnteprimaStampa({tipo,scheda,schede,settimana,WL,get1RM,getLog,onClose}){
  const taRef=useRef();
  const [copied,setCopied]=useState(false);
  const tl={fisso:"Fisso",range:"Range",emom:"EMOM"};

  const headerHTML=`<div class="header"><div class="logo-wrap">
    <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" fill="none" stroke="#2d3748" stroke-width="2.5"/>
      <ellipse cx="28" cy="19" rx="11" ry="13" fill="#16a085" opacity="0.75"/>
      <ellipse cx="21" cy="17" rx="7" ry="8" fill="#27ae60" opacity="0.65"/>
      <ellipse cx="35" cy="17" rx="7" ry="8" fill="#27ae60" opacity="0.65"/>
      <circle cx="28" cy="23" r="3.5" fill="#2d3748"/>
      <line x1="14" y1="25" x2="42" y2="25" stroke="#d4a017" stroke-width="1.8"/>
      <path d="M38,25 L41,20 L44,27 L47,22" fill="none" stroke="#d4a017" stroke-width="1.8"/>
      <path d="M23,25 Q26,33 28,39 Q30,33 33,25" fill="none" stroke="#2d3748" stroke-width="1.8"/>
    </svg>
    <div class="brand"><div class="brand-name">JACOPS<span style="color:#d4a017">PT</span></div><div class="brand-sub">Over 40 Fitness</div></div>
  </div><div class="doc-info"><strong>${tipo==="scheda"?"Scheda di Allenamento":"Diario di Allenamento"}</strong><br/>Data: ${new Date().toLocaleDateString("it-IT")}</div></div>`;

  const css=`*{box-sizing:border-box;}body{font-family:Arial,sans-serif;font-size:9pt;color:#111;margin:0;padding:10px;}
  .header{display:flex;align-items:center;justify-content:space-between;border-bottom:2.5px solid #1e3a5f;padding-bottom:10px;margin-bottom:14px;}
  .logo-wrap{display:flex;align-items:center;gap:10px;}.brand{line-height:1.3;}
  .brand-name{font-size:14pt;font-weight:700;color:#1e3a5f;letter-spacing:1px;}.brand-sub{font-size:8pt;color:#d4a017;font-weight:600;letter-spacing:2px;text-transform:uppercase;}
  .doc-info{text-align:right;font-size:8pt;color:#555;}
  h2{font-size:12pt;margin:0 0 6px;color:#1e3a5f;}h3{font-size:10pt;margin:10px 0 3px;border-bottom:1px solid #ccc;padding-bottom:2px;}
  table{width:100%;border-collapse:collapse;margin-bottom:8px;font-size:8pt;}
  th{background:#f0f0f0;font-weight:600;border:0.5px solid #aaa;padding:3px 4px;text-align:center;}
  td{border:0.5px solid #aaa;padding:3px 4px;text-align:center;vertical-align:top;}
  .serie-line{font-size:7.5pt;margin-bottom:2px;}.box{border:1px solid #ccc;height:16px;background:#fff;margin-top:1px;}
  .note{font-size:7.5pt;color:#555;margin:2px 0 5px;}.footer{margin-top:16px;padding-top:6px;border-top:1px solid #eee;font-size:7pt;color:#aaa;text-align:center;}`;

  function buildHTML(){
    let body="";
    if(tipo==="scheda"&&scheda){
      body=`${headerHTML}<h2>${scheda.nome} — ${WL.length} settimane</h2>`;
      scheda.esercizi.forEach(e=>{
        const rm=get1RM(e); const ssl=getSsl(scheda.esercizi,e.id);
        body+=`<h3>${ssl?`[${ssl}] `:""}${e.nome||"—"} — ${e.gruppo}${rm?` (1RM: ${Math.round(rm)}kg)`:""}</h3>`;
        if(e.note)body+=`<div class="note">Note: ${e.note}</div>`;
        body+=`<table><thead><tr>`;
        WL.forEach((w,wi)=>{body+=`<th style="min-width:80px">${w} (${e.settimane[wi]?.serie.length||0} ser.)</th>`;});
        body+=`</tr></thead><tbody><tr>`;
        e.settimane.forEach(sett=>{
          body+=`<td style="min-width:80px">`;
          sett.serie.forEach((s,si)=>{
            const c=caricoStr(s);const r=ripStr(s);
            body+=`<div class="serie-line"><b>S${si+1}</b> ${c||"—"}${c&&r?" × ":""}${r} <span style="color:#888">${s.rec||""}${s.rpe?` RPE${s.rpe}`:""}</span><div class="box"></div></div>`;
          });
          body+=`</td>`;
        });
        body+=`</tr></tbody></table>`;
        if(e.commento)body+=`<div class="note">Commento: ${e.commento}</div>`;
      });
    }
    if(tipo==="diario"){
      body=`${headerHTML}<h2>Diario allenamento — W${settimana+1}</h2>`;
      schede.forEach(s=>{
        body+=`<h3>${s.nome}</h3>`;
        s.esercizi.forEach(e=>{
          const rm=get1RM(e); const ssl=getSsl(s.esercizi,e.id);
          const sett=e.settimane[settimana];
          if(!sett)return;
          body+=`<div style="font-weight:700;font-size:9pt;margin:6px 0 3px">${ssl?`[${ssl}] `:""}${e.nome||"—"} — ${e.gruppo}${rm?` (1RM: ${Math.round(rm)}kg)`:""}</div>`;
          body+=`<table><thead><tr><th>S.</th><th>Tipo</th><th>Rec.</th><th>RPE</th><th>Pianificato</th><th style="min-width:52px">Eff. kg</th><th style="min-width:52px">Eff. rip</th><th style="min-width:52px">RPE eff.</th></tr></thead><tbody>`;
          sett.serie.forEach((s2,si)=>{
            const kgEq=s2.usePct&&s2.pct&&rm?Math.round(rm*parseFloat(s2.pct)/100):(s2.kg||"");
            const cTxt=s2.usePct&&s2.pct?(rm?`${s2.pct}%≈${kgEq}kg`:`${s2.pct}%`):(s2.kg?`${s2.kg}kg`:"—");
            const rTxt=ripStr(s2); const log=getLog(s.id,settimana,e.id,si);
            body+=`<tr><td style="font-weight:700">S${si+1}</td><td>${tl[s2.tipo]||""}</td><td>${s2.rec||""}</td><td style="color:${rpeCol(s2.rpe)};font-weight:700">${s2.rpe||"—"}</td><td>${cTxt}${rTxt?" "+rTxt:""}</td><td>${log.kg||`<div class="box"></div>`}</td><td>${log.rip||`<div class="box"></div>`}</td><td>${log.rpe||`<div class="box"></div>`}</td></tr>`;
          });
          body+=`</tbody></table>`;
        });
      });
    }
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Stampa</title><style>${css}</style></head><body>${body}<div class="footer">JacopsPT · Over 40 Fitness</div></body></html>`;
  }

  const html=buildHTML();
  function copyHTML(){if(taRef.current){taRef.current.select();document.execCommand("copy");setCopied(true);setTimeout(()=>setCopied(false),2000);}}

  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"var(--color-background-primary)",zIndex:9999,overflow:"auto",padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:14,fontWeight:700}}>📄 {tipo==="scheda"?"Scheda":"Diario W"+(settimana+1)}</span>
        <button onClick={onClose} style={{...S.btn(),marginLeft:"auto"}}>✕ Chiudi</button>
      </div>
      <iframe srcDoc={html} style={{flex:1,border:"1px solid var(--color-border-tertiary)",borderRadius:8,minHeight:400,background:"#fff"}} title="anteprima"/>
      <div style={{background:"rgba(41,128,185,0.08)",border:"0.5px solid rgba(41,128,185,0.3)",borderRadius:8,padding:"12px 14px"}}>
        <p style={{fontSize:12,fontWeight:700,margin:"0 0 6px",color:"var(--color-text-info)"}}>Come stampare:</p>
        <p style={{fontSize:11,color:"var(--color-text-secondary)",margin:"0 0 8px"}}>1. Copia HTML → 2. Incollalo in un file <strong>stampa.html</strong> → 3. Aprilo nel browser → 4. <strong>Ctrl+P</strong></p>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <textarea ref={taRef} readOnly value={html} style={{flex:1,height:56,fontSize:10,fontFamily:"monospace",border:"0.5px solid var(--color-border-tertiary)",borderRadius:6,padding:6,resize:"none",background:"var(--color-background-secondary)"}}/>
          <button onClick={copyHTML} style={S.btn(copied?S.success:S.info)}>{copied?"✓ Copiato!":"Copia HTML"}</button>
        </div>
      </div>
    </div>
  );
}

// ---- MODALI SALVATAGGIO ----
function ModaleSchedeSalva({schede,onSave,onClose}){
  const [nome,setNome]=useState("Le mie schede");
  const [sel,setSel]=useState(()=>Object.fromEntries(schede.map(s=>[s.id,true])));
  function toggle(id){setSel(p=>({...p,[id]:!p[id]}));}
  function save(){const inc=schede.filter(s=>sel[s.id]);if(!inc.length||!nome.trim())return;onSave({id:uid(),nome:nome.trim(),data:new Date().toLocaleDateString("it-IT"),schede:deepClone(inc)});}
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.4)",zIndex:8888,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"var(--color-background-primary)",borderRadius:12,padding:"1.5rem",width:340,maxWidth:"90vw",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
        <p style={{fontSize:14,fontWeight:700,margin:"0 0 12px"}}>💾 Salva schede</p>
        <input placeholder="Nome salvataggio *" value={nome} onChange={e=>setNome(e.target.value)} style={{...S.i("100%"),textAlign:"left",fontSize:13,marginBottom:12}}/>
        <p style={{fontSize:11,fontWeight:600,color:"var(--color-text-secondary)",margin:"0 0 6px"}}>Schede da includere:</p>
        {schede.map(s=>(<label key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer"}}><input type="checkbox" checked={!!sel[s.id]} onChange={()=>toggle(s.id)}/><span style={{fontSize:12}}>{s.nome}</span></label>))}
        <div style={{display:"flex",gap:8,marginTop:14}}><button onClick={save} style={S.btn(S.info)}>Salva</button><button onClick={onClose} style={S.btn()}>Annulla</button></div>
      </div>
    </div>
  );
}

function ModaleSchedeCarica({sv,onSovrascrivi,onNuova,onClose}){
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.4)",zIndex:8888,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"var(--color-background-primary)",borderRadius:12,padding:"1.5rem",width:340,maxWidth:"90vw",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
        <p style={{fontSize:14,fontWeight:700,margin:"0 0 4px"}}>📂 {sv.nome}</p>
        <p style={{fontSize:11,color:"var(--color-text-secondary)",margin:"0 0 4px"}}>{sv.data} · {sv.schede.map(s=>s.nome).join(", ")}</p>
        <p style={{fontSize:12,fontWeight:600,margin:"12px 0 10px"}}>Come caricarle?</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button onClick={onSovrascrivi} style={S.btn({...S.info,padding:"8px 12px",textAlign:"left"})}>🔄 Sostituisci schede attuali</button>
          <button onClick={onNuova} style={S.btn({padding:"8px 12px",textAlign:"left"})}>➕ Aggiungi come nuove</button>
          <button onClick={onClose} style={S.btn({padding:"8px 12px",textAlign:"left"})}>Annulla</button>
        </div>
      </div>
    </div>
  );
}

function SchedaSalvataCard({sv,onLoad,onDelete}){
  const [showLoad,setShowLoad]=useState(false);
  return(
    <>
      <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,background:"var(--color-background-primary)",padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{sv.nome}</div><div style={{fontSize:10,color:"#aaa"}}>{sv.data} · {sv.schede.map(s=>s.nome).join(", ")}</div></div>
        <button onClick={()=>setShowLoad(true)} style={S.btn(S.info)}>Carica</button>
        <button onClick={onDelete} style={{fontSize:11,border:"none",background:"none",color:"#aaa",cursor:"pointer"}}>✕</button>
      </div>
      {showLoad&&<ModaleSchedeCarica sv={sv} onSovrascrivi={()=>{onLoad("sovrascrivi",sv);setShowLoad(false);}} onNuova={()=>{onLoad("aggiungi",sv);setShowLoad(false);}} onClose={()=>setShowLoad(false)}/>}
    </>
  );
}

// ---- PERSISTENZA localStorage ----
const LS_KEY = "jacopt_training_v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Salvataggio fallito:", e);
  }
}

function usePersistedState(key, defaultValue) {
  const saved = loadFromStorage();
  const [state, setState] = useState(() => (saved && saved[key] !== undefined) ? saved[key] : defaultValue);
  return [state, setState];
}

// ---- APP ----
export default function App(){
  const [tab,setTab]=useState("schede");

  const initialSchede = () => {
    const saved = loadFromStorage();
    return (saved && saved.schede) ? saved.schede : [makeScheda()];
  };
  const [schede,setSchede]=useState(initialSchede);
  const [activeId,setActiveId]=useState(()=>{
    const saved = loadFromStorage();
    return (saved && saved.activeId) ? saved.activeId : schede[0]?.id;
  });
  const [logs,setLogs]=useState(()=>{
    const saved = loadFromStorage();
    return (saved && saved.logs) ? saved.logs : {};
  });
  const [settimana,setSettimana]=useState(0);
  const [esDB,setEsDB]=useState(()=>{
    const saved = loadFromStorage();
    return (saved && saved.esDB) ? saved.esDB : ESDB0;
  });
  const [showDB,setShowDB]=useState(false);
  const [showProg,setShowProg]=useState(false);
  const [showEditor,setShowEditor]=useState(false);
  const [cartella,setCartella]=useState(()=>{
    const saved = loadFromStorage();
    return (saved && saved.cartella) ? saved.cartella : [];
  });
  const [schedeSalvate,setSchedeSalvate]=useState(()=>{
    const saved = loadFromStorage();
    return (saved && saved.schedeSalvate) ? saved.schedeSalvate : [];
  });
  const [showSchSalvate,setShowSchSalvate]=useState(false);
  const [showSalvaModale,setShowSalvaModale]=useState(false);
  const [anteprima,setAnteprima]=useState(null);
  const [savedIndicator,setSavedIndicator]=useState(false);

  // ---- AUTO-SAVE: salva su localStorage ad ogni cambiamento ----
  useEffect(() => {
    saveToStorage({ schede, activeId, logs, esDB, cartella, schedeSalvate });
    setSavedIndicator(true);
    const t = setTimeout(() => setSavedIndicator(false), 1500);
    return () => clearTimeout(t);
  }, [schede, activeId, logs, esDB, cartella, schedeSalvate]);

  const scheda=schede.find(s=>s.id===activeId);
  const nW=scheda?.nW||8;
  const WL=Array.from({length:nW},(_,i)=>`W${i+1}`);

  const uS=fn=>setSchede(p=>p.map(s=>s.id===activeId?fn(s):s));
  const uE=(eid,fn)=>uS(s=>({...s,esercizi:s.esercizi.map(e=>e.id===eid?fn(e):e)}));
  function addScheda(){const n=makeScheda();n.nome=`Scheda ${String.fromCharCode(65+schede.length)}`;setSchede(p=>[...p,n]);setActiveId(n.id);}
  function delScheda(id){if(schede.length===1)return;const r=schede.filter(s=>s.id!==id);setSchede(r);setActiveId(r[0].id);}
  function chgNW(n){uS(s=>({...s,nW:n,esercizi:s.esercizi.map(e=>resizeEsSett(e,n))}));}
  function addEs(){uS(s=>({...s,esercizi:[...s.esercizi,makeEs(s.nW)]}));}
  function delEs(eid){uS(s=>({...s,esercizi:s.esercizi.filter(e=>e.id!==eid)}));}
  function uSerie(eid,wi,sid,f,v){uE(eid,e=>({...e,settimane:e.settimane.map((st,i)=>i===wi?{...st,serie:st.serie.map(sr=>sr.id===sid?{...sr,[f]:v}:sr)}:st)}));}
  function togPct(eid,wi,sid){uE(eid,e=>({...e,settimane:e.settimane.map((st,i)=>i===wi?{...st,serie:st.serie.map(sr=>sr.id===sid?{...sr,usePct:!sr.usePct}:sr)}:st)}));}
  function chgTipo(eid,wi,sid,t){uE(eid,e=>({...e,settimane:e.settimane.map((st,i)=>i===wi?{...st,serie:st.serie.map(sr=>sr.id===sid?chgTipoSerie(sr,t):sr)}:st)}));}
  function addSerie(eid,wi){uE(eid,e=>({...e,settimane:e.settimane.map((st,i)=>i===wi?{...st,serie:[...st.serie,makeSerie()]}:st)}));}
  function delSerie(eid,wi,sid){uE(eid,e=>({...e,settimane:e.settimane.map((st,i)=>i===wi?{...st,serie:st.serie.filter(sr=>sr.id!==sid)}:st)}));}
  function saveProg(p){setCartella(c=>[...c,p]);setShowEditor(false);}
  function delProg(id){setCartella(c=>c.filter(x=>x.id!==id));}
  function applyProg(esId,prog){
    setSchede(prev=>prev.map(s=>({...s,esercizi:s.esercizi.map(e=>{
      if(e.id!==esId)return e;
      const newSett=e.settimane.map((st,wi)=>{
        if(wi<prog.settimane.length){
          return {serie:prog.settimane[wi].serie.map(sr=>({...sr,id:uid()}))};
        }
        return st;
      });
      return {...e,settimane:newSett};
    })})));
  }
  function saveSchede(sv){setSchedeSalvate(p=>[...p,sv]);setShowSalvaModale(false);}
  function loadSchede(mode,sv){const cl=sv.schede.map(s=>({...deepClone(s),id:uid()}));if(mode==="sovrascrivi"){setSchede(cl);setActiveId(cl[0].id);}else{setSchede(p=>{const m=[...p,...cl];setActiveId(cl[0].id);return m;});}}
  function delSchedaSalvata(id){setSchedeSalvate(p=>p.filter(x=>x.id!==id));}
  function get1RM(e){if(e.oneRMauto){let best=null;Object.values(logs).forEach(b=>Object.values(b).forEach(arr=>arr.filter(l=>l.esId===e.id).forEach(l=>{const kg=parseFloat(l.kg),rip=parseFloat(l.rip);if(!isNaN(kg)&&!isNaN(rip)&&rip>0&&rip<=36){const rm=kg*(36/(37-rip));if(best===null||rm>best)best=rm;}})));return best;}return parseFloat(e.oneRM)||null;}
  function getLog(sid,wi,esId,si){return logs[sid]?.[wi]?.find(l=>l.esId===esId&&l.serieIdx===si)||{kg:"",rip:"",rpe:""};}
  function setLog(sid,wi,esId,si,f,v){setLogs(p=>{const b={...p[sid]};const arr=[...(b[wi]||[])];const idx=arr.findIndex(l=>l.esId===esId&&l.serieIdx===si);if(idx>=0)arr[idx]={...arr[idx],[f]:v};else arr.push({esId,serieIdx:si,kg:"",rip:"",rpe:"",[f]:v});b[wi]=arr;return {...p,[sid]:b};});}
  function addEsDB(g,n){if(!n.trim())return;setEsDB(p=>({...p,[g]:[...p[g],n.trim()]}));}
  function delEsDB(g,n){setEsDB(p=>({...p,[g]:p[g].filter(x=>x!==n)}));}

  const tuttiEs=schede.flatMap(s=>s.esercizi);
  const gtag=g=><span style={{display:"inline-block",padding:"2px 6px",borderRadius:4,fontSize:10,fontWeight:700,background:GCOL[g]+"22",color:GCOL[g],border:`1px solid ${GCOL[g]}44`}}>{g}</span>;
  const tl={fisso:"Fisso",range:"Range",emom:"EMOM"};
  function groupEs(esercizi){const groups=[];const seen=new Set();esercizi.forEach(e=>{if(e.superset==="—"){groups.push({type:"single",es:[e]});}else{if(!seen.has(e.superset)){seen.add(e.superset);groups.push({type:"ss",letter:e.superset,es:esercizi.filter(x=>x.superset===e.superset)});}}});return groups;}

  if(anteprima){
    return <AnteprimaStampa tipo={anteprima} scheda={scheda} schede={schede} settimana={settimana} WL={WL} get1RM={get1RM} getLog={getLog} onClose={()=>setAnteprima(null)}/>;
  }

  return(
    <div style={{fontFamily:"var(--font-sans)",padding:"1.25rem 1rem",maxWidth:1300,margin:"0 auto"}}>
      <style>{`input[type=number]::-webkit-inner-spin-button{opacity:0.4;}select{border:0.5px solid var(--color-border-secondary);border-radius:6px;padding:2px 5px;font-size:12px;background:var(--color-background-primary);color:var(--color-text-primary);}`}</style>
      {showSalvaModale&&<ModaleSchedeSalva schede={schede} onSave={saveSchede} onClose={()=>setShowSalvaModale(false)}/>}

      <div style={{marginBottom:"1rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div>
          <p style={{fontSize:17,fontWeight:700,margin:"0 0 2px"}}>Allenamento</p>
          <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:0}}>Schede · Diario · Volume</p>
        </div>
        <div style={{
          fontSize:11,
          padding:"3px 10px",
          borderRadius:20,
          background: savedIndicator ? "rgba(39,174,96,0.15)" : "transparent",
          color: savedIndicator ? "#27ae60" : "transparent",
          border: savedIndicator ? "0.5px solid rgba(39,174,96,0.4)" : "0.5px solid transparent",
          transition:"all 0.3s ease",
          fontWeight:600
        }}>✓ Salvato</div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:"1.25rem",flexWrap:"wrap",alignItems:"center"}}>
        {["schede","diario","volume"].map(t=><button key={t} onClick={()=>setTab(t)} style={S.tab(tab===t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
        <div style={{marginLeft:"auto",display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={()=>{setShowSchSalvate(o=>!o);setShowProg(false);setShowDB(false);}} style={S.tab(showSchSalvate)}>📁 Schede{schedeSalvate.length>0&&<span style={{fontSize:10,background:"rgba(39,174,96,0.2)",borderRadius:10,padding:"0 5px",marginLeft:3}}>{schedeSalvate.length}</span>}</button>
          <button onClick={()=>{setShowProg(o=>!o);setShowDB(false);setShowSchSalvate(false);}} style={S.tab(showProg)}>📋 Progressioni{cartella.length>0&&<span style={{fontSize:10,background:"rgba(41,128,185,0.2)",borderRadius:10,padding:"0 5px",marginLeft:3}}>{cartella.length}</span>}</button>
          <button onClick={()=>{setShowDB(o=>!o);setShowProg(false);setShowSchSalvate(false);}} style={S.tab(showDB)}>📝 Esercizi</button>
        </div>
      </div>

      {showSchSalvate&&(
        <div style={{marginBottom:"1.5rem",border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,padding:"1rem",background:"var(--color-background-secondary)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <p style={{fontSize:11,fontWeight:700,margin:0,letterSpacing:1,color:"var(--color-text-secondary)"}}>📁 SCHEDE SALVATE</p>
            <button onClick={()=>setShowSalvaModale(true)} style={S.btn(S.success)}>💾 Salva schede attuali</button>
          </div>
          {schedeSalvate.length===0?<div style={{textAlign:"center",padding:"1.5rem",color:"#aaa"}}><div style={{fontSize:28,marginBottom:6}}>📁</div><p style={{fontSize:12,margin:0}}>Nessuna scheda salvata.</p></div>:
          <div style={{display:"flex",flexDirection:"column",gap:8}}>{schedeSalvate.map(sv=><SchedaSalvataCard key={sv.id} sv={sv} onLoad={(m,s)=>loadSchede(m,s)} onDelete={()=>delSchedaSalvata(sv.id)}/>)}</div>}
        </div>
      )}

      {showProg&&(
        <div style={{marginBottom:"1.5rem",border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,padding:"1rem",background:"var(--color-background-secondary)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <p style={{fontSize:11,fontWeight:700,margin:0,letterSpacing:1,color:"var(--color-text-secondary)"}}>📋 CARTELLA PROGRESSIONI</p>
            <button onClick={()=>setShowEditor(o=>!o)} style={S.btn(showEditor?{}:S.info)}>{showEditor?"▲ Chiudi":"+ Nuova progressione"}</button>
          </div>
          {showEditor&&<div style={{marginBottom:"1.25rem"}}><ProgEditor nWDef={nW} onSave={saveProg} onCancel={()=>setShowEditor(false)}/></div>}
          {cartella.length===0&&!showEditor?<div style={{textAlign:"center",padding:"2rem",color:"#aaa"}}><div style={{fontSize:32,marginBottom:8}}>📂</div><p style={{fontSize:12,margin:0}}>Nessuna progressione salvata.</p></div>:
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:10}}>{cartella.map(p=><ProgCard key={p.id} prog={p} esercizi={tuttiEs} onApply={applyProg} onDelete={()=>delProg(p.id)}/>)}</div>}
        </div>
      )}

      {showDB&&(
        <div style={{marginBottom:"1.5rem",border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,padding:"1rem",background:"var(--color-background-secondary)"}}>
          <p style={{fontSize:11,fontWeight:700,margin:"0 0 12px",letterSpacing:1,color:"var(--color-text-secondary)"}}>GESTIONE ESERCIZI</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:14}}>
            {GRUPPI.map(g=>(
              <div key={g}><div style={{marginBottom:6}}>{gtag(g)}</div>
                {esDB[g].map(n=>(<div key={n} style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><span style={{fontSize:11,flex:1}}>{n}</span><button onClick={()=>delEsDB(g,n)} style={{fontSize:10,border:"none",background:"none",color:"#aaa",cursor:"pointer"}}>✕</button></div>))}
                <div style={{display:"flex",gap:4,marginTop:6}}>
                  <input placeholder="Aggiungi..." id={`db-${g}`} style={{...S.i("100%"),textAlign:"left",flex:1,fontSize:11,fontWeight:400}} onKeyDown={ev=>{if(ev.key==="Enter"){addEsDB(g,ev.target.value);ev.target.value="";}}}/>
                  <button onClick={()=>{const el=document.getElementById(`db-${g}`);addEsDB(g,el.value);el.value="";}} style={S.btn({fontSize:11,padding:"3px 8px"})}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="schede"&&scheda&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap",alignItems:"center"}}>
            {schede.map(s=><button key={s.id} onClick={()=>setActiveId(s.id)} style={{...S.tab(s.id===activeId),padding:"4px 12px",fontSize:12}}>{s.nome}</button>)}
            <button onClick={addScheda} style={S.btn()}>+ Nuova</button>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:"1.25rem",flexWrap:"wrap"}}>
            <input value={scheda.nome} onChange={e=>uS(s=>({...s,nome:e.target.value}))} style={{...S.i(200),fontSize:15,fontWeight:700,border:"1px solid var(--color-border-primary)",textAlign:"left"}}/>
            <div style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Settimane:</span>{Array.from({length:9},(_,i)=>i+4).map(n=><button key={n} onClick={()=>chgNW(n)} style={S.wb(nW===n)}>{n}</button>)}</div>
            {schede.length>1&&<button onClick={()=>delScheda(scheda.id)} style={S.btn({color:"#aaa",fontSize:11})}>Elimina</button>}
            <div style={{marginLeft:"auto",display:"flex",gap:8}}>
              <button onClick={()=>setShowSalvaModale(true)} style={S.btn(S.success)}>💾 Salva</button>
              <button onClick={()=>setAnteprima("scheda")} style={S.btn(S.info)}>🖨 Stampa</button>
            </div>
          </div>
          {groupEs(scheda.esercizi).map((group,gi)=>{
            if(group.type==="single"){
              const e=group.es[0];
              const rm=get1RM(e);
              const col=GCOL[e.gruppo]||"#1e3a5f";
              return <EsCard key={e.id} e={e} rm={rm} col={col} WL={WL} scheda={scheda} esDB={esDB} gtag={gtag} uE={uE} delEs={delEs} uSerie={uSerie} togPct={togPct} chgTipo={chgTipo} addSerie={addSerie} delSerie={delSerie}/>;
            }
            const letter=group.letter;
            const col2=GCOL[group.es[0]?.gruppo]||"#555";
            return (
              <div key={letter+gi} style={{marginBottom:"1.75rem",border:`2px solid ${col2}44`,borderRadius:8,overflow:"hidden"}}>
                <div style={{background:`${col2}10`,padding:"7px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${col2}33`}}>
                  <span style={{fontSize:13,fontWeight:700,color:col2}}>Superset {letter}</span>
                </div>
                {group.es.map((e,ei)=>{
                  const rm=get1RM(e);
                  const col=GCOL[e.gruppo]||"#1e3a5f";
                  return <EsCard key={e.id} e={e} rm={rm} col={col} WL={WL} scheda={scheda} esDB={esDB} gtag={gtag} ssLabel={`${letter}${ei+1}`} inSS uE={uE} delEs={delEs} uSerie={uSerie} togPct={togPct} chgTipo={chgTipo} addSerie={addSerie} delSerie={delSerie}/>;
                })}
              </div>
            );
          })}
          <button onClick={addEs} style={S.btn()}>+ Aggiungi esercizio</button>
        </div>
      )}

      {tab==="diario"&&(
        <div>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:"1rem",flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:"var(--color-text-secondary)"}}>Settimana:</span>
            {Array.from({length:nW},(_,i)=><button key={i} onClick={()=>setSettimana(i)} style={S.wb(settimana===i)}>W{i+1}</button>)}
            <button onClick={()=>setAnteprima("diario")} style={{...S.btn(S.info),marginLeft:"auto"}}>🖨 Stampa diario</button>
          </div>
          {schede.map(s=>(
            <div key={s.id} style={{marginBottom:"1.5rem"}}>
              <p style={{fontSize:14,fontWeight:700,margin:"0 0 10px",borderBottom:"1px solid var(--color-border-tertiary)",paddingBottom:6}}>{s.nome} — W{settimana+1}</p>
              {s.esercizi.map(e=>{
                const rm=get1RM(e);
                const col=GCOL[e.gruppo]||"#1e3a5f";
                const ssl=getSsl(s.esercizi,e.id);
                const sett=e.settimane[settimana];
                if(!sett) return null;
                return(
                  <div key={e.id} style={{marginBottom:"1rem",border:`1px solid ${col}33`,borderRadius:8,overflow:"hidden"}}>
                    <div style={{background:`${col}12`,borderBottom:`2px solid ${col}44`,padding:"7px 12px",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      {ssl&&<span style={{fontSize:12,fontWeight:700,color:col,background:`${col}22`,border:`1px solid ${col}44`,borderRadius:4,padding:"1px 7px"}}>{ssl}</span>}
                      {gtag(e.gruppo)}<span style={{fontSize:14,fontWeight:700}}>{e.nome||"—"}</span>
                      {e.note&&<span style={{fontSize:11,color:"var(--color-text-secondary)"}}>— {e.note}</span>}
                      {rm&&<span style={{fontSize:12,color:col,marginLeft:"auto",fontWeight:700}}>1RM: {Math.round(rm)}kg</span>}
                    </div>
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                      <thead><tr>
                        <th style={S.th}>S.</th><th style={S.th}>Tipo</th><th style={S.th}>Rec.</th><th style={S.th}>RPE</th>
                        <th style={{...S.th,background:"rgba(41,128,185,0.08)",color:"var(--color-text-info)"}}>Pianificato</th>
                        <th style={S.th}>Eff. kg</th><th style={S.th}>Eff. rip</th><th style={S.th}>RPE eff.</th><th style={S.th}>Δ kg</th>
                      </tr></thead>
                      <tbody>
                        {sett.serie.map((s2,si)=>{
                          const kgEq=s2.usePct&&s2.pct&&rm?Math.round(rm*parseFloat(s2.pct)/100):(parseFloat(s2.kg)||"");
                          const cTxt=s2.usePct&&s2.pct?(rm?`${s2.pct}% ≈${kgEq}kg`:`${s2.pct}%`):(s2.kg?`${s2.kg}kg`:"—");
                          const rTxt=ripStr(s2);
                          const log=getLog(s.id,settimana,e.id,si);
                          const delta=log.kg&&kgEq?Math.round((parseFloat(log.kg)-parseFloat(kgEq))*10)/10:null;
                          return (
                            <tr key={s2.id} style={{background:si%2===0?"transparent":"var(--color-background-secondary)"}}>
                              <td style={{...S.td,textAlign:"center",fontWeight:700,fontSize:14,color:col,verticalAlign:"middle"}}>S{si+1}</td>
                              <td style={{...S.td,textAlign:"center",fontSize:11,verticalAlign:"middle"}}>{tl[s2.tipo]||"—"}</td>
                              <td style={{...S.td,textAlign:"center",fontSize:12,color:"var(--color-text-secondary)",verticalAlign:"middle"}}>{s2.rec}</td>
                              <td style={{...S.td,textAlign:"center",fontWeight:700,fontSize:14,color:rpeCol(s2.rpe||""),verticalAlign:"middle"}}>{s2.rpe||"—"}</td>
                              <td style={{...S.td,textAlign:"center",color:"var(--color-text-info)",fontWeight:600,fontSize:13,verticalAlign:"middle"}}>{cTxt}{rTxt?" "+rTxt:""}</td>
                              <td style={{...S.td,textAlign:"center",verticalAlign:"middle"}}><input type="number" value={log.kg} placeholder="kg" onChange={ev=>setLog(s.id,settimana,e.id,si,"kg",ev.target.value)} style={{...S.i(52),fontSize:14}}/></td>
                              <td style={{...S.td,textAlign:"center",verticalAlign:"middle"}}><input type="number" value={log.rip} placeholder="rip" onChange={ev=>setLog(s.id,settimana,e.id,si,"rip",ev.target.value)} style={{...S.i(46),fontSize:14}}/></td>
                              <td style={{...S.td,textAlign:"center",verticalAlign:"middle"}}><input type="number" value={log.rpe||""} placeholder="RPE" min={1} max={10} step={0.5} onChange={ev=>setLog(s.id,settimana,e.id,si,"rpe",ev.target.value)} style={{...S.i(44),fontSize:14,fontWeight:700,color:rpeCol(log.rpe||"")}}/></td>
                              <td style={{...S.td,textAlign:"center",fontSize:13,fontWeight:700,verticalAlign:"middle",color:delta===null?"var(--color-text-tertiary)":delta>=0?"var(--color-text-success)":"var(--color-text-danger)"}}>{delta===null?"—":delta>=0?`+${delta}`:`${delta}`}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {tab==="volume"&&<VolumeTab schede={schede} nW={nW} get1RM={get1RM}/>}
    </div>
  );
}

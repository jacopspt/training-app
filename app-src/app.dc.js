
const GRUPPI=['Petto','Schiena','Spalle','Bicipiti','Tricipiti','Gambe','Glutei','Addome','Polpacci'];
const GCOL={Petto:'#c0392b',Schiena:'#1e3a5f',Spalle:'#8e44ad',Bicipiti:'#16a085',Tricipiti:'#d35400',Gambe:'#27ae60',Glutei:'#e91e8c',Addome:'#2980b9',Polpacci:'#7f8c8d'};
const RECUPERI=['15s','30s','45s','60s','90s','2min','3min','4min','5min'];
const TIPI_L={fisso:'Fisso',range:'Range',maxrep:'Max Rep',emom:'EMOM',tempo:'Tempo',test:'Test'};
const CARDIO_COL='#e67e22';
const ESDB0={Petto:['Panca piana','Panca inclinata','Croci manubri','Dips','Push-up','Pec deck'],Schiena:['Trazioni','Lat machine','Rematore bilanciere','Pulley','Facepull','Stacco'],Spalle:['Lento avanti','Alzate laterali','Alzate frontali','Arnold press'],Bicipiti:['Curl bilanciere','Curl manubri','Curl martello','Curl cavi'],Tricipiti:['French press','Pushdown cavi','Dips stretti','Close grip bench'],Gambe:['Squat','Leg press','Affondi','Leg extension','Leg curl','Hack squat'],Glutei:['Hip thrust','Sumo squat','Stacco rumeno','Cable kickback'],Addome:['Crunch','Leg raise','Plank','Ab wheel'],Polpacci:['Calf raise in piedi','Calf raise seduto','Leg press calf']};
function uid(){return Math.random().toString(36).slice(2,9);}
function num(v){if(v==null)return NaN;const n=parseFloat(String(v).replace(',','.'));return isNaN(n)?NaN:n;}

// ---- Scheda Cliente (Diario) ----
const PLICHE_MEAS=['Sovrailliaca','Addominale','Ascellare','Sottoscapolare','Pettorale','Coscia','Tricipite','Bicipite','Polpaccio','Avambraccio'];
const PLICHE_DERIV=['Somma Pliche','% Massa Grassa','Peso Massa Grassa','Peso Massa Magra','Peso Ideale','Ind. Obesità','Peso da Perdere'];
const CIRCONF_L=['Vita','Fianchi','Gamba Media','Gamba Alta','Gamba Bassa','Polpaccio','Braccio (contr.)','Braccio (ril.)','Spalle','Collo','Avambraccio','Polso','Caviglia','Ginocchio','Bacino','Ossa Circo'];
const TEST_PARTI=['Petto','Deltoidi','Bicipiti','Tricipiti','Dorsali','Adduttori Scapole','Quadricipiti','Ischiocrurali'];
const SOMATO=[{k:'ecto',nome:'Ectomorfo',desc:'Struttura esile, scheletro sottile'},{k:'meso',nome:'Mesomorfo',desc:'Sviluppo muscolare e scheletrico'},{k:'endo',nome:'Endomorfo',desc:'Parte adiposa predominante'}];
const FREQ=[{k:'4',t:'4 sedute / sett.',d:'Lun – Mar – Gio – Ven'},{k:'3',t:'3 sedute / sett.',d:'Lun – Mer – Ven'},{k:'2',t:'2 sedute / sett.',d:'Lun/Gio o Mar/Ven'},{k:'1',t:'1 seduta / sett.',d:'—'}];
function fill8(){return ['','','','','','','',''];}
function makeCliente(){return {id:uid(),
  cover:{atleta:'',dataInizio:'',programma:'',coach:'',scadenza:''},
  anag:{cognome:'',nome:'',dataNascita:'',sesso:'',email:'',professione:'',attivitaSportiva:'',anzianita:''},
  antro:{altezza:'',pesoAttuale:'',pesoMax:'',pesoMin:'',peso20:'',pesoInizioSport:''},
  somato:'',problemi:'',plicoFormula:'jp7',plicoEta:'',
  stile:{fumo:'',alcol:'',caffe:'',qualitaSonno:'',oreSonno:'',regolaritaPasti:''},
  pasti:{colazione:'',spuntinoMattina:'',pranzo:'',spuntinoPomeriggio:'',cena:'',primaCoricarsi:''},
  farmaci:'',obiettivi:{breve:'',lungo:''},storico:[],
  fase:{micro:'',meso:'',macro:''},frequenza:'',
  divisione:{a:'',b:'',c:'',d:'',full:''},
  puls:{riposo:fill8(),d15:fill8(),d120:fill8()},pesoMattino:fill8(),
  pliche:PLICHE_MEAS.map(n=>({nome:n,deriv:false,inizio:'',fine:''})).concat(PLICHE_DERIV.map(n=>({nome:n,deriv:true,inizio:'',fine:''}))),
  circonf:CIRCONF_L.map(n=>({nome:n,inizio:'',fine:''})),
  testInizio:{data:'',righe:TEST_PARTI.map(p=>({parte:p,es:'',carico:'',rip:''}))},
  testFine:{data:'',righe:TEST_PARTI.map(p=>({parte:p,es:'',carico:'',rip:''}))},
  hatfield:TEST_PARTI.map(p=>({parte:p,es:'',carico:'',rip:'',fibra:''})),
  nutri:makeNutri()
};}
function makeNutri(){return {
  pesoOv:'',bf:'',
  attivita:'moderato',fattoreAtt:'',allenamentiSett:'',tipoLavoro:'sedentario',
  intolleranze:[],intollNote:'',fontiProt:'miste',patologie:'',integratoriUso:'',
  regime:'onnivoro',regimeAltro:'',alimentiEsclusi:'',nPasti:'5',orariPasti:'',tempoCucina:'',
  obiettivo:'ricomposizione',pesoTarget:'',timeline:'',ritmo:'moderato',
  bmrFormula:'auto',adjMode:'perc',adjVal:'-10',
  protPerKg:'2',protBase:'peso',fatMode:'perkg',fatPerKg:'0.9',fatPerc:'25',
  carbCyc:false,carbCycMode:'grammi',carbCycVal:'60',
  timingOn:true,giorni:{lun:true,mar:false,mer:true,gio:false,ven:true,sab:false,dom:false},orarioAllen:'18:30',preMin:'90',postMin:'60',intraOn:false,
  tipoAllen:'pesi',
  integratori:[],
  promptTpl:DEFAULT_NUTRI_TPL,genMode:'archetipo',piano:null,pianiStorico:[]
};}
const DEFAULT_NUTRI_TPL="Costruisci un piano alimentare settimanale bilanciato, vario e sostenibile, adatto a un soggetto over 40 che si allena.\nUsa alimenti comuni italiani, facili da reperire e preparare. Rispetta RIGOROSAMENTE le kcal e i macro target indicati per ogni giorno (tolleranza \u00b15%). Per ogni pasto fornisci 1-2 alternative equivalenti. Distribuisci i pasti secondo il numero e gli orari indicati.\n\nVARIET\u00c0 OBBLIGATORIA: NON ripetere gli stessi alimenti giorno dopo giorno. Nell'arco della settimana ruota il pi\u00f9 possibile le fonti alimentari.\n- Fonti proteiche: alterna proteine ANIMALI (pollo, tacchino, manzo magro, maiale magro, uova, pesce bianco, pesce azzurro/salmone, tonno, latticini come yogurt greco/ricotta/skyr, bresaola) e proteine VEGETALI (legumi: lenticchie, ceci, fagioli, piselli, edamame; tofu, tempeh, seitan, soia, proteine vegetali in polvere, frutta secca, hummus). Includi ALMENO 2-3 pasti a base di proteine vegetali ogni giorno o distribuiti nella settimana, e non usare la stessa fonte proteica in due pasti consecutivi.\n- Fonti di carboidrati: ruota tra riso, pasta, patate/patate dolci, pane integrale, avena, quinoa, farro, orzo, mais, frutta varia.\n- Fonti di grassi: alterna olio EVO, frutta secca varia, semi, avocado, pesce grasso.\n- Verdura e frutta: cambia colori e tipologie nei vari giorni.";
const NUTRI_SYS="Sei un nutrizionista sportivo esperto. Rispondi ESCLUSIVAMENTE con un oggetto JSON valido, senza preamboli, commenti, spiegazioni n\u00e9 backticks. Schema OBBLIGATORIO:\n{\"settimana\":[{\"giorno\":\"lun\",\"tipoGiorno\":\"ON\",\"totali\":{\"kcal\":0,\"proteine\":0,\"carboidrati\":0,\"grassi\":0},\"pasti\":[{\"nome\":\"Colazione\",\"orario\":\"07:00\",\"alimenti\":[{\"alimento\":\"...\",\"grammi\":0,\"kcal\":0,\"p\":0,\"c\":0,\"g\":0}],\"totali\":{\"kcal\":0,\"proteine\":0,\"carboidrati\":0,\"grassi\":0},\"alternative\":[\"...\"]}],\"integrazione\":[{\"nome\":\"...\",\"dose\":\"...\",\"timing\":\"...\",\"kcal\":0,\"p\":0,\"c\":0,\"g\":0}]}]}\nTutti i valori numerici senza unit\u00e0. Gli integratori con conteggio attivo sono gi\u00e0 inclusi nei totali giornalieri; struttura i pasti solidi sui macro residui. VARIA le fonti alimentari nell'arco della settimana: non ripetere gli stessi alimenti in giorni diversi e alterna fonti proteiche animali E vegetali (legumi, tofu, tempeh, seitan, soia). Nessun testo fuori dal JSON.";
const MODEL_NUTRI='claude-sonnet-4-5';
function stripFences(s){s=String(s||'').trim();s=s.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');const a=s.indexOf('{'),b=s.lastIndexOf('}');if(a>=0&&b>a)s=s.slice(a,b+1);return s;}
function parseNutriJSON(raw){try{return JSON.parse(stripFences(raw));}catch(e){return null;}}
const CAT_MAP=[[/pollo|tacchino|manzo|vitello|bovin|maiale|prosciutto|bresaola|carne|hamburger/i,'Carne'],[/pesce|salmone|tonno|merluzzo|orata|branzino|gamber|sgombro|acciug/i,'Pesce'],[/uov|albume/i,'Uova'],[/latt|yogurt|skyr|ricotta|formagg|mozzarella|grana|parmigiano|fiocchi di latte/i,'Latticini'],[/avena|riso|pasta|pane|farro|orzo|quinoa|patat|cereali|fette|gallett|mais|couscous|polenta/i,'Cereali & amidi'],[/mela|banana|pera|aranc|frutti|fragol|mirtill|kiwi|uva|pesc|albicoc|frutta/i,'Frutta'],[/insalata|spinaci|zucchin|pomodor|verdur|broccol|carota|melanzan|peperon|cavol|finocchi|cetriol|rucola/i,'Verdura'],[/mandorl|noci|nocciol|arachid|semi|pistacch|frutta secca/i,'Frutta secca & semi'],[/olio|burro|avocado|tahin/i,'Grassi & condimenti'],[/whey|caseine|creatina|omega|vitamina|magnesio|multivitaminico|citrullina|caffeina|beta-alanina|elettroliti|zinco|ashwagandha|malto|gainer|integrat/i,'Integratori']];
function catOf(nome){for(var i=0;i<CAT_MAP.length;i++)if(CAT_MAP[i][0].test(nome))return CAT_MAP[i][1];return 'Altro';}
function makeIntegr(){return {id:uid(),nome:'',dose:'',unita:'g',freq:'ogni',giorni:[],timing:'colazione',conteggia:false,kcal:'',p:'',c:'',g:'',note:''};}
const ATT_FACT={sedentario:1.2,leggero:1.375,moderato:1.55,attivo:1.725,'molto attivo':1.9};
const GG=[{k:'lun',t:'Lun'},{k:'mar',t:'Mar'},{k:'mer',t:'Mer'},{k:'gio',t:'Gio'},{k:'ven',t:'Ven'},{k:'sab',t:'Sab'},{k:'dom',t:'Dom'}];
const INTEGR_COMUNI=['Whey','Caseine','Creatina monoidrato','Omega 3','Vitamina D','Magnesio','Multivitaminico','Citrullina','Caffeina','Beta-alanina','Elettroliti','Zinco','Ashwagandha','Maltodestrine','Gainer'];
const INTOLL_COMUNI=['Lattosio','Glutine','Nichel','Fruttosio','Uova','Frutta a guscio','Soia','Crostacei'];
function r0(v){return isNaN(v)?null:Math.round(v);}
const RITMI={lento:{loss:0.005,gain:0.002,lab:'lento'},moderato:{loss:0.0075,gain:0.0035,lab:'moderato'},veloce:{loss:0.01,gain:0.005,lab:'veloce'}};
function defSug(cli,C){var N=cli.nutri||{};var pw=C.peso,tw=num(N.pesoTarget),tdee=C.tdee;
  if(isNaN(pw)||isNaN(tw)||isNaN(tdee)||Math.abs(tw-pw)<0.3)return{show:false};
  var delta=tw-pw,loss=delta<0;var R=RITMI[N.ritmo]||RITMI.moderato;
  var rateKg=(loss?R.loss:R.gain)*pw;rateKg=loss?Math.min(rateKg,1.1):Math.min(rateKg,0.5);
  var weeks=Math.max(1,Math.round(Math.abs(delta)/rateKg));
  var daily=Math.round((rateKg*7700/7)/10)*10*(loss?-1:1);
  return{show:true,loss:loss,daily:daily,weeks:weeks,rateKg:rateKg,from:r1(pw),to:r1(tw),ritmoLab:R.lab};}
function r1(v){return isNaN(v)?null:Math.round(v*10)/10;}
function nutriCalc(cli,plicoBF){
  var n=cli.nutri||makeNutri();
  var pesoBase=num(cli.antro&&cli.antro.pesoAttuale);
  var peso=(n.pesoOv!==''&&!isNaN(num(n.pesoOv)))?num(n.pesoOv):pesoBase;
  var altezza=num(cli.antro&&cli.antro.altezza);
  var eta=num(cli.plicoEta)||ageFromDate(cli.anag.dataNascita);
  var sesso=cli.anag.sesso||'M';
  var bf=(n.bf!==''&&!isNaN(num(n.bf)))?num(n.bf):((plicoBF!=null)?plicoBF:NaN);
  var hasW=!isNaN(peso);
  var lbm=(!isNaN(bf)&&hasW)?peso*(1-bf/100):NaN;
  var fatKg=(!isNaN(bf)&&hasW)?peso*bf/100:NaN;
  var bmr=NaN,bmrName='';
  var F=n.bmrFormula||'auto';
  var mifflin=function(){return (hasW&&!isNaN(altezza)&&!isNaN(eta))?(10*peso+6.25*altezza-5*eta+(sesso==='F'?-161:5)):NaN;};
  if(F==='katch'){if(!isNaN(lbm)){bmr=370+21.6*lbm;bmrName='Katch-McArdle';}}
  else if(F==='harris'){if(hasW&&!isNaN(altezza)&&!isNaN(eta)){bmr=(sesso==='F')?(447.593+9.247*peso+3.098*altezza-4.330*eta):(88.362+13.397*peso+4.799*altezza-5.677*eta);bmrName='Harris-Benedict';}}
  else if(F==='owen'){if(hasW){bmr=(sesso==='F')?(795+7.18*peso):(879+10.2*peso);bmrName='Owen';}}
  else if(F==='lyle'){if(!isNaN(lbm)){bmr=500+22*lbm;bmrName='Lyle McDonald (Cunningham)';}}
  else if(F==='mifflin'){bmr=mifflin();if(!isNaN(bmr))bmrName='Mifflin-St Jeor';}
  else {if(!isNaN(lbm)){bmr=370+21.6*lbm;bmrName='Katch-McArdle';}else{bmr=mifflin();if(!isNaN(bmr))bmrName='Mifflin-St Jeor';}}
  if(isNaN(bmr)){if(!isNaN(lbm)){bmr=370+21.6*lbm;bmrName='Katch-McArdle (fallback)';}else{bmr=mifflin();if(!isNaN(bmr))bmrName='Mifflin-St Jeor (fallback)';}}
  var fact=(n.fattoreAtt!==''&&!isNaN(num(n.fattoreAtt)))?num(n.fattoreAtt):(ATT_FACT[n.attivita]||1.55);
  var tdee=!isNaN(bmr)?bmr*fact:NaN;
  var kcalTarget=NaN;
  if(!isNaN(tdee)){kcalTarget=(n.adjMode==='kcal')?tdee+(num(n.adjVal)||0):tdee*(1+(num(n.adjVal)||0)/100);}
  var baseW=(n.protBase==='magra'&&!isNaN(lbm))?lbm:peso;
  var protG=!isNaN(baseW)?(num(n.protPerKg)||0)*baseW:NaN;
  var fatG;
  if(n.fatMode==='perc')fatG=!isNaN(kcalTarget)?(kcalTarget*(num(n.fatPerc)||0)/100)/9:NaN;
  else fatG=!isNaN(peso)?(num(n.fatPerKg)||0)*peso:NaN;
  var carbG=(!isNaN(kcalTarget)&&!isNaN(protG)&&!isNaN(fatG))?(kcalTarget-protG*4-fatG*9)/4:NaN;
  var integr=Array.isArray(n.integratori)?n.integratori:[];
  var sK=0,sP=0,sC=0,sG=0;
  integr.forEach(function(it){if(it.conteggia){sK+=num(it.kcal)||0;sP+=num(it.p)||0;sC+=num(it.c)||0;sG+=num(it.g)||0;}});
  var foodProt=isNaN(protG)?NaN:protG-sP,foodCarb=isNaN(carbG)?NaN:carbG-sC,foodFat=isNaN(fatG)?NaN:fatG-sG,foodKcal=isNaN(kcalTarget)?NaN:kcalTarget-sK;
  var kcalMacros=(!isNaN(protG)&&!isNaN(carbG)&&!isNaN(fatG))?protG*4+carbG*4+fatG*9:NaN;
  var pctP=(!isNaN(kcalMacros)&&kcalMacros>0)?protG*4/kcalMacros*100:NaN;
  var pctC=(!isNaN(kcalMacros)&&kcalMacros>0)?carbG*4/kcalMacros*100:NaN;
  var pctG=(!isNaN(kcalMacros)&&kcalMacros>0)?fatG*9/kcalMacros*100:NaN;
  var carbOff=carbG;
  if(n.carbCyc&&!isNaN(carbG)){carbOff=(n.carbCycMode==='kcal')?carbG-(num(n.carbCycVal)||0)/4:carbG-(num(n.carbCycVal)||0);}
  return {peso:peso,altezza:altezza,eta:eta,sesso:sesso,bf:bf,lbm:lbm,fatKg:fatKg,bmr:bmr,bmrName:bmrName,fact:fact,tdee:tdee,kcalTarget:kcalTarget,
    protG:protG,fatG:fatG,carbG:carbG,carbOff:carbOff,kcalMacros:kcalMacros,pctP:pctP,pctC:pctC,pctG:pctG,
    sK:sK,sP:sP,sC:sC,sG:sG,foodProt:foodProt,foodCarb:foodCarb,foodFat:foodFat,foodKcal:foodKcal,carbNeg:(!isNaN(carbG)&&carbG<0)};
}
function setPath(obj,path,val){const ks=path.split('.');let o=obj;for(let i=0;i<ks.length-1;i++)o=o[ks[i]];o[ks[ks.length-1]]=val;}
function getPath(obj,path){const ks=path.split('.');let o=obj;for(let i=0;i<ks.length;i++){if(o==null)return undefined;o=o[ks[i]];}return o;}
function brzycki(carico,rip){const c=num(carico),r=num(rip);if(isNaN(c)||isNaN(r)||r<=0)return null;const d=1.0278-0.0278*r;if(d<=0)return null;return c/d;}
function fibraFromRip(rip){const r=num(rip);if(isNaN(r))return '';if(r<7)return 'Bianche (veloci)';if(r<=12)return 'Miste';return 'Rosse (lente)';}
function cliLabel(c){const n=((c.anag.cognome||'')+' '+(c.anag.nome||'')).trim();return n||(c.cover&&c.cover.atleta)||'Nuovo atleta';}
function looksBlank(p){if(!p||typeof p!=='object')return true;const noProg=!(Array.isArray(p.cartella)&&p.cartella.length);const noSaved=!(Array.isArray(p.schedeSalvate)&&p.schedeSalvate.length);const noClient=!(Array.isArray(p.clienti)&&p.clienti.some(c=>c&&c.anag&&(c.anag.cognome||c.anag.nome||(c.pliche||[]).some(x=>x.inizio||x.fine))));const noWork=!(Array.isArray(p.schede)&&p.schede.some(s=>s&&Array.isArray(s.esercizi)&&s.esercizi.length));return noProg&&noSaved&&noClient&&noWork;}
const RECSEC={'15s':15,'30s':30,'45s':45,'60s':60,'90s':90,'2min':120,'3min':180,'4min':240,'5min':300};
const CMPPAL=['#1e3a5f','#d4a017','#27ae60','#c0392b','#8e44ad','#2980b9','#16a085','#d35400'];
// Plicometria — formule % massa grassa (densità → Siri)
const PLICO_FORMULAS=[
  {k:'jp7',label:'Jackson-Pollock 7 pliche',sites:{both:['Pettorale','Ascellare','Tricipite','Sottoscapolare','Addominale','Sovrailliaca','Coscia']}},
  {k:'jp3',label:'Jackson-Pollock 3 pliche',sites:{M:['Pettorale','Addominale','Coscia'],F:['Tricipite','Sovrailliaca','Coscia']}},
  {k:'dw4',label:'Durnin-Womersley 4 pliche',sites:{both:['Bicipite','Tricipite','Sottoscapolare','Sovrailliaca']}}
];
function plicoSites(formula,sesso){const f=PLICO_FORMULAS.find(x=>x.k===formula)||PLICO_FORMULAS[0];if(f.sites.both)return f.sites.both;return f.sites[sesso==='F'?'F':'M'];}
function ageFromDate(s){if(!s)return null;const m=String(s).match(/(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})/);if(m){let y=+m[3];if(y<100)y+=(y>30?1900:2000);const bd=new Date(y,(+m[2])-1,+m[1]);if(!isNaN(bd.getTime())){const n=new Date();let a=n.getFullYear()-bd.getFullYear();const md=n.getMonth()-bd.getMonth();if(md<0||(md===0&&n.getDate()<bd.getDate()))a--;return (a>0&&a<120)?a:null;}}const ym=String(s).match(/(19|20)\d{2}/);if(ym){const a=new Date().getFullYear()-(+ym[0]);return (a>0&&a<120)?a:null;}return null;}
function parseIT(s){const m=String(s||'').match(/(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})/);if(!m)return null;let y=+m[3];if(y<100)y+=2000;const d=new Date(y,+m[2]-1,+m[1]);return isNaN(d.getTime())?null:d;}
function dwCoef(F,age){const band=age<20?0:age<30?1:age<40?2:age<50?3:4;const M=[[1.1620,0.0630],[1.1631,0.0632],[1.1422,0.0544],[1.1620,0.0700],[1.1715,0.0779]];const W=[[1.1549,0.0678],[1.1599,0.0717],[1.1423,0.0632],[1.1333,0.0612],[1.1339,0.0645]];const a=(F?W:M)[band];return {c:a[0],m:a[1]};}
function bodyDensity(formula,sesso,age,sum){if((sesso!=='M'&&sesso!=='F')||!age||!sum||sum<=0)return null;const F=sesso==='F';
  if(formula==='jp7')return F?(1.097-0.00046971*sum+0.00000056*sum*sum-0.00012828*age):(1.112-0.00043499*sum+0.00000055*sum*sum-0.00028826*age);
  if(formula==='jp3')return F?(1.0994921-0.0009929*sum+0.0000023*sum*sum-0.0001392*age):(1.10938-0.0008267*sum+0.0000016*sum*sum-0.0002574*age);
  if(formula==='dw4'){const c=dwCoef(F,age);return c.c-c.m*Math.log10(sum);}
  return null;}
function siriBF(bd){if(!bd||bd<=0)return null;const v=495/bd-450;return (v>0&&v<70)?v:null;}
function makeSerie(){return {id:uid(),rec:'90s',rpe:'',tut:'',tipo:'fisso',kg:'',pct:'',rm:'',caricoMode:'kg',usePct:false,rip:'',ripMin:'',ripMax:'',minuti:'',secondi:''};}
function makeSett(){return {serie:[makeSerie(),makeSerie(),makeSerie()]};}
function makeEs(nW,g,nome){return {id:uid(),nome:nome||'',gruppo:g||GRUPPI[0],note:'',commento:'',video:'',oneRM:'',oneRMauto:false,superset:'—',collapsed:false,settimane:Array.from({length:nW},makeSett)};}
function makeAtt(){return {id:uid(),tipoAtt:'Corsa',tempo:'',intervalliStruttura:'',fcMin:'',fcMax:'',fcTipo:'zona',rpe:'',note:''};}
function makeCardioSett(){return {attivita:[makeAtt()]};}
function makeCardioEs(nW){return {id:uid(),tipo:'cardio',nome:'Cardio',posizione:'separata',collapsed:false,settimane:Array.from({length:nW},makeCardioSett)};}
function makeScheda(nome){return {id:uid(),nome:nome||'Scheda A',nW:8,esercizi:[makeEs(8)],cardio:[]};}
function clone(x){return JSON.parse(JSON.stringify(x));}
function rpeCol(v){const n=num(v);if(!v||isNaN(n))return '#9aa0a8';if(n<=5)return '#27ae60';if(n<=7)return '#e0900a';if(n<=9)return '#dd6b1f';return '#c0392b';}
function densCol(r){const m={'15s':'#c0392b','30s':'#e67e22','45s':'#e0900a','60s':'#27ae60','90s':'#2d6a9f','2min':'#1e3a5f','3min':'#16537e','4min':'#0d3b5e','5min':'#0a2d4a'};return m[r]||'#2d6a9f';}
function ripStr(s){if(s.tipo==='test')return s.rip?'test '+s.rip:'test';if(s.tipo==='fisso')return s.rip||'';if(s.tipo==='maxrep')return s.rip?s.rip+'+':'max';if(s.tipo==='range')return (s.ripMin&&s.ripMax)?s.ripMin+'-'+s.ripMax:'';if(s.tipo==='emom'){if(s.minuti&&s.rip)return 'EMOM '+s.minuti+"'×"+s.rip;if(s.minuti)return 'EMOM '+s.minuti+"'";if(s.rip)return 'EMOM ×'+s.rip;return 'EMOM';}if(s.tipo==='tempo')return s.secondi?s.secondi+'sec':'';return '';}
function caricoStr(s){const m=serieMode(s);if(m==='pct')return s.pct?s.pct+'%':'';if(m==='rm')return s.rm?s.rm+' RM':'';return s.kg?s.kg+'kg':'';}
function serieMode(s){return s.caricoMode||(s.usePct?'pct':'kg');}
function caricoVM(s){const m=serieMode(s);const map={kg:{v:s.kg,f:'kg',ph:'kg',lab:'kg',bg:'#fff',col:'#9aa0a8'},pct:{v:s.pct,f:'pct',ph:'%',lab:'%',bg:'rgba(41,128,185,.15)',col:'#1f6aa0'},rm:{v:s.rm,f:'rm',ph:'RM',lab:'RM',bg:'rgba(192,57,43,.13)',col:'#c0392b'}};return map[m];}
function rmToKg(oneRM,reps){const r=num(reps);if(!oneRM||isNaN(r)||r<1)return null;const d=1.0278-0.0278*r;return d>0?oneRM*d:null;}
function serieKg(s,oneRM){const m=serieMode(s);if(m==='pct')return (s.pct&&oneRM)?oneRM*num(s.pct)/100:null;if(m==='rm')return (s.rm&&oneRM)?rmToKg(oneRM,s.rm):null;return s.kg?num(s.kg):null;}
function planLoadTxt(s,oneRM){const m=serieMode(s);if(m==='pct'){if(!s.pct)return '—';const eq=oneRM?Math.round(oneRM*num(s.pct)/100):null;return eq?s.pct+'%≈'+eq+'kg':s.pct+'%';}if(m==='rm'){if(!s.rm)return '—';const eq=oneRM?Math.round(rmToKg(oneRM,s.rm)):null;return eq?s.rm+'RM≈'+eq+'kg':s.rm+'RM';}return s.kg?s.kg+'kg':'—';}
function pctChg(c,p){if(!p||p===0)return null;return Math.round((c-p)/p*100);}
function resizeEs(e,n){const cur=e.settimane.length;if(n>cur)return Object.assign({},e,{settimane:e.settimane.concat(Array.from({length:n-cur},makeSett))});return Object.assign({},e,{settimane:e.settimane.slice(0,n)});}
function resizeCardio(e,n){const cur=e.settimane.length;if(n>cur)return Object.assign({},e,{settimane:e.settimane.concat(Array.from({length:n-cur},makeCardioSett))});return Object.assign({},e,{settimane:e.settimane.slice(0,n)});}
function get1RMfromLogs(logs,esId){let best=null;Object.values(logs||{}).forEach(b=>Object.values(b).forEach(arr=>{(arr||[]).filter(l=>l.esId===esId).forEach(l=>{const kg=num(l.kg),rip=num(l.rip);if(!isNaN(kg)&&!isNaN(rip)&&rip>0&&rip<=36){const rm=kg*(36/(37-rip));if(best===null||rm>best)best=rm;}});}));return best;}

function idbO(){return new Promise((res,rej)=>{const r=indexedDB.open('jpt_media',1);r.onupgradeneeded=()=>{r.result.createObjectStore('media');};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
function idbPut(k,v){return idbO().then(db=>new Promise((res,rej)=>{const t=db.transaction('media','readwrite');t.objectStore('media').put(v,k);t.oncomplete=res;t.onerror=()=>rej(t.error);}));}
function idbGet(k){return idbO().then(db=>new Promise((res,rej)=>{const q=db.transaction('media').objectStore('media').get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error);}));}
function idbDel(k){return idbO().then(db=>new Promise((res,rej)=>{const t=db.transaction('media','readwrite');t.objectStore('media').delete(k);t.oncomplete=res;t.onerror=()=>rej(t.error);}));}
function shrinkImage(file){return new Promise(res=>{const img=new Image();img.onload=()=>{const M=1600;let w=img.width,h=img.height;if(Math.max(w,h)>M){const k=M/Math.max(w,h);w=Math.round(w*k);h=Math.round(h*k);}const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);URL.revokeObjectURL(img.src);c.toBlob(b=>res(b||file),'image/jpeg',.85);};img.onerror=()=>res(file);img.src=URL.createObjectURL(file);});}
const PROG_TIPI={volume:{label:'Volume',col:'#27ae60'},densita:{label:'Densità',col:'#2980b9'},intensita:{label:'Intensificazione',col:'#c0392b'},mista:{label:'Mista',col:'#8e44ad'}};
const CHECK_SLOTS=[{slot:'front',label:'FRONTALE',icon:'📷',video:false},{slot:'back',label:'POSTERIORE',icon:'📷',video:false},{slot:'latdx',label:'LATERALE DESTRO',icon:'📷',video:false},{slot:'latsx',label:'LATERALE SINISTRO',icon:'📷',video:false},{slot:'video',label:'VIDEO POSING',icon:'🎥',video:true}];

function estRM(logs,esId,crit){let best=null,bestW=-1;Object.values(logs||{}).forEach(b=>Object.keys(b||{}).forEach(w=>{(b[w]||[]).forEach(l=>{if(l.esId!==esId)return;const rm=brzycki(l.kg,l.rip);if(rm==null)return;const wi=+w;
  if(crit==='max'){if(best===null||rm>best){best=rm;bestW=wi;}}
  else{if(wi>bestW){best=rm;bestW=wi;}else if(wi===bestW&&(best===null||rm>best))best=rm;}
});}));return best!=null?{val:Math.round(best*10)/10,week:bestW}:null;}
function prilepinFor(pct){const p=num(pct);if(isNaN(p))return null;if(p<75)return{row:'70%',rip:'4',n:4};if(p<85)return{row:'80%',rip:'3',n:5};if(p<=92)return{row:'90%',rip:'2',n:4};return{row:'>90%',rip:'1',n:3};}

const TABBASE="border:none;border-radius:9px;padding:9px 18px;font-weight:800;font-size:14px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:.02em;";
const PANELBASE='border-radius:9px;padding:8px 13px;font-weight:700;font-size:12.5px;cursor:pointer;';

class Component extends DCLogic {
  state=(()=>{
    const def={tab:'schede',activeId:null,settimana:0,volMode:'forza',selGroup:null,panel:null,
      saveModal:false,saveName:'Le mie schede',saveSel:{},saveClienteId:null,progEditor:false,pd:null,
      schede:[makeScheda('Scheda A')],logs:{},cardioLogs:{},cartella:[],schedeSalvate:[],noteSessione:{},checkMedia:{},checks:{},esDB:clone(ESDB0),videoDB:{},dbDraft:{},
      builder:{settimane:8,sessioni:[{id:uid(),nome:'Seduta A',esercizi:[]}]},picker:null,bulkGroup:'Petto',bulkText:'',bulkSerie:{},schedaWeek:-1,splitModels:[],splitModal:false,splitName:'',genDefaults:{accPct:'10'},
      clienti:[makeCliente()],clienteId:null,cliSearch:'',
      volView:'confronto',cmpSel:{},cmpGroup:'all',
      nutriDay:0,nutriView:'piano',promptOpen:false,genLoading:false,genErr:'',genProgress:null,genPromptCopy:''};
    def.activeId=def.schede[0].id;def.clienteId=def.clienti[0].id;
    const validScheda=(s)=>s&&typeof s==='object'&&Array.isArray(s.esercizi)&&s.esercizi.every(e=>e&&Array.isArray(e.settimane)&&e.settimane.every(w=>w&&Array.isArray(w.serie)))&&(!s.cardio||(Array.isArray(s.cardio)&&s.cardio.every(c=>Array.isArray(c.settimane)&&c.settimane.every(w=>w&&Array.isArray(w.attivita)))));
    // Persistenza completa: clienti, schede di lavoro, log, note, storico programmi salvati, progressioni, modelli e DB esercizi restano in memoria.
    try{let raw=localStorage.getItem('jpt_dc_v1');let p=null;try{p=raw?(JSON.parse(raw)||null):null;}catch(e){p=null;}
      if(looksBlank(p)){try{const bak=localStorage.getItem('jpt_dc_v1_bak');if(bak){const pb=JSON.parse(bak);if(!looksBlank(pb))p=pb;}}catch(e){}}
      if(p){
      const m={...def};
      if(Array.isArray(p.cartella))m.cartella=p.cartella;
      if(Array.isArray(p.schedeSalvate))m.schedeSalvate=p.schedeSalvate.filter(sv=>sv&&Array.isArray(sv.schede)&&sv.schede.every(validScheda));
      if(p.esDB&&typeof p.esDB==='object'&&GRUPPI.every(g=>Array.isArray(p.esDB[g])))m.esDB=p.esDB;
      if(p.videoDB&&typeof p.videoDB==='object')m.videoDB=p.videoDB;
      if(Array.isArray(p.splitModels))m.splitModels=p.splitModels.filter(md=>md&&Array.isArray(md.sessioni)).map(md=>({id:md.id||uid(),nome:md.nome||'Modello',settimane:md.settimane||8,sessioni:md.sessioni.map(se=>({nome:se.nome||'Seduta',esercizi:Array.isArray(se.esercizi)?se.esercizi.filter(x=>x&&x.nome):[]}))}));
      if(Array.isArray(p.clienti)&&p.clienti.length){m.clienti=p.clienti.map(c=>Object.assign(makeCliente(),c,{id:c.id||uid()}));m.clienteId=(p.clienteId&&m.clienti.some(c=>c.id===p.clienteId))?p.clienteId:m.clienti[0].id;}
      if(Array.isArray(p.schede)&&p.schede.length&&p.schede.every(validScheda)){m.schede=p.schede;m.activeId=(p.activeId&&p.schede.some(s=>s.id===p.activeId))?p.activeId:p.schede[0].id;}
      if(p.logs&&typeof p.logs==='object')m.logs=p.logs;
      if(p.cardioLogs&&typeof p.cardioLogs==='object')m.cardioLogs=p.cardioLogs;
      if(p.noteSessione&&typeof p.noteSessione==='object')m.noteSessione=p.noteSessione;
      if(p.checkMedia&&typeof p.checkMedia==='object')m.checkMedia=p.checkMedia;
      if(p.checks&&typeof p.checks==='object')m.checks=p.checks;
      if(p.genDefaults&&typeof p.genDefaults==='object')m.genDefaults=Object.assign({accPct:'10'},p.genDefaults);
      return m;
    }}catch(e){}
    return def;
  })();
  componentDidMount(){this._dp=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();this._dp=e;});
    let ok=false;try{localStorage.setItem('jpt_test','1');ok=localStorage.getItem('jpt_test')==='1';localStorage.removeItem('jpt_test');}catch(e){ok=false;}
    if(!ok)this.setState({storageOK:false});
    try{const ex=JSON.parse(localStorage.getItem('jpt_dc_v1'));this._seq=(ex&&ex._seq)||0;}catch(e){this._seq=0;}
    this._flush=()=>{this.persist();};
    window.addEventListener('beforeunload',this._flush);window.addEventListener('pagehide',this._flush);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')this._flush();});}
  persist(){try{const{saveModal,progEditor,pd,panel,saveSel,saveClienteId,dbDraft,storageOK,picker,pickerPos,bulkText,splitModal,cliSearch,bulkSerie,gw,cf,progFilter,_pt,genLoading,genErr,genProgress,promptOpen,genPromptCopy,...rest}=this.state;
    // Guardia multi-finestra: non sovrascrivere dati salvati da un'istanza più recente
    let curSeq=0;try{const ex=JSON.parse(localStorage.getItem('jpt_dc_v1'));curSeq=(ex&&ex._seq)||0;}catch(e){}
    if(curSeq>(this._seq||0)&&!this._dirty)return false;
    this._seq=Math.max(curSeq,this._seq||0)+1;this._dirty=false;rest._seq=this._seq;
    const json=JSON.stringify(rest);localStorage.setItem('jpt_dc_v1',json);if(!looksBlank(rest)){try{localStorage.setItem('jpt_dc_v1_bak',json);}catch(e){}}return true;}catch(e){return false;}}
  componentDidUpdate(){this._dirty=true;clearTimeout(this._sv);const el=document.getElementById('__saveIndic');if(el){el.textContent='⟳ Salvataggio…';el.style.color='#9a6a08';el.style.opacity='1';}this._sv=setTimeout(()=>{const okSave=this.persist();const e2=document.getElementById('__saveIndic');if(e2){if(okSave){const t=new Date();e2.textContent='✓ Salvato '+('0'+t.getHours()).slice(-2)+':'+('0'+t.getMinutes()).slice(-2);e2.style.color='#1e8e5a';}else{e2.textContent='⚠ Non salvato — usa Export';e2.style.color='#c0392b';}e2.style.opacity='1';}},600);}

  active(){return this.state.schede.find(s=>s.id===this.state.activeId)||this.state.schede[0];}
  mutA(fn){this.setState(st=>({schede:st.schede.map(s=>s.id!==st.activeId?fn(clone(s)):s).map(s=>s)}));}
  mutAct(fn){this.setState(st=>({schede:st.schede.map(s=>s.id===st.activeId?fn(s):s)}));}
  mutEs(eid,fn){this.mutAct(s=>Object.assign({},s,{esercizi:s.esercizi.map(e=>e.id===eid?fn(e):e)}));}
  mutCardio(cid,fn){this.mutAct(s=>Object.assign({},s,{cardio:(s.cardio||[]).map(c=>c.id===cid?fn(c):c)}));}

  // nav
  onTab=(e)=>this.setState({tab:e.currentTarget.dataset.t});
  onPanel=(e)=>{const p=e.currentTarget.dataset.p;this.setState(st=>({panel:st.panel===p?null:p}));};
  onClosePanel=()=>this.setState({panel:null});
  onInstall=()=>{if(this._dp)this._dp.prompt();else alert('Per installare:\n• iPhone (Safari): Condividi → Aggiungi a Home\n• Android (Chrome): menu ⋮ → Installa app\n• Desktop: icona installa nella barra indirizzi');};

  // scheda
  onPickScheda=(e)=>this.setState({activeId:e.currentTarget.dataset.id});
  onAddScheda=()=>{const n=makeScheda('Scheda '+String.fromCharCode(65+this.state.schede.length));this.setState(st=>({schede:st.schede.concat([n]),activeId:n.id}));};
  onDelScheda=()=>{if(this.state.schede.length<=1){this._toast('Non puoi eliminare l\'unica scheda');return;}const cur=this.active();if(!confirm('Eliminare la scheda "'+(cur.nome||'Scheda')+'"?'))return;const snap=clone(cur);this.setState(st=>{const schede=st.schede.filter(s=>s.id!==st.activeId);return {schede,activeId:schede[0].id};});this._toast('Scheda eliminata',()=>this.setState(st=>({schede:st.schede.concat([snap]),activeId:snap.id})));};
  onDupScheda=()=>{this.setState(st=>{const sc=st.schede.find(s=>s.id===st.activeId);if(!sc)return{};const cl=clone(sc);cl.id=uid();cl.nome=(sc.nome||'Scheda')+' (copia)';cl.esercizi.forEach(e2=>{e2.id=uid();e2.settimane.forEach(w=>w.serie.forEach(sr=>sr.id=uid()));});(cl.cardio||[]).forEach(c2=>{c2.id=uid();});return {schede:st.schede.concat([cl]),activeId:cl.id};});this._toast('Scheda duplicata');};
  onSchedaWeek=(e)=>this.setState({schedaWeek:+e.currentTarget.dataset.w});
  parseBulk(t){t=(t||'').toLowerCase().trim();if(!t)return null;const m=t.match(/(\d+)\s*x\s*(\d+)(?:\s*-\s*(\d+))?/);if(!m)return null;const out={n:Math.min(12,Math.max(1,+m[1])),rip:m[2],ripMax:m[3]||null};
    const pc=t.match(/(\d+(?:[.,]\d+)?)\s*%/);const kg=t.match(/(\d+(?:[.,]\d+)?)\s*kg/);if(pc)out.pct=pc[1].replace(',','.');else if(kg)out.kg=kg[1].replace(',','.');
    const rec=t.match(/\b(15|30|45|60|90)\s*s\b/)||t.match(/\b([2-5])\s*min\b/);if(rec)out.rec=rec[2]?rec[2]+'min':rec[1]+'s';
    const rpe=t.match(/rpe\s*(\d+(?:[.,]\d+)?)/);if(rpe)out.rpe=rpe[1].replace(',','.');
    return out;}
  _serieFrom(spec){const s=makeSerie();if(spec.rec&&RECUPERI.includes(spec.rec))s.rec=spec.rec;if(spec.rpe)s.rpe=spec.rpe;if(spec.ripMax){s.tipo='range';s.ripMin=spec.rip;s.ripMax=spec.ripMax;}else s.rip=spec.rip;if(spec.pct){s.caricoMode='pct';s.usePct=true;s.pct=spec.pct;}else if(spec.kg)s.kg=spec.kg;return s;}
  onBulkSerieText=(e)=>{const id=e.currentTarget.dataset.e,v=e.target.value;this.setState(st=>({bulkSerie:Object.assign({},st.bulkSerie,{[id]:v})}));};
  onBulkApply=(e)=>{const d=e.currentTarget.dataset;const spec=this.parseBulk((this.state.bulkSerie||{})[d.e]);if(!spec){this._toast('Formato: 4x8 70% 90s rpe7 (oppure 4x8 60kg)');return;}const all=d.all==='1';this.mutEs(d.e,x=>Object.assign({},x,{settimane:x.settimane.map((st2,i)=>(all||i===0)?{serie:Array.from({length:spec.n},()=>this._serieFrom(spec))}:st2)}));this._toast(all?'✓ Applicato a tutte le settimane':'✓ Applicato a W1');};
  onAutoProg=(e)=>{const id=e.currentTarget.dataset.e;const v=prompt('Progressione automatica: incremento del carico per settimana (%).\nParte dalle serie di W1 e le propaga alle settimane successive aumentando kg o %1RM.','2.5');if(v===null)return;const p=num(v);if(isNaN(p)){this._toast('Valore non valido');return;}
    this.mutEs(id,x=>{const base=x.settimane[0];if(!base)return x;return Object.assign({},x,{settimane:x.settimane.map((st2,i)=>{if(i===0)return st2;return {serie:base.serie.map(sr=>{const o=Object.assign({},clone(sr),{id:uid()});const m=serieMode(o);if(m==='kg'&&o.kg){const k=num(o.kg);if(!isNaN(k))o.kg=String(Math.round(k*Math.pow(1+p/100,i)*2)/2);}else if(m==='pct'&&o.pct){const q=num(o.pct);if(!isNaN(q))o.pct=String(Math.min(100,Math.round((q+p*i)*10)/10));}return o;})};})});});this._toast('↗ Progressione +'+p+'%/settimana applicata');};
  onSchedaName=(e)=>{const v=e.target.value;this.mutAct(s=>Object.assign({},s,{nome:v}));};
  onSetWeeks=(e)=>{const n=+e.currentTarget.dataset.n;this.mutAct(s=>Object.assign({},s,{nW:n,esercizi:s.esercizi.map(x=>resizeEs(x,n)),cardio:(s.cardio||[]).map(c=>resizeCardio(c,n))}));};

  // esercizi
  onAddEx=()=>this.mutAct(s=>Object.assign({},s,{esercizi:s.esercizi.concat([makeEs(s.nW)])}));
  onDelEx=(e)=>{const id=e.currentTarget.dataset.e;const ex=this.active().esercizi.find(x=>x.id===id);const snap=ex?clone(ex):null;this.mutAct(s=>Object.assign({},s,{esercizi:s.esercizi.filter(x=>x.id!==id)}));if(snap)this._toast('Esercizio eliminato',()=>this.mutAct(s=>Object.assign({},s,{esercizi:s.esercizi.concat([snap])})));};
  onDupEx=(e)=>{const id=e.currentTarget.dataset.e;this.mutAct(s=>{const i=s.esercizi.findIndex(x=>x.id===id);if(i<0)return s;const cl=clone(s.esercizi[i]);cl.id=uid();cl.settimane.forEach(st=>st.serie.forEach(sr=>sr.id=uid()));const arr=s.esercizi.slice();arr.splice(i+1,0,cl);return Object.assign({},s,{esercizi:arr});});};
  onMoveEx=(e)=>{const id=e.currentTarget.dataset.e,dir=+e.currentTarget.dataset.dir;this.mutAct(s=>{const arr=s.esercizi.slice();const i=arr.findIndex(x=>x.id===id);const j=i+dir;if(i<0||j<0||j>=arr.length)return s;const t=arr[i];arr[i]=arr[j];arr[j]=t;return Object.assign({},s,{esercizi:arr});});};
  onCollapseEx=(e)=>{const id=e.currentTarget.dataset.e;this.mutEs(id,x=>Object.assign({},x,{collapsed:!x.collapsed}));};
  onExField=(e)=>{const d=e.currentTarget.dataset;const f=d.f,v=e.target.value;this.mutEs(d.e,x=>{const o=Object.assign({},x);o[f]=v;if(f==='gruppo')o.nome='';if(f==='nome'&&!o.video)o.video=(this.state.videoDB||{})[v]||'';return o;});};
  onExNote=(e)=>{const el=e.currentTarget;el.style.height='auto';el.style.height=el.scrollHeight+'px';this.onExField(e);};
  onExVideo=(e)=>{const d=e.currentTarget.dataset,v=e.target.value;this.setState(st=>{let nome='';const schede=st.schede.map(s=>s.id!==st.activeId?s:Object.assign({},s,{esercizi:s.esercizi.map(x=>{if(x.id!==d.e)return x;nome=x.nome;return Object.assign({},x,{video:v});})}));const upd={schede};if(nome&&v.trim())upd.videoDB=Object.assign({},st.videoDB,{[nome]:v.trim()});return upd;});};
  onDbVideo=(e)=>{const n=e.currentTarget.dataset.n;const cur=(this.state.videoDB||{})[n]||'';const v=prompt('Link YouTube per "'+n+'" (lascia vuoto per rimuovere):',cur);if(v===null)return;this.setState(st=>{const db=Object.assign({},st.videoDB);if(v.trim())db[n]=v.trim();else delete db[n];return {videoDB:db};});};
  onExAuto=(e)=>{const id=e.currentTarget.dataset.e,v=e.target.checked;this.mutEs(id,x=>Object.assign({},x,{oneRMauto:v}));};

  // serie
  onSerie=(e)=>{const d=e.currentTarget.dataset;const f=d.f,v=e.target.value;this.mutEs(d.e,x=>Object.assign({},x,{settimane:x.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{serie:st.serie.map(sr=>{if(sr.id!==d.s)return sr;if(f==='tipo')return Object.assign({},sr,{tipo:v,rip:'',ripMin:'',ripMax:'',minuti:'',secondi:''});const o=Object.assign({},sr);o[f]=v;return o;})}))}));};
  onTogPct=(e)=>{const d=e.currentTarget.dataset;this.mutEs(d.e,x=>Object.assign({},x,{settimane:x.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{serie:st.serie.map(sr=>{if(sr.id!==d.s)return sr;const order=['kg','pct','rm'];const cur=serieMode(sr);const nm=order[(order.indexOf(cur)+1)%3];return Object.assign({},sr,{caricoMode:nm,usePct:nm==='pct'});})}))}));};
  onAddSerie=(e)=>{const d=e.currentTarget.dataset;this.mutEs(d.e,x=>Object.assign({},x,{settimane:x.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{serie:st.serie.concat([makeSerie()])}))}));};
  onDelSerie=(e)=>{const d=e.currentTarget.dataset;this.mutEs(d.e,x=>Object.assign({},x,{settimane:x.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{serie:st.serie.length>1?st.serie.filter(sr=>sr.id!==d.s):st.serie}))}));};
  onCopyWeekAll=(e)=>{const d=e.currentTarget.dataset,from=+d.w;this.mutEs(d.e,x=>{const src=x.settimane[from];if(!src)return x;return Object.assign({},x,{settimane:x.settimane.map((st,i)=>i===from?st:{serie:src.serie.map(sr=>Object.assign({},clone(sr),{id:uid()}))})});});};
  onSerieKey=(e)=>{if(e.key!=='Enter')return;e.preventDefault();const d=e.currentTarget.dataset,w=+d.w,sid=d.s;this.mutEs(d.e,x=>Object.assign({},x,{settimane:x.settimane.map((st,i)=>{if(i!==w)return st;const arr=st.serie.slice();const idx=arr.findIndex(sr=>sr.id===sid);if(idx>=0&&idx<arr.length-1){const src=clone(arr[idx]);arr[idx+1]=Object.assign({},src,{id:arr[idx+1].id});}return Object.assign({},st,{serie:arr});})}));};

  // cardio
  onAddCardio=()=>this.mutAct(s=>Object.assign({},s,{cardio:(s.cardio||[]).concat([makeCardioEs(s.nW)])}));
  onDelCardio=(e)=>{const id=e.currentTarget.dataset.c;this.mutAct(s=>Object.assign({},s,{cardio:(s.cardio||[]).filter(c=>c.id!==id)}));};
  onDupCardio=(e)=>{const id=e.currentTarget.dataset.c;this.mutAct(s=>{const arr=(s.cardio||[]).slice();const i=arr.findIndex(c=>c.id===id);if(i<0)return s;const cl=clone(arr[i]);cl.id=uid();arr.splice(i+1,0,cl);return Object.assign({},s,{cardio:arr});});};
  onCollapseCardio=(e)=>{const id=e.currentTarget.dataset.c;this.mutCardio(id,c=>Object.assign({},c,{collapsed:!c.collapsed}));};
  onCardioField=(e)=>{const d=e.currentTarget.dataset,f=d.f,v=e.target.value;this.mutCardio(d.c,c=>{const o=Object.assign({},c);o[f]=v;return o;});};
  onAtt=(e)=>{const d=e.currentTarget.dataset,f=d.f,v=e.target.value;this.mutCardio(d.c,c=>Object.assign({},c,{settimane:c.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{attivita:st.attivita.map(a=>{if(a.id!==d.a)return a;const o=Object.assign({},a);o[f]=v;return o;})}))}));};
  onAddAtt=(e)=>{const d=e.currentTarget.dataset;this.mutCardio(d.c,c=>Object.assign({},c,{settimane:c.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{attivita:st.attivita.concat([makeAtt()])}))}));};
  onDelAtt=(e)=>{const d=e.currentTarget.dataset;this.mutCardio(d.c,c=>Object.assign({},c,{settimane:c.settimane.map((st,i)=>i!==+d.w?st:Object.assign({},st,{attivita:st.attivita.length>1?st.attivita.filter(a=>a.id!==d.a):st.attivita}))}));};
  onCopyCardioWeekAll=(e)=>{const d=e.currentTarget.dataset,from=+d.w;this.mutCardio(d.c,c=>{const src=c.settimane[from];if(!src)return c;return Object.assign({},c,{settimane:c.settimane.map((st,i)=>i===from?st:{attivita:src.attivita.map(a=>Object.assign({},clone(a),{id:uid()}))})});});};

  // diario
  onPickWeek=(e)=>this.setState({settimana:+e.currentTarget.dataset.w});
  onWeekNote=(e)=>{const v=e.target.value;this.setState(st=>({noteSessione:Object.assign({},st.noteSessione,{[st.settimana]:v})}));};
  onLog=(e)=>{const d=e.currentTarget.dataset,f=d.f,v=e.target.value,sc=d.sc,w=+d.w,es=d.e,si=+d.i;this.setState(st=>{const logs=clone(st.logs);const b=logs[sc]||{};const arr=(b[w]||[]).slice();const idx=arr.findIndex(l=>l.esId===es&&l.serieIdx===si);if(idx>=0)arr[idx]=Object.assign({},arr[idx],{[f]:v});else{const o={esId:es,serieIdx:si,kg:'',rip:'',rpe:''};o[f]=v;arr.push(o);}b[w]=arr;logs[sc]=b;return {logs};});};
  getLog(sc,w,es,si){const b=this.state.logs[sc];const arr=b&&b[w];const l=arr&&arr.find(x=>x.esId===es&&x.serieIdx===si);return l||{kg:'',rip:'',rpe:''};}

  // check media (foto/video) — file salvati in IndexedDB, indice in checkMedia; checks per atleta in checks
  checksOf(cid){const st=this.state;const list=((st.checks||{})[cid]||[]).slice();const ns=list.map(c=>c.n);const pref=cid+'|';
    Object.keys(st.checkMedia||{}).forEach(k=>{if(k.indexOf(pref)!==0)return;const n=+k.split('|')[1];if(!isNaN(n)&&!ns.includes(n)){ns.push(n);list.push({n,data:''});}});
    return list.sort((a,b)=>a.n-b.n);}
  onAddCheck=()=>{const cid=this.state.clienteId;const list=this.checksOf(cid);const n=list.length?Math.max.apply(null,list.map(c=>c.n))+1:0;
    this.setState(st=>({checks:Object.assign({},st.checks,{[cid]:list.concat([{n,data:new Date().toLocaleDateString('it-IT')}])})}));};
  onCheckDate=(e)=>{const n=+e.currentTarget.dataset.ck,v=e.target.value;const cid=this.state.clienteId;const list=this.checksOf(cid).map(c=>c.n===n?Object.assign({},c,{data:v}):c);
    this.setState(st=>({checks:Object.assign({},st.checks,{[cid]:list})}));};
  onDelCheck=(e)=>{const n=+e.currentTarget.dataset.ck;const cid=this.state.clienteId;if(!confirm('Eliminare il check con tutte le sue foto e il video?'))return;
    this._mURL=this._mURL||{};CHECK_SLOTS.forEach(sd=>{const key=cid+'|'+n+'|'+sd.slot;idbDel(key).catch(()=>{});if(this._mURL[key]){URL.revokeObjectURL(this._mURL[key]);delete this._mURL[key];}});
    this.setState(st=>{const m=Object.assign({},st.checkMedia);CHECK_SLOTS.forEach(sd=>{delete m[cid+'|'+n+'|'+sd.slot];});
      return {checkMedia:m,checks:Object.assign({},st.checks,{[cid]:this.checksOf(cid).filter(c=>c.n!==n)})};});this._toast('Check eliminato');};
  onCheckMedia=(e)=>{const slot=e.currentTarget.dataset.slot,ck=e.currentTarget.dataset.ck;const f=e.target.files[0];e.target.value='';if(!f)return;
    const isVid=slot==='video';
    if(isVid&&!f.type.startsWith('video')){this._toast('Seleziona un file video');return;}
    if(!isVid&&!f.type.startsWith('image')){this._toast('Seleziona una foto');return;}
    if(isVid&&f.size>300*1024*1024){this._toast('Video troppo grande (max 300MB)');return;}
    const key=this.state.clienteId+'|'+ck+'|'+slot;this._mURL=this._mURL||{};this._mLoading=this._mLoading||{};this._mLoading[key]=true;this.forceUpdate();
    const prep=isVid?Promise.resolve(f):shrinkImage(f);
    prep.then(blob=>idbPut(key,blob).then(()=>{if(this._mURL[key])URL.revokeObjectURL(this._mURL[key]);this._mURL[key]=URL.createObjectURL(blob);delete this._mLoading[key];
      this.setState(st=>({checkMedia:Object.assign({},st.checkMedia,{[key]:{t:isVid?'vid':'img'}})}));this._toast('✓ Salvato sul dispositivo');}))
    .catch(()=>{delete this._mLoading[key];this.forceUpdate();this._toast('Errore nel salvataggio — spazio insufficiente?');});};
  onDelCheckMedia=(e)=>{const d=e.currentTarget.dataset;const key=this.state.clienteId+'|'+d.ck+'|'+d.slot;if(!confirm('Eliminare questo file del check?'))return;
    idbDel(key).catch(()=>{});if(this._mURL&&this._mURL[key]){URL.revokeObjectURL(this._mURL[key]);delete this._mURL[key];}
    this.setState(st=>{const m=Object.assign({},st.checkMedia);delete m[key];return{checkMedia:m};});};
  // confronto foto prima/dopo
  _cfChecks(){const st=this.state;const pref=st.clienteId+'|';const withFoto={};Object.keys(st.checkMedia||{}).forEach(k=>{if(k.indexOf(pref)!==0)return;const parts=k.split('|');if(parts[2]==='video')return;withFoto[+parts[1]]=true;});
    return this.checksOf(st.clienteId).filter(c=>withFoto[c.n]);}
  onCmpFotoOpen=()=>{const cs=this._cfChecks();if(!cs.length){this._toast('Nessuna foto check caricata per questo atleta');return;}
    this.setState(st=>({cf:{a:cs[0].n,b:cs[cs.length-1].n,pose:0}}));};
  onCmpFotoClose=()=>this.setState({cf:null});
  onCmpFotoPose=(e)=>{const i=+e.currentTarget.dataset.i;this.setState(st=>({cf:Object.assign({},st.cf,{pose:i})}));};
  onCmpFotoNav=(e)=>{const d=+e.currentTarget.dataset.d;this.setState(st=>({cf:Object.assign({},st.cf,{pose:(st.cf.pose+d+4)%4})}));};
  onCmpFotoWeek=(e)=>{const side=e.currentTarget.dataset.side,v=+e.target.value;this.setState(st=>({cf:Object.assign({},st.cf,{[side]:v})}));};

  _ensureMedia(key){const meta=(this.state.checkMedia||{})[key];this._mURL=this._mURL||{};this._mLoading=this._mLoading||{};
    if(!meta||this._mURL[key]||this._mLoading[key])return;this._mLoading[key]=true;
    idbGet(key).then(b=>{delete this._mLoading[key];if(b){this._mURL[key]=URL.createObjectURL(b);this.forceUpdate();}else this.setState(st=>{const m=Object.assign({},st.checkMedia);delete m[key];return{checkMedia:m};});})
    .catch(()=>{delete this._mLoading[key];});}

  // volume
  onVolMode=(e)=>this.setState({volMode:e.currentTarget.dataset.m});
  onSelGroup=(e)=>{const g=e.currentTarget.dataset.g;this.setState(st=>({selGroup:st.selGroup===g?null:g}));};
  onVolView=(e)=>this.setState({volView:e.currentTarget.dataset.v});
  onCmpToggle=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>{const cur=st.cmpSel[id]!==false;return {cmpSel:Object.assign({},st.cmpSel,{[id]:!cur})};});};
  onCmpGroup=(e)=>this.setState({cmpGroup:e.currentTarget.dataset.g});

  // DB
  onDbDraft=(e)=>{const g=e.currentTarget.dataset.g,v=e.target.value;this.setState(st=>({dbDraft:Object.assign({},st.dbDraft,{[g]:v})}));};
  onAddDbEx=(e)=>{const g=e.currentTarget.dataset.g;const v=(this.state.dbDraft[g]||'').trim();if(!v)return;this.setState(st=>({esDB:Object.assign({},st.esDB,{[g]:(st.esDB[g]||[]).concat([v])}),dbDraft:Object.assign({},st.dbDraft,{[g]:''})}));};
  onDelDbEx=(e)=>{const g=e.currentTarget.dataset.g,n=e.currentTarget.dataset.n;this.setState(st=>({esDB:Object.assign({},st.esDB,{[g]:(st.esDB[g]||[]).filter(x=>x!==n)})}));};
  onBulkGroup=(e)=>this.setState({bulkGroup:e.target.value});
  onBulkText=(e)=>this.setState({bulkText:e.target.value});
  onBulkAdd=()=>{const g=this.state.bulkGroup;const items=(this.state.bulkText||'').split(/[\n,]/).map(s=>s.trim()).filter(Boolean);if(!items.length)return;this.setState(st=>{const cur=(st.esDB[g]||[]).slice();items.forEach(it=>{if(!cur.some(x=>x.toLowerCase()===it.toLowerCase()))cur.push(it);});return {esDB:Object.assign({},st.esDB,{[g]:cur}),bulkText:''};});this._toast(items.length+' esercizi aggiunti');};

  // builder
  onBDef=(e)=>{const f=e.currentTarget.dataset.f,d=+e.currentTarget.dataset.d;this.setState(st=>{const b=Object.assign({},st.builder);if(f==='settimane')b.settimane=Math.max(1,Math.min(16,(b.settimane||8)+d));return {builder:b};});};
  onAddSess=()=>this.setState(st=>{const n=st.builder.sessioni.length;return {builder:Object.assign({},st.builder,{sessioni:st.builder.sessioni.concat([{id:uid(),nome:'Seduta '+String.fromCharCode(65+n),esercizi:[]}])})};});
  onDelSess=(e)=>{const id=e.currentTarget.dataset.s;this.setState(st=>({builder:Object.assign({},st.builder,{sessioni:st.builder.sessioni.filter(s=>s.id!==id)})}));};
  onSessName=(e)=>{const id=e.currentTarget.dataset.s,v=e.target.value;this.setState(st=>({builder:Object.assign({},st.builder,{sessioni:st.builder.sessioni.map(s=>s.id===id?Object.assign({},s,{nome:v}):s)})}));};
  onMoveSessEx=(e)=>{const sid=e.currentTarget.dataset.s,i=+e.currentTarget.dataset.i,d=+e.currentTarget.dataset.d;this.setState(st=>({builder:Object.assign({},st.builder,{sessioni:st.builder.sessioni.map(s=>{if(s.id!==sid)return s;const arr=s.esercizi.slice();const j=i+d;if(j<0||j>=arr.length)return s;const t=arr[i];arr[i]=arr[j];arr[j]=t;return Object.assign({},s,{esercizi:arr});})})}));};
  onDelSessEx=(e)=>{const sid=e.currentTarget.dataset.s,i=+e.currentTarget.dataset.i;this.setState(st=>({builder:Object.assign({},st.builder,{sessioni:st.builder.sessioni.map(s=>s.id===sid?Object.assign({},s,{esercizi:s.esercizi.filter((_,k)=>k!==i)}):s)})}));};
  onOpenPicker=(e)=>{const sid=e.currentTarget.dataset.s;this.setState({picker:{sessionId:sid,gruppo:'Petto',custom:''},pickerPos:{x:0,y:0}});};
  onClosePicker=()=>this.setState({picker:null});
  onPickerDrag=(e)=>{const t=(e.touches&&e.touches[0])||e;const sx=t.clientX,sy=t.clientY;const base=this.state.pickerPos||{x:0,y:0};
    const move=(ev)=>{const p=(ev.touches&&ev.touches[0])||ev;this.setState({pickerPos:{x:base.x+(p.clientX-sx),y:base.y+(p.clientY-sy)}});if(ev.touches)ev.preventDefault();};
    const up=()=>{document.removeEventListener('mousemove',move);document.removeEventListener('mouseup',up);document.removeEventListener('touchmove',move);document.removeEventListener('touchend',up);};
    document.addEventListener('mousemove',move);document.addEventListener('mouseup',up);document.addEventListener('touchmove',move,{passive:false});document.addEventListener('touchend',up);e.preventDefault();};
  onPickerGroup=(e)=>{const g=e.currentTarget.dataset.g;this.setState(st=>({picker:Object.assign({},st.picker,{gruppo:g})}));};
  onPickerCustom=(e)=>{const v=e.target.value;this.setState(st=>({picker:Object.assign({},st.picker,{custom:v})}));};
  _addToSess(sid,nome,gruppo){this.setState(st=>({builder:Object.assign({},st.builder,{sessioni:st.builder.sessioni.map(s=>s.id===sid?Object.assign({},s,{esercizi:s.esercizi.concat([{nome,gruppo}])}):s)})}));}
  onPickEx=(e)=>{const n=e.currentTarget.dataset.n,g=e.currentTarget.dataset.g;this._addToSess(this.state.picker.sessionId,n,g);};
  onAddCustom=()=>{const p=this.state.picker;const n=(p.custom||'').trim();if(!n)return;this._addToSess(p.sessionId,n,p.gruppo);this.setState(st=>({picker:Object.assign({},st.picker,{custom:''})}));};
  onStopDrag=(e)=>{e.stopPropagation();};
  onCustomKey=(e)=>{if(e.key==='Enter'){e.preventDefault();this.onAddCustom();}};
  onApplyTpl=(e)=>{const t=e.currentTarget.dataset.t;const pickFirst=(g)=>{const arr=this.state.esDB[g]||[];return arr.length?{nome:arr[0],gruppo:g}:null;};const build=(groups)=>groups.map(pickFirst).filter(Boolean);
    let sessioni;
    if(t==='vuoto')sessioni=[{id:uid(),nome:'Seduta A',esercizi:[]}];
    else if(t==='fullbody')sessioni=[{id:uid(),nome:'Full Body',esercizi:build(['Petto','Schiena','Gambe','Spalle','Bicipiti','Tricipiti'])}];
    else if(t==='upperlower')sessioni=[{id:uid(),nome:'Upper',esercizi:build(['Petto','Schiena','Spalle','Bicipiti','Tricipiti'])},{id:uid(),nome:'Lower',esercizi:build(['Gambe','Glutei','Polpacci','Addome'])}];
    else sessioni=[{id:uid(),nome:'Push',esercizi:build(['Petto','Spalle','Tricipiti'])},{id:uid(),nome:'Pull',esercizi:build(['Schiena','Bicipiti'])},{id:uid(),nome:'Legs',esercizi:build(['Gambe','Glutei','Polpacci'])}];
    this.setState(st=>({builder:Object.assign({},st.builder,{sessioni})}));};
  onGenerate=()=>{const b=this.state.builder;const sess=b.sessioni.filter(s=>s.esercizi.length>0);if(!sess.length){this._toast('Aggiungi esercizi a una seduta');return;}const nW=b.settimane||8;const order=g=>{const i=GRUPPI.indexOf(g);return i<0?99:i;};
    const nuove=sess.map(s=>{const ordered=s.esercizi.map((x,idx)=>({x,idx})).sort((a,c)=>order(a.x.gruppo)-order(c.x.gruppo)||a.idx-c.idx).map(o=>o.x);return Object.assign(makeScheda(s.nome||'Scheda'),{nW,esercizi:ordered.map(x=>makeEs(nW,x.gruppo,x.nome)),cardio:[]});});
    this.setState(st=>({schede:st.schede.concat(nuove),activeId:nuove[0].id,tab:'schede',panel:null}));this._toast(nuove.length+(nuove.length===1?' scheda creata':' schede create'));};
  onOpenSplitSave=()=>{const b=this.state.builder;const def=b.sessioni.map(s=>s.nome).filter(Boolean).join(' / ')||'Modello';this.setState({splitModal:true,splitName:def});};
  onCloseSplitSave=()=>this.setState({splitModal:false});
  onSplitName=(e)=>this.setState({splitName:e.target.value});
  onConfirmSplitSave=()=>{this.setState(st=>{const b=st.builder;const sessioni=b.sessioni.filter(s=>s.esercizi.length>0).map(s=>({nome:s.nome,esercizi:s.esercizi.map(x=>({nome:x.nome,gruppo:x.gruppo}))}));if(!sessioni.length){this._toast('Aggiungi esercizi prima di salvare');return {splitModal:false};}const nome=(st.splitName||'Modello').trim()||'Modello';return {splitModels:st.splitModels.concat([{id:uid(),nome,settimane:b.settimane||8,sessioni}]),splitModal:false};});this._toast('Modello salvato');};
  onApplyModel=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>{const md=st.splitModels.find(m=>m.id===id);if(!md)return {};return {builder:{settimane:md.settimane||8,sessioni:md.sessioni.map(se=>({id:uid(),nome:se.nome,esercizi:se.esercizi.map(x=>({nome:x.nome,gruppo:x.gruppo}))}))}};});this._toast('Modello caricato');};
  onDelModel=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>({splitModels:st.splitModels.filter(m=>m.id!==id)}));};

  // ---- GENERATORE PROSSIMA SCHEDA ----
  gwExList(){const out=[];this.state.schede.forEach(s=>s.esercizi.forEach(e=>{if(e.nome)out.push({scheda:s,es:e});}));return out;}
  gwGroupsOf(){const gs=[];this.gwExList().forEach(o=>{if(!gs.includes(o.es.gruppo))gs.push(o.es.gruppo);});return GRUPPI.filter(g=>gs.includes(g));}
  onGwOpen=()=>{const st=this.state;if(!st.schede.some(s=>s.esercizi.some(x=>x.nome))){this._toast('La scheda di lavoro è vuota — crea prima un programma');return;}
    const acc=(st.genDefaults&&st.genDefaults.accPct)||'10';const groups={};
    this.gwGroupsOf().forEach(g=>{const names=[];st.schede.forEach(s=>s.esercizi.forEach(e=>{if(e.nome&&e.gruppo===g&&!names.includes(e.nome))names.push(e.nome);}));
      const prin=names[0]||'';const reps=st.schede.filter(s=>s.esercizi.some(e=>e.gruppo===g&&e.nome===prin)).map(s=>({schedaId:s.id,progId:'',copyAcc:false}));
      groups[g]={prin,names,reps,accPct:acc,recPrin:'',recAcc:''};});
    this.setState({gw:{step:0,subs:{},accDef:acc,groups}});};
  onGwClose=()=>this.setState({gw:null});
  onGwManual=()=>{this.setState({gw:null});this.onAddScheda();this.setState({tab:'schede'});this._toast('Nuova scheda vuota creata — costruiscila manualmente');};
  onGwStep=(e)=>{const d=+e.currentTarget.dataset.d;this.setState(st=>{const gw=st.gw;if(!gw)return{};let step=gw.step+d;if(step===3)step+=d;step=Math.max(0,Math.min(4,step));return{gw:Object.assign({},gw,{step})};});};
  _gwSetGrp(g,patch){this.setState(st=>({gw:Object.assign({},st.gw,{groups:Object.assign({},st.gw.groups,{[g]:Object.assign({},st.gw.groups[g],patch)})})}));}
  onGwPrin=(e)=>{const g=e.currentTarget.dataset.g,v=e.target.value;const reps=this.state.schede.filter(s=>s.esercizi.some(x=>x.gruppo===g&&x.nome===v)).map(s=>({schedaId:s.id,progId:'',copyAcc:false}));this._gwSetGrp(g,{prin:v,reps});};
  onGwFreqAdd=(e)=>{const g=e.currentTarget.dataset.g;const st=this.state,c=st.gw.groups[g];const used=c.reps.map(r=>r.schedaId);const free=st.schede.find(s=>!used.includes(s.id));if(!free){this._toast('Il principale è già in tutte le sedute');return;}
    this._gwSetGrp(g,{reps:c.reps.concat([{schedaId:free.id,progId:'',copyAcc:false}])});};
  onGwFreqDel=(e)=>{const d=e.currentTarget.dataset,g=d.g,i=+d.i;const c=this.state.gw.groups[g];if(c.reps.length<=1){this._toast('Almeno una seduta per il principale');return;}this._gwSetGrp(g,{reps:c.reps.filter((r,x)=>x!==i)});};
  onGwRepVal=(e)=>{const d=e.currentTarget.dataset,g=d.g,i=+d.i,f=d.f,v=e.target.value;const c=this.state.gw.groups[g];
    if(f==='progId'&&v==='__new'){this._pdCtx={g,i};this.onNewProg();return;}
    this._gwSetGrp(g,{reps:c.reps.map((r,x)=>x===i?Object.assign({},r,{[f]:v}):r)});};
  onGwRepCopy=(e)=>{const d=e.currentTarget.dataset,g=d.g,i=+d.i;const c=this.state.gw.groups[g];this._gwSetGrp(g,{reps:c.reps.map((r,x)=>x===i?Object.assign({},r,{copyAcc:!r.copyAcc}):r)});};
  onGwAccDef=(e)=>{const v=e.target.value;this.setState(st=>{const groups={};Object.keys(st.gw.groups).forEach(g=>{groups[g]=Object.assign({},st.gw.groups[g],{accPct:v});});return{gw:Object.assign({},st.gw,{accDef:v,groups})};});};
  onGwGrpVal=(e)=>{const d=e.currentTarget.dataset,v=e.target.value;this._gwSetGrp(d.g,{[d.f]:v});};
  onGwSub=(e)=>{const id=e.currentTarget.dataset.e;this.setState(st=>{const subs=Object.assign({},st.gw.subs);if(subs[id])delete subs[id];else{const o=this.gwExList().find(x=>x.es.id===id);const opts=(st.esDB[o.es.gruppo]||[]).filter(n=>n!==o.es.nome);subs[id]={nuovo:opts[0]||''};}return{gw:Object.assign({},st.gw,{subs})};});};
  onGwSubName=(e)=>{const id=e.currentTarget.dataset.e,v=e.target.value;this.setState(st=>({gw:Object.assign({},st.gw,{subs:Object.assign({},st.gw.subs,{[id]:{nuovo:v}})})}));};
  gwProposal(){const st=this.state,gw=st.gw;if(!gw)return[];
    const cfg=gw.groups;
    const findSrc=(g,nome)=>{for(const s of st.schede){const e=s.esercizi.find(x=>x.gruppo===g&&x.nome===nome);if(e)return{scheda:s,es:e};}return null;};
    const cloneEx=(es,nW)=>{const e=clone(es);e._oldId=es.id;e._srcNome=es.nome;e.id=uid();e._badges=[];
      while(e.settimane.length<nW)e.settimane.push(clone(e.settimane[e.settimane.length-1]||{serie:[makeSerie()]}));
      e.settimane=e.settimane.slice(0,nW);e.settimane.forEach(w=>w.serie.forEach(sr=>sr.id=uid()));return e;};
    const applySub=(e)=>{const sub=gw.subs[e._oldId];if(sub&&sub.nuovo){e._badges.push('sostituito');e.nome=sub.nuovo;e.video=(st.videoDB||{})[sub.nuovo]||'';e.oneRM='';e.oneRMauto=false;}};
    const applyProg=(e,prog)=>{e.settimane=e.settimane.map((wk,wi)=>{if(wi>=prog.settimane.length)return wk;return{serie:prog.settimane[wi].serie.map(sr=>Object.assign({},clone(sr),{id:uid()}))};});e._badges.push('📋 '+prog.nome);e.progNome=prog.nome;if(prog.note)e.note=prog.note;};
    const prop=st.schede.filter(s=>s.esercizi.some(x=>x.nome)).map(s=>{
      const sc=clone(s);sc._srcId=s.id;sc.id=uid();sc.nome=(s.nome||'Scheda')+' · nuovo ciclo';
      sc.esercizi=sc.esercizi.filter(e=>e.nome);
      sc.esercizi.forEach(e=>{e._oldId=e.id;e._srcNome=e.nome;e.id=uid();e._badges=[];e.settimane.forEach(w=>w.serie.forEach(sr=>sr.id=uid()));applySub(e);});
      (sc.cardio||[]).forEach(c=>{c.id=uid();});
      return sc;});
    Object.keys(cfg).forEach(g=>{const c=cfg[g];if(!c.prin)return;
      prop.forEach(sc=>{const rep=c.reps.find(r=>r.schedaId===sc._srcId);
        let prin=sc.esercizi.find(e=>e.gruppo===g&&e._srcNome===c.prin);
        if(prin&&!rep){sc.esercizi=sc.esercizi.filter(e=>e!==prin);prin=null;}
        if(rep){
          if(!prin){const src=findSrc(g,c.prin);if(src){prin=cloneEx(src.es,sc.nW);applySub(prin);prin._badges.push('nuova seduta');
            const at=sc.esercizi.findIndex(e=>e.gruppo===g);sc.esercizi.splice(at<0?sc.esercizi.length:at,0,prin);
            if(rep.copyAcc){src.scheda.esercizi.filter(x=>x.gruppo===g&&x.nome&&x.nome!==c.prin).forEach(x=>{const a=cloneEx(x,sc.nW);applySub(a);a._badges.push('accessorio aggiunto');sc.esercizi.push(a);});}}}
          if(prin){prin._badges.unshift('★ principale');const prog=st.cartella.find(p=>p.id===rep.progId);if(prog)applyProg(prin,prog);
            if(c.recPrin)prin.settimane.forEach(w=>w.serie.forEach(sr=>{sr.rec=c.recPrin;}));}}
        const accs=sc.esercizi.filter(e=>e.gruppo===g&&e._srcNome!==c.prin);
        const p=num(c.accPct)||0;
        if(p!==0&&accs.length){for(let w=0;w<sc.nW;w++){const cur=accs.filter(e=>e.settimane[w]);const tot=cur.reduce((a,e)=>a+e.settimane[w].serie.length,0);if(!tot)continue;
          let delta=Math.max(cur.length,Math.round(tot*(1+p/100)))-tot;let guard=0;
          while(delta!==0&&guard++<200){if(delta>0){cur.sort((a,b)=>a.settimane[w].serie.length-b.settimane[w].serie.length);const arr=cur[0].settimane[w].serie;arr.push(Object.assign({},clone(arr[arr.length-1]),{id:uid()}));delta--;}
            else{cur.sort((a,b)=>b.settimane[w].serie.length-a.settimane[w].serie.length);const arr=cur[0].settimane[w].serie;if(arr.length>1){arr.pop();delta++;}else break;}}}
          accs.forEach(e=>e._badges.push((p>0?'+':'')+p+'% accessori'));}
        if(c.recAcc)accs.forEach(e=>e.settimane.forEach(w=>w.serie.forEach(sr=>{sr.rec=c.recAcc;})));
      });});
    return prop;}
  onGwConfirm=()=>{const prop=this.gwProposal();if(!prop.length){this._toast('Nulla da generare');return;}
    const cleaned=prop.map(s=>{const s2=Object.assign({},s,{esercizi:s.esercizi.map(e=>{const o=Object.assign({},e);delete o._oldId;delete o._badges;delete o._srcNome;return o;})});delete s2._srcId;return s2;});
    this.setState(st=>({schede:st.schede.concat(cleaned),activeId:cleaned[0].id,tab:'schede',gw:null,genDefaults:Object.assign({},st.genDefaults,{accPct:(st.gw&&st.gw.accDef)||'10'})}));
    this._toast('✓ '+cleaned.length+(cleaned.length===1?' scheda generata':' schede generate')+' — rivedi e correggi liberamente');};

  // salvate
  onOpenSaveModal=()=>{const sel={};this.state.schede.forEach(s=>sel[s.id]=true);this.setState({saveModal:true,saveSel:sel,saveName:'Le mie schede',saveClienteId:this.state.clienteId});};
  onSaveCliente=(e)=>this.setState({saveClienteId:e.target.value});
  onCloseSaveModal=()=>this.setState({saveModal:false});
  onSaveName=(e)=>this.setState({saveName:e.target.value});
  onToggleSaveScheda=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>({saveSel:Object.assign({},st.saveSel,{[id]:!st.saveSel[id]})}));};
  onConfirmSave=()=>{this.setState(st=>{const inc=st.schede.filter(s=>st.saveSel[s.id]);if(!inc.length)return {saveModal:false};const cid=st.saveClienteId||'';const cl=st.clienti.find(c=>c.id===cid);const item={id:uid(),nome:(st.saveName||'Schede').trim(),data:new Date().toLocaleDateString('it-IT'),schede:clone(inc),clienteId:cid,atleta:cl?cliLabel(cl):''};const fresh=makeScheda('Scheda A');return {schedeSalvate:st.schedeSalvate.concat([item]),saveModal:false,schede:[fresh],activeId:fresh.id,logs:{},noteSessione:{}};},()=>{const sv=this.state.schedeSalvate[this.state.schedeSalvate.length-1];this._toast(sv&&sv.atleta?('✓ Assegnato a '+sv.atleta+' — Schede svuotate, pronte per una nuova creazione'):'✓ Salvato in Schede salvate — pronte per una nuova creazione');});};
  onUnassignSalvata=(e)=>{const id=e.currentTarget.dataset.id;const sv=this.state.schedeSalvate.find(x=>x.id===id);if(!sv)return;if(!confirm('Togliere "'+sv.nome+'" dalla cartella di questo atleta?\nIl programma resta tra le schede salvate (💾), non assegnato.'))return;
    this.setState(st=>({schedeSalvate:st.schedeSalvate.map(x=>x.id===id?Object.assign({},x,{clienteId:'',atleta:''}):x)}));this._toast('Programma tolto dalla cartella');};
  onAssignSalvata=(e)=>{const id=e.currentTarget.dataset.id;const cid=e.target.value;this.setState(st=>{const cl=st.clienti.find(c=>c.id===cid);const schedeSalvate=st.schedeSalvate.map(sv=>sv.id===id?Object.assign({},sv,{clienteId:cid,atleta:cl?cliLabel(cl):''}):sv);return {schedeSalvate};});};
  onLoadSalvata=(e)=>{const id=e.currentTarget.dataset.id;const hasWork=this.state.schede.some(s=>s.esercizi.some(x=>x.nome));if(hasWork&&!confirm('Le schede di lavoro attuali verranno sostituite.\nSe non le hai salvate in 📁 Salvate andranno perse.\n\nContinuare?'))return;this.setState(st=>{const sv=st.schedeSalvate.find(x=>x.id===id);if(!sv)return {};const cl=sv.schede.map(s=>Object.assign({},clone(s),{id:uid()}));const upd={schede:cl,activeId:cl[0].id,tab:'schede',panel:null};if(sv.clienteId&&st.clienti.some(c=>c.id===sv.clienteId))upd.clienteId=sv.clienteId;return upd;});};
  onDelSalvata=(e)=>{const id=e.currentTarget.dataset.id;const sv=this.state.schedeSalvate.find(x=>x.id===id);if(!sv)return;if(!confirm('Eliminare il programma salvato "'+sv.nome+'"?'))return;const snap=clone(sv);this.setState(st=>({schedeSalvate:st.schedeSalvate.filter(x=>x.id!==id)}));this._toast('Programma eliminato',()=>this.setState(st=>({schedeSalvate:st.schedeSalvate.concat([snap])})));};

  // progressioni
  onNewProg=()=>{const nW=this.active().nW;const pd={nome:'',desc:'',note:'',tipo:'mista',weeks:Array.from({length:nW},()=>({serie:[makeSerie(),makeSerie(),makeSerie()]}))};this._pdBase=JSON.stringify(pd);this.setState({progEditor:true,pd});};
  onPdNote=(e)=>{const v=e.target.value;this.setState(st=>({pd:Object.assign({},st.pd,{note:v})}));};
  onCloseProgEditor=()=>{const pd=this.state.pd;
    if(pd&&this._pdBase&&JSON.stringify(pd)!==this._pdBase){
      if(confirm('Hai modifiche non salvate.\n\nOK = SALVA la progressione e chiudi\nAnnulla = chiudi SENZA salvare')){this.onSavePd();return;}}
    this._pdCtx=null;this._pdBase=null;this.setState({progEditor:false,pd:null});};
  onEditProg=(e)=>{const id=e.currentTarget.dataset.id;const p=this.state.cartella.find(x=>x.id===id);if(!p)return;
    const pd={editId:id,nome:p.nome||'',desc:p.desc||'',note:p.note||'',tipo:p.tipo||'mista',weeks:(p.settimane||[]).map(w=>({serie:(w.serie||[]).map(sr=>clone(sr))}))};this._pdBase=JSON.stringify(pd);this.setState({progEditor:true,pd});};
  onPdTipo=(e)=>{const v=e.currentTarget.dataset.t;this.setState(st=>({pd:Object.assign({},st.pd,{tipo:v})}));};
  onPdName=(e)=>{const v=e.target.value;this.setState(st=>({pd:Object.assign({},st.pd,{nome:v})}));};
  onPdDesc=(e)=>{const v=e.target.value;this.setState(st=>({pd:Object.assign({},st.pd,{desc:v})}));};
  onPdWeekMinus=()=>this.setState(st=>{const w=st.pd.weeks;return {pd:Object.assign({},st.pd,{weeks:w.length>1?w.slice(0,-1):w})};});
  onPdWeekPlus=()=>this.setState(st=>({pd:Object.assign({},st.pd,{weeks:st.pd.weeks.concat([{serie:[makeSerie(),makeSerie(),makeSerie()]}])})}));
  onPdSerie=(e)=>{const d=e.currentTarget.dataset,w=+d.w,sid=d.s,f=d.f,v=e.target.value;this.setState(st=>({pd:Object.assign({},st.pd,{weeks:st.pd.weeks.map((wk,i)=>i!==w?wk:Object.assign({},wk,{serie:wk.serie.map(sr=>{if(sr.id!==sid)return sr;if(f==='tipo')return Object.assign({},sr,{tipo:v,rip:'',ripMin:'',ripMax:'',minuti:'',secondi:''});const o=Object.assign({},sr);o[f]=v;return o;})}))})}));};
  onPdTogPct=(e)=>{const d=e.currentTarget.dataset,w=+d.w,sid=d.s;this.setState(st=>({pd:Object.assign({},st.pd,{weeks:st.pd.weeks.map((wk,i)=>i!==w?wk:Object.assign({},wk,{serie:wk.serie.map(sr=>{if(sr.id!==sid)return sr;const order=['kg','pct','rm'];const cur=serieMode(sr);const nm=order[(order.indexOf(cur)+1)%3];return Object.assign({},sr,{caricoMode:nm,usePct:nm==='pct'});})}))})}));};
  onPdAddSerie=(e)=>{const w=+e.currentTarget.dataset.w;this.setState(st=>({pd:Object.assign({},st.pd,{weeks:st.pd.weeks.map((wk,i)=>i!==w?wk:Object.assign({},wk,{serie:wk.serie.concat([makeSerie()])}))})}));};
  onPdCopyWeekAll=(e)=>{const from=+e.currentTarget.dataset.w;this.setState(st=>{const src=st.pd.weeks[from];if(!src)return null;return {pd:Object.assign({},st.pd,{weeks:st.pd.weeks.map((wk,i)=>i===from?wk:{serie:src.serie.map(sr=>Object.assign({},clone(sr),{id:uid()}))})})};});};
  onPdDelSerie=(e)=>{const d=e.currentTarget.dataset,w=+d.w,sid=d.s;this.setState(st=>({pd:Object.assign({},st.pd,{weeks:st.pd.weeks.map((wk,i)=>i!==w?wk:Object.assign({},wk,{serie:wk.serie.length>1?wk.serie.filter(sr=>sr.id!==sid):wk.serie}))})}));};
  onPdSerieKey=(e)=>{if(e.key!=='Enter')return;e.preventDefault();const d=e.currentTarget.dataset,w=+d.w,sid=d.s;this.setState(st=>({pd:Object.assign({},st.pd,{weeks:st.pd.weeks.map((wk,i)=>{if(i!==w)return wk;const arr=wk.serie.slice();const idx=arr.findIndex(sr=>sr.id===sid);if(idx>=0&&idx<arr.length-1){const src=clone(arr[idx]);arr[idx+1]=Object.assign({},src,{id:arr[idx+1].id});}return Object.assign({},wk,{serie:arr});})})}));};
  onSavePd=()=>{const nid=uid();this.setState(st=>{const pd=st.pd;const nome=(pd.nome||'').trim()||'Progressione';const settimane=pd.weeks.map(w=>({serie:w.serie.map(sr=>Object.assign({},clone(sr),{id:uid()}))}));
    const rec={id:pd.editId||nid,nome,desc:pd.desc||'',note:pd.note||'',tipo:pd.tipo||'mista',nW:pd.weeks.length,settimane};
    const upd={cartella:pd.editId?st.cartella.map(p=>p.id===pd.editId?rec:p):st.cartella.concat([rec]),progEditor:false,pd:null};
    if(this._pdCtx&&st.gw){const g=this._pdCtx.g,i=this._pdCtx.i;this._pdCtx=null;const c=st.gw.groups[g];
      if(c)upd.gw=Object.assign({},st.gw,{groups:Object.assign({},st.gw.groups,{[g]:Object.assign({},c,{reps:c.reps.map((r,x)=>x===i?Object.assign({},r,{progId:nid}):r)})})});}
    return upd;});};
  onProgFilter=(e)=>{const t=e.currentTarget.dataset.t;this.setState(st=>({progFilter:st.progFilter===t?'':t}));};
  onDelProg=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>({cartella:st.cartella.filter(p=>p.id!==id)}));};
  onProgDragStart=(e)=>{this._dragProg=e.currentTarget.dataset.id;try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',this._dragProg);}catch(_){}this.setState({_dragProgId:this._dragProg});};
  onProgDragOver=(e)=>{e.preventDefault();try{e.dataTransfer.dropEffect='move';}catch(_){}const id=e.currentTarget.dataset.id;if(id!==this.state._overProgId)this.setState({_overProgId:id});};
  onProgDragEnd=()=>{this._dragProg=null;this.setState({_dragProgId:null,_overProgId:null});};
  onProgDrop=(e)=>{e.preventDefault();const to=e.currentTarget.dataset.id;const from=this._dragProg;this._dragProg=null;this.setState(st=>{const base={_dragProgId:null,_overProgId:null};if(!from||from===to)return base;const arr=st.cartella.slice();const fi=arr.findIndex(p=>p.id===from);const ti=arr.findIndex(p=>p.id===to);if(fi<0||ti<0)return base;const it=arr.splice(fi,1)[0];const ins=arr.findIndex(p=>p.id===to);arr.splice(ins,0,it);return Object.assign(base,{cartella:arr});});};
  onProgPickTarget=(e)=>{const id=e.currentTarget.dataset.id,v=e.target.value;this.setState(st=>({_pt:Object.assign({},st._pt,{[id]:v})}));};
  onApplyProg=(e)=>{const pid=e.currentTarget.dataset.id;const target=(this.state._pt||{})[pid];if(!target)return;const prog=this.state.cartella.find(p=>p.id===pid);if(!prog)return;
    this.setState(st=>({schede:st.schede.map(s=>Object.assign({},s,{esercizi:s.esercizi.map(ex=>{if(ex.id!==target)return ex;return Object.assign({},ex,{progNome:prog.nome,note:prog.note?prog.note:ex.note,settimane:ex.settimane.map((st2,wi)=>{if(wi>=prog.settimane.length)return st2;return {serie:prog.settimane[wi].serie.map(sr=>Object.assign({},clone(sr),{id:uid()}))};})});})}))}));
    this._toast('Progressione applicata');};
  _toast(m,undo){try{const d=document.createElement('div');d.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1e3a5f;color:#fff;padding:11px 18px;border-radius:10px;font-weight:700;font-size:13px;z-index:300;font-family:Inter;display:flex;gap:12px;align-items:center';const s=document.createElement('span');s.textContent=m;d.appendChild(s);if(undo){const b=document.createElement('button');b.textContent='↩ Ripristina';b.style.cssText='background:#d4a017;border:none;color:#16293f;border-radius:7px;padding:6px 11px;font-weight:800;font-size:12px;cursor:pointer;font-family:Inter';b.onclick=()=>{undo();d.remove();};d.appendChild(b);}document.body.appendChild(d);setTimeout(()=>d.remove(),undo?6000:1700);}catch(e){}}
  onStop=(e)=>e.stopPropagation();

  // io
  onExport=()=>{const{saveModal,progEditor,pd,panel,saveSel,dbDraft,tab,activeId,settimana,volMode,selGroup,_pt,...rest}=this.state;const data={schede:rest.schede,logs:rest.logs,cardioLogs:rest.cardioLogs,cartella:rest.cartella,schedeSalvate:rest.schedeSalvate,noteSessione:rest.noteSessione,esDB:rest.esDB,videoDB:rest.videoDB,clienti:rest.clienti};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='jacopspt_'+new Date().toISOString().slice(0,10)+'.json';a.click();};
  onImport=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);
    const nCli=Array.isArray(d.clienti)?d.clienti.length:0;const nProg=Array.isArray(d.cartella)?d.cartella.length:0;const nSalv=Array.isArray(d.schedeSalvate)?d.schedeSalvate.length:0;const nSch=Array.isArray(d.schede)?d.schede.length:0;const nDB=d.esDB?Object.values(d.esDB).reduce((a,v)=>a+(Array.isArray(v)?v.length:0),0):0;
    if(!nCli&&!nProg&&!nSalv&&!nSch){alert('Il file non contiene dati riconoscibili. Controlla di aver scelto il file jacopspt_….json giusto.');e.target.value='';return;}
    const riepilogo='Vuoi ripristinare questo backup?\n\n• '+nCli+' atleti\n• '+nProg+' progressioni\n• '+nSalv+' schede salvate\n• '+nSch+' schede di lavoro\n• '+nDB+' esercizi in archivio\n\nI dati attuali verranno sostituiti con quelli del file.';
    if(!confirm(riepilogo)){e.target.value='';return;}
    const upd={};if(d.schede){upd.schede=d.schede;upd.activeId=d.schede[0]&&d.schede[0].id;}if(d.logs)upd.logs=d.logs;if(d.cardioLogs)upd.cardioLogs=d.cardioLogs;if(d.cartella)upd.cartella=d.cartella;if(d.schedeSalvate)upd.schedeSalvate=d.schedeSalvate;if(d.noteSessione)upd.noteSessione=d.noteSessione;if(d.esDB)upd.esDB=d.esDB;if(d.videoDB&&typeof d.videoDB==='object')upd.videoDB=d.videoDB;if(Array.isArray(d.clienti)&&d.clienti.length){upd.clienti=d.clienti.map(c=>Object.assign(makeCliente(),c,{id:c.id||uid()}));upd.clienteId=upd.clienti[0].id;}
    this.setState(upd,()=>{try{this.persist();}catch(e2){}});this._toast('✓ Ripristinato: '+nCli+' atleti · '+nProg+' progressioni · '+nSalv+' schede salvate');e.target.value='';}catch(err){alert('File non valido o danneggiato. Scegli un file jacopspt_….json esportato dall\'app.');e.target.value='';}};r.readAsText(f);};

  // export per cliente
  buildClientData(){const st=this.state;const cli=this.activeCli();
    const get1RM=(e)=>e.oneRMauto?get1RMfromLogs(st.logs,e.id):(num(e.oneRM)||null);
    const schede=st.schede.map(s=>({id:s.id,nome:s.nome,nW:s.nW,
      esercizi:s.esercizi.filter(e=>e.nome).map(e=>{const rm=get1RM(e);const vid=e.video||(st.videoDB||{})[e.nome]||'';
        return {id:e.id,nome:e.nome,gruppo:e.gruppo,col:GCOL[e.gruppo]||'#1e3a5f',note:e.note||'',commento:e.commento||'',video:vid,rm:rm?Math.round(rm):null,
          settimane:e.settimane.map(w=>w.serie.map(sr=>({tipo:TIPI_L[sr.tipo]||'',rec:sr.rec||'',rpe:sr.rpe||'',plan:planLoadTxt(sr,rm)+(sr.tut?' · TUT '+sr.tut:''),rip:ripStr(sr)})))};}),
      cardio:(s.cardio||[]).map(c=>({nome:c.nome||'Cardio',settimane:c.settimane.map(w=>(w.attivita||[]).map(a=>[a.tipoAtt,a.tempo?a.tempo+' min':'',a.intervalliStruttura,(a.fcMin||a.fcMax)?('FC '+(a.fcMin||'')+'-'+(a.fcMax||'')):'',a.rpe?'RPE '+a.rpe:'',a.note].filter(Boolean).join(' · ')))}))}));
    return {clienteId:cli.id,cliente:cliLabel(cli),coach:(cli.cover&&cli.cover.coach)||'JacopsPT',programma:(cli.cover&&cli.cover.programma)||'',data:new Date().toLocaleDateString('it-IT'),schede,logs:st.logs||{}};}
  buildClientHTML(){const D=this.buildClientData();const json=JSON.stringify(D).replace(/</g,'\\u003c');const E=(t)=>String(t||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const SO='<scr'+'ipt>',SC='</scr'+'ipt>';
    const css='*{box-sizing:border-box}body{font-family:Inter,sans-serif;margin:0;background:#f4f5f7;color:#1c2127;font-size:14px}'
    +'.hd{background:#1e3a5f;color:#fff;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}'
    +".hd b{font-family:'Barlow Condensed';font-size:24px;letter-spacing:.03em}.hd .g{color:#d4a017;font-size:11px;font-weight:800;letter-spacing:.12em}"
    +'.wrap{max-width:900px;margin:0 auto;padding:16px}'
    +"h2{font-family:'Barlow Condensed';color:#1e3a5f;font-size:24px;margin:18px 0 8px}h3{font-family:'Barlow Condensed';color:#1e3a5f;font-size:19px;margin:14px 0 6px}"
    +'.mut{color:#6a7280;font-weight:400}.sm{font-size:12px}'
    +'.card{background:#fff;border:1px solid #e0e3e8;border-radius:12px;padding:12px;margin-bottom:12px}.exh{padding:2px 0 8px 10px;margin-bottom:8px}'
    +'.vid{background:#c0392b;color:#fff;border-radius:5px;padding:2px 8px;font-size:11px;font-weight:800;text-decoration:none;margin-left:6px}'
    +'table{width:100%;border-collapse:collapse;font-size:12.5px}th{text-align:left;font-size:10px;text-transform:uppercase;color:#9aa0a8;padding:4px 6px;border-bottom:1px solid #e0e3e8}'
    +'td{padding:4px 6px;border-bottom:1px solid #f0f1f4}tr.wtop td{border-top:2px solid #d9dde3;font-weight:700}'
    +'input{width:64px;border:1px solid #c7ccd3;border-radius:6px;padding:7px 6px;font-size:13px;text-align:center;font-family:Inter}'
    +'.tabs{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0;align-items:center}'
    +'.chip{background:#fff;border:1px solid #d9dde3;color:#6a7280;border-radius:8px;padding:9px 14px;font-weight:700;font-size:13px;cursor:pointer;font-family:Inter}'
    +'.chip.on{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.chip.gold{background:#d4a017;color:#16293f;border-color:#d4a017;font-weight:800}'
    +'.ft{text-align:center;color:#9aa0a8;font-size:11px;padding:20px}'
    +'a{color:#1f6aa0}@media print{.noprint{display:none}body{background:#fff}.card{border:1px solid #ccc;break-inside:avoid}input{border:1px solid #999}}';
    const js="var KEY='jacopspt-client-'+DATA.clienteId;var logs=(DATA.logs&&typeof DATA.logs==='object')?DATA.logs:{};"
    +"try{var sv=localStorage.getItem(KEY);if(sv){var p=JSON.parse(sv);if(p&&p.logs)logs=p.logs;}}catch(e){}"
    +"function save(){try{localStorage.setItem(KEY,JSON.stringify({logs:logs}))}catch(e){}}"
    +"function getL(sc,w,es,si){var b=logs[sc];var a=b&&b[w];if(!a)return{kg:'',rip:'',rpe:''};for(var i=0;i<a.length;i++)if(a[i].esId===es&&a[i].serieIdx===si)return a[i];return{kg:'',rip:'',rpe:''};}"
    +"function setL(sc,w,es,si,f,v){var b=logs[sc]||(logs[sc]={});var a=b[w]||(b[w]=[]);var l=null;for(var i=0;i<a.length;i++)if(a[i].esId===es&&a[i].serieIdx===si){l=a[i];break;}if(!l){l={esId:es,serieIdx:si,kg:'',rip:'',rpe:''};a.push(l);}l[f]=v;save();}"
    +"var view='scheda',week=0;"
    +"function esc(t){return String(t==null?'':t).replace(/[&<>\"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}"
    +"function maxW(){var m=1;DATA.schede.forEach(function(s){if(s.nW>m)m=s.nW});return m;}"
    +"function chip(lab,act,on,cls){return '<button class=\"chip'+(on?' on':'')+(cls?' '+cls:'')+'\" data-act=\"'+act+'\">'+lab+'</button>';}"
    +"function head(){return '<div class=\"tabs noprint\">'+chip('\\ud83d\\udccb Scheda','v:scheda',view==='scheda')+chip('\\u270d\\ufe0f Diario','v:diario',view==='diario')+'<span style=\"flex:1\"></span>'+chip('\\ud83d\\udda8 Stampa','print',false)+chip('\\ud83d\\udce4 Invia i miei carichi al coach','send',false,'gold')+'</div>';}"
    +"function exHead(e){var h='<div class=\"exh\" style=\"border-left:4px solid '+e.col+'\"><b>'+esc(e.nome)+'</b> <span class=\"mut sm\">'+esc(e.gruppo)+(e.rm?' \\u00b7 1RM '+e.rm+'kg':'')+'</span>';if(e.video)h+='<a class=\"vid\" target=\"_blank\" rel=\"noopener\" href=\"'+esc(e.video)+'\">\\u25b6 video</a>';if(e.note)h+='<div class=\"mut sm\">'+esc(e.note)+'</div>';if(e.commento)h+='<div class=\"mut sm\">\\ud83d\\udcac '+esc(e.commento)+'</div>';return h+'</div>';}"
    +"function vScheda(){var h='';DATA.schede.forEach(function(s){h+='<h2>'+esc(s.nome)+' <span class=\"mut\" style=\"font-size:15px\">('+s.nW+' settimane)</span></h2>';s.esercizi.forEach(function(e){h+='<div class=\"card\">'+exHead(e)+'<table><tr><th>Sett.</th><th>Serie</th><th>Tipo</th><th>Carico</th><th>Rip</th><th>Rec</th><th>RPE</th></tr>';e.settimane.forEach(function(serie,wi){serie.forEach(function(sr,si){h+='<tr'+(si===0?' class=\"wtop\"':'')+'><td>'+(si===0?'W'+(wi+1):'')+'</td><td>S'+(si+1)+'</td><td>'+esc(sr.tipo)+'</td><td>'+esc(sr.plan)+'</td><td>'+esc(sr.rip)+'</td><td>'+esc(sr.rec)+'</td><td>'+esc(sr.rpe)+'</td></tr>';});});h+='</table></div>';});s.cardio.forEach(function(c){h+='<div class=\"card\"><div class=\"exh\" style=\"border-left:4px solid #16a085\"><b>'+esc(c.nome)+'</b></div><table><tr><th>Sett.</th><th>Attivit\\u00e0</th></tr>';c.settimane.forEach(function(acts,wi){h+='<tr class=\"wtop\"><td>W'+(wi+1)+'</td><td>'+(acts.length?acts.map(esc).join('<br>'):'\\u2014')+'</td></tr>';});h+='</table></div>';});});return h;}"
    +"function inp(sc,es,si,f,v){return '<td><input inputmode=\"decimal\" placeholder=\"'+f+'\" value=\"'+esc(v)+'\" data-sc=\"'+sc+'\" data-w=\"'+week+'\" data-e=\"'+es+'\" data-i=\"'+si+'\" data-f=\"'+f+'\"></td>';}"
    +"function vDiario(){var h='<div class=\"tabs noprint\">';for(var i=0;i<maxW();i++)h+=chip('W'+(i+1),'w:'+i,week===i);h+='</div><h2>Diario \\u2014 Settimana '+(week+1)+'</h2>';DATA.schede.forEach(function(s){if(week>=s.nW)return;h+='<h3>'+esc(s.nome)+'</h3>';s.esercizi.forEach(function(e){var serie=e.settimane[week]||[];h+='<div class=\"card\">'+exHead(e)+'<table><tr><th>Serie</th><th>Piano</th><th>Rec</th><th>RPE piano</th><th>kg fatti</th><th>Rip fatte</th><th>RPE</th></tr>';serie.forEach(function(sr,si){var l=getL(s.id,week,e.id,si);h+='<tr><td>S'+(si+1)+'</td><td>'+esc(sr.plan)+(sr.rip?' \\u00d7 '+esc(sr.rip):'')+'</td><td>'+esc(sr.rec)+'</td><td>'+esc(sr.rpe)+'</td>'+inp(s.id,e.id,si,'kg',l.kg)+inp(s.id,e.id,si,'rip',l.rip)+inp(s.id,e.id,si,'rpe',l.rpe)+'</tr>';});h+='</table></div>';});s.cardio.forEach(function(c){var acts=c.settimane[week]||[];if(acts.length)h+='<div class=\"card\"><div class=\"exh\" style=\"border-left:4px solid #16a085\"><b>'+esc(c.nome)+'</b><div class=\"mut sm\">'+acts.map(esc).join(' \\u00b7 ')+'</div></div></div>';});});return h;}"
    +"function render(){document.getElementById('app').innerHTML=head()+(view==='scheda'?vScheda():vDiario());}"
    +"document.getElementById('app').addEventListener('input',function(ev){var d=ev.target.dataset;if(d&&d.f)setL(d.sc,+d.w,d.e,+d.i,d.f,ev.target.value);});"
    +"document.getElementById('app').addEventListener('click',function(ev){var b=ev.target.closest?ev.target.closest('button'):null;if(!b||!b.dataset.act)return;var a=b.dataset.act;"
    +"if(a==='print'){window.print();return;}"
    +"if(a==='send'){var blob=new Blob([JSON.stringify({tipo:'jacopspt-risposta',clienteId:DATA.clienteId,cliente:DATA.cliente,data:new Date().toLocaleDateString('it-IT'),logs:logs})],{type:'application/json'});var x=document.createElement('a');x.href=URL.createObjectURL(blob);x.download='carichi-'+DATA.cliente.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.json';x.click();alert('File scaricato! Invialo via mail al tuo coach: lo importer\\u00e0 nel suo gestionale.');return;}"
    +"if(a.slice(0,2)==='v:'){view=a.slice(2);render();return;}"
    +"if(a.slice(0,2)==='w:'){week=+a.slice(2);render();}});render();";
    return '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Scheda \u2014 '+E(D.cliente)+'</title>'
    +'<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;800&family=Inter:wght@400;700;800&display=swap" rel="stylesheet">'
    +'<style>'+css+'</style></head><body>'
    +'<div class="hd"><div><b>JACOPSPT</b><div class="g">OVER 40 FITNESS</div></div><div style="text-align:right"><div style="font-weight:800">'+E(D.cliente)+'</div><div style="font-size:12px;color:#bcc9da">'+E(D.programma)+(D.programma?' \u00b7 ':'')+'Coach '+E(D.coach)+' \u00b7 '+E(D.data)+'</div></div></div>'
    +'<div class="wrap"><div id="app"></div><div class="ft">JacopsPT \u00b7 Over 40 Fitness \u2014 i dati che inserisci restano salvati su questo dispositivo</div></div>'
    +SO+'var DATA='+json+';'+js+SC+'</body></html>';}
  onExportCliente=()=>{const cli=this.activeCli();if(!this.state.schede.some(s=>s.esercizi.some(x=>x.nome))){this._toast('La scheda di lavoro è vuota');return;}const html=this.buildClientHTML();const slug=(cliLabel(cli)||'cliente').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'cliente';const blob=new Blob([html],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='scheda-'+slug+'.html';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000);this._toast('📤 Scheda scaricata — allegala alla mail');};
  onMailCliente=()=>{const cli=this.activeCli();const em=(cli.anag.email||'').trim();if(!em){this._toast('Aggiungi l\'email nell\'anagrafica del cliente (tab Atleta)');return;}const sub=encodeURIComponent('La tua scheda di allenamento — JacopsPT');const body=encodeURIComponent('Ciao '+(cli.anag.nome||'')+',\n\nin allegato trovi la tua scheda di allenamento.\nAprila con il browser (Chrome/Safari): puoi consultare il programma, guardare i video degli esercizi, compilare kg e ripetizioni nel Diario e stampare tutto.\nI dati restano salvati sul tuo dispositivo: quando vuoi, tocca "Invia i miei carichi al coach" e mandami il file che scarica.\n\nBuon allenamento!\n'+((cli.cover&&cli.cover.coach)||'JacopsPT'));const gm='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(em)+'&su='+sub+'&body='+body;const a=document.createElement('a');a.href=gm;a.target='_blank';a.rel='noopener';a.style.display='none';document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),0);this._toast('✉️ Ricordati di allegare il file scaricato');};
  onImportRisposta=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d||typeof d.logs!=='object')throw 0;
    const ow=confirm('Risposta di '+(d.cliente||'cliente')+(d.data?' del '+d.data:'')+'.\n\nOK = sovrascrive anche i valori già presenti nel Diario\nAnnulla = compila solo le celle vuote');
    let n=0;this.setState(st=>{const logs=clone(st.logs);Object.keys(d.logs).forEach(sc=>{const b=logs[sc]=logs[sc]||{};Object.keys(d.logs[sc]).forEach(w=>{const arr=(b[w]||[]).slice();(d.logs[sc][w]||[]).forEach(l=>{if(!l||!l.esId)return;const i=arr.findIndex(x=>x.esId===l.esId&&x.serieIdx===l.serieIdx);if(i<0){if(l.kg||l.rip||l.rpe){arr.push({esId:l.esId,serieIdx:l.serieIdx,kg:l.kg||'',rip:l.rip||'',rpe:l.rpe||''});n++;}}else{const m=Object.assign({},arr[i]);let ch=false;['kg','rip','rpe'].forEach(k=>{if(l[k]&&(ow||!m[k])){m[k]=l[k];ch=true;}});if(ch){arr[i]=m;n++;}}});b[w]=arr;});});return {logs};},()=>this._toast('✓ Importate '+n+' serie nel Diario'+(d.cliente?' — '+d.cliente:'')));
    }catch(err){alert('File risposta non valido.');}e.target.value='';};r.readAsText(f);};

  // print
  buildPrint(tipo){const st=this.state;const sc=this.active();const nW=sc.nW;const WL=Array.from({length:nW},(_,i)=>'W'+(i+1));const get1RM=(e)=>e.oneRMauto?get1RMfromLogs(st.logs,e.id):(num(e.oneRM)||null);
    const css="*{box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:9pt;color:#111;margin:0;padding:12px}.hdr{display:flex;justify-content:space-between;border-bottom:2.5px solid #1e3a5f;padding-bottom:8px;margin-bottom:12px}h2{font-size:12pt;margin:0 0 6px;color:#1e3a5f}h3{font-size:10pt;margin:9px 0 3px;border-bottom:1px solid #ccc;padding-bottom:2px}table{width:100%;border-collapse:collapse;margin-bottom:7px;font-size:8pt}th{background:#eef;font-weight:600;border:.5px solid #aaa;padding:3px;text-align:center}td{border:.5px solid #aaa;padding:3px;text-align:center;vertical-align:top}.sl{font-size:7.5pt;margin-bottom:1px}.bx{border:1px solid #ccc;height:14px;margin-top:1px}.ft{margin-top:14px;border-top:1px solid #eee;padding-top:5px;font-size:7pt;color:#999;text-align:center}";
    const hdr="<div class='hdr'><div><strong style='font-size:14pt;color:#1e3a5f'>JACOPSPT</strong><div style='font-size:7.5pt;color:#d4a017;font-weight:bold'>OVER 40 FITNESS</div></div><div style='text-align:right;font-size:8pt;color:#555'><strong>"+(tipo==='scheda'?'Scheda':'Diario')+"</strong><br>"+new Date().toLocaleDateString('it-IT')+"</div></div>";
    let b='';
    if(tipo==='scheda'){b=hdr+"<h2>"+sc.nome+" — "+nW+" settimane</h2>";sc.esercizi.forEach(e=>{const rm=get1RM(e);b+="<h3>"+(e.nome||'—')+" — "+e.gruppo+(rm?" (1RM "+Math.round(rm)+"kg)":'')+"</h3><table><thead><tr>";WL.forEach((w,wi)=>b+="<th>"+w+" ("+((e.settimane[wi]&&e.settimane[wi].serie.length)||0)+"s)</th>");b+="</tr></thead><tbody><tr>";e.settimane.forEach(st2=>{b+="<td>";st2.serie.forEach((s,si)=>{b+="<div class='sl'><b>S"+(si+1)+"</b> "+(caricoStr(s)||'—')+" "+(ripStr(s)?'x'+ripStr(s):'')+" <span style='color:#888'>"+(s.rec||'')+(s.rpe?' @'+s.rpe:'')+(s.tut?' TUT '+s.tut:'')+"</span><div class='bx'></div></div>";});b+="</td>";});b+="</tr></tbody></table>";if(e.commento)b+="<div style='font-size:7pt;color:#666'>"+e.commento+"</div>";const vid=e.video||(st.videoDB||{})[e.nome]||'';if(vid)b+="<div style='display:flex;align-items:center;gap:6px;margin:2px 0 4px'><img src='https://api.qrserver.com/v1/create-qr-code/?size=54x54&amp;data="+encodeURIComponent(vid)+"' width='54' height='54' style='border:1px solid #ddd'><span style='font-size:7pt;color:#1f6aa0;word-break:break-all'>&#9654; Video esecuzione (inquadra il QR):<br>"+vid+"</span></div>";});}
    else{b=hdr+"<h2>Diario di Allenamento — "+nW+" settimane</h2>";WL.forEach((wl,wi)=>{b+="<div class='wk'"+(wi>0?" style='page-break-before:always'":"")+"><h2 style='margin-top:0;color:#1e3a5f;border-bottom:2px solid #d4a017;padding-bottom:3px'>Settimana "+(wi+1)+"</h2>";const note=st.noteSessione[wi];if(note)b+="<div style='font-size:8pt;color:#444;margin:0 0 6px;font-style:italic'>Note: "+note+"</div>";st.schede.forEach(s=>{b+="<h3>"+s.nome+"</h3>";s.esercizi.forEach(e=>{const rm=get1RM(e);const stt=e.settimane[wi];if(!stt)return;b+="<div style='font-weight:700;font-size:8.5pt;margin:5px 0 2px'>"+(e.nome||'—')+" — "+e.gruppo+(rm?" (1RM "+Math.round(rm)+"kg)":'')+"</div><table><thead><tr><th>S.</th><th>Tipo</th><th>Rec</th><th>RPE</th><th>Pianificato</th><th>kg</th><th>rip</th><th>RPE</th></tr></thead><tbody>";stt.serie.forEach((s2,si)=>{const cTxt=planLoadTxt(s2,rm);const log=this.getLog(s.id,wi,e.id,si);b+="<tr><td><b>S"+(si+1)+"</b></td><td>"+(TIPI_L[s2.tipo]||'')+"</td><td>"+(s2.rec||'')+"</td><td>"+(s2.rpe||'—')+"</td><td>"+cTxt+(ripStr(s2)?' '+ripStr(s2):'')+(s2.tut?' TUT '+s2.tut:'')+"</td><td>"+(log.kg||"<div class='bx'></div>")+"</td><td>"+(log.rip||"<div class='bx'></div>")+"</td><td>"+(log.rpe||"<div class='bx'></div>")+"</td></tr>";});b+="</tbody></table>";});});b+="</div>";});}
    return "<!DOCTYPE html><html><head><meta charset='utf-8'><title>JacopsPT</title><style>"+css+"</style></head><body>"+b+"<div class='ft'>JacopsPT · Over 40 Fitness</div></body></html>";}
  buildDiarioParts(withCover){const st=this.state;const nW=Math.max(...st.schede.map(s=>s.nW));const cli=this.activeCli?this.activeCli():null;const atleta=cli&&cli.anag&&(cli.anag.nome||'')?cli.anag.nome:'';
    const esc=(s)=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const get1RM=(e)=>e.oneRMauto?get1RMfromLogs(st.logs,e.id):(num(e.oneRM)||null);
    const css=`@page{size:A4;margin:12mm 11mm 13mm}*{box-sizing:border-box;margin:0;padding:0}html,body{background:#fff}
body{font-family:'Inter',Arial,sans-serif;color:#1c2127;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:9pt}
.dw .page{width:188mm;min-height:268mm;padding:0;page-break-after:always;display:flex;flex-direction:column;font-family:'Inter',Arial,sans-serif;font-size:9pt;color:#1c2127}
.dw .hdr{display:flex;align-items:baseline;justify-content:space-between;border-bottom:3px solid #1e3a5f;padding-bottom:6px;margin-bottom:4px}
.dw .logo{font-family:'Barlow Condensed',Arial;font-weight:800;font-size:19pt;color:#1e3a5f;letter-spacing:.02em}
.dw .logo small{display:block;font-size:7.5pt;color:#555;letter-spacing:.18em;font-weight:800}
.dw .wktag{font-family:'Barlow Condensed',Arial;font-weight:800;font-size:26pt;color:#1e3a5f;line-height:1}
.dw .meta{display:flex;gap:14px;font-size:8pt;color:#6a7280;margin-bottom:8px;padding:5px 0;border-bottom:1px solid #e3e6ea}
.dw .meta b{color:#1c2127}
.dw .wline{display:inline-block;border-bottom:1px solid #9aa0a8;min-width:32mm}
.dw .sess{margin-bottom:9px;break-inside:avoid}
.dw .sessh{display:flex;align-items:baseline;justify-content:space-between;background:#fff;color:#1e3a5f;border:1.2px solid #1e3a5f;border-bottom:none;border-radius:4px 4px 0 0;padding:4px 9px}
.dw .sessh .n{font-family:'Barlow Condensed',Arial;font-weight:800;font-size:12.5pt;letter-spacing:.03em;color:#1e3a5f}
.dw .sessh .d{font-size:7.5pt;color:#6a7280}.dw .sessh .d span{display:inline-block;border-bottom:1px solid #9aa0a8;min-width:24mm}
.dw .ex{border:1px solid #d7dbe1;border-top:none;break-inside:avoid}
.dw .exh{display:flex;align-items:center;gap:6px;padding:3px 8px;background:#f2f4f6}
.dw .exh .bar{width:3.5px;height:11px;border-radius:2px}
.dw .exh b{font-size:9.5pt}.dw .exh .g{font-size:7.5pt;font-weight:800;text-transform:uppercase;letter-spacing:.05em}.dw .exh .rm{margin-left:auto;font-size:7.5pt;color:#6a7280}
.dw .exnote{font-size:7.5pt;color:#333;background:#f0f1f3;padding:2px 8px;border-top:1px solid #d7dbe1;font-style:italic}
.dw table{width:100%;border-collapse:collapse;font-size:8pt;margin:0}
.dw th{background:#eef1f4;color:#4a5260;font-weight:700;border:.5px solid #c9ced6;padding:2.5px 3px;text-align:center;font-size:7pt;text-transform:uppercase;letter-spacing:.04em}
.dw td{border:.5px solid #c9ced6;padding:3px;text-align:center;height:7mm;vertical-align:middle;font-size:8pt}
.dw td.pl{background:#f7f8fa;color:#3a414c;text-align:left;padding-left:7px}
.dw td.sN{font-weight:800;color:#1e3a5f;background:#f7f8fa;width:8mm}
.dw .fill{color:#111;font-weight:800}
.dw .wnote{border:1px dashed #c7ccd3;border-radius:4px;min-height:16mm;margin-top:auto;padding:4px 8px;font-size:7.5pt;color:#9aa0a8}
.dw .ft{text-align:center;font-size:7pt;color:#9aa0a8;margin-top:6px}
.dw .cover{align-items:center;justify-content:center;text-align:center;padding:0}
.dw .cover img{width:78mm;height:78mm;object-fit:contain}
.dw .cover .ct{font-family:'Barlow Condensed',Arial;font-weight:800;font-size:34pt;color:#1e3a5f;letter-spacing:.02em;line-height:.95;margin-top:14mm}
.dw .cover .cs{font-family:'Barlow Condensed',Arial;font-weight:700;font-size:11pt;letter-spacing:.28em;color:#d4a017;margin-top:6mm}
.dw .cover .cr{width:64mm;height:3px;background:#d4a017;margin:9mm 0}
.dw .cover .cm{font-size:10pt;color:#3a414c}.dw .cover .cm b{color:#1e3a5f}`;
    const logoUrl=(()=>{try{return new URL('assets/jacopspt-icon.png',location.href).href;}catch(e){return 'assets/jacopspt-icon.png';}})();
    const cover=`<div class="page cover"><img src="${logoUrl}" alt="JacopsPT"><div class="ct">DIARIO DI<br>ALLENAMENTO</div><div class="cs">OVER 40 FITNESS</div><div class="cr"></div><div class="cm">Atleta: <b>${atleta?esc(atleta):'________________'}</b></div><div class="cm" style="margin-top:3mm;color:#6a7280">${nW} settimane di programmazione</div></div>`;
    let pages=withCover?cover:'';
    for(let wi=0;wi<nW;wi++){
      let b=`<div class="hdr"><div class="logo">JACOPSPT<small>OVER 40 FITNESS · DIARIO DI ALLENAMENTO</small></div><div class="wktag">W${wi+1}</div></div>`;
      b+=`<div class="meta"><span>Atleta: <b>${atleta?esc(atleta):'<span class="wline">&nbsp;</span>'}</b></span><span>Settimana <b>${wi+1} / ${nW}</b></span><span>Dal <span class="wline">&nbsp;</span></span><span>Al <span class="wline">&nbsp;</span></span></div>`;
      st.schede.forEach(s=>{
        const exs=s.esercizi.filter(e=>e.nome&&e.settimane[wi]&&e.settimane[wi].serie.length);if(!exs.length)return;
        b+=`<div class="sess"><div class="sessh"><span class="n">${esc(s.nome)}</span><span class="d">Data <span>&nbsp;</span> &nbsp; Durata <span style="min-width:14mm">&nbsp;</span></span></div>`;
        exs.forEach(e=>{const rm=get1RM(e);const col=GCOL[e.gruppo]||'#1e3a5f';
          b+=`<div class="ex"><div class="exh"><span class="bar" style="background:#1c2127"></span><b>${esc(e.nome)}</b><span class="g" style="color:#444">${esc(e.gruppo)}</span><span class="rm">${rm?'1RM '+Math.round(rm)+' kg':''}</span></div>`;
          if(e.note)b+=`<div class="exnote">✎ ${esc(e.note)}</div>`;
          b+=`<table><thead><tr><th>Serie</th><th style="width:34%">Pianificato</th><th>Rec</th><th style="width:13%">Kg usati</th><th style="width:11%">Rip fatte</th><th style="width:9%">RPE</th><th style="width:16%">Note</th></tr></thead><tbody>`;
          e.settimane[wi].serie.forEach((s2,si)=>{const log=this.getLog(s.id,wi,e.id,si);const plan=planLoadTxt(s2,rm)+(ripStr(s2)?' × '+ripStr(s2):'')+(s2.rpe?' @'+s2.rpe:'')+(s2.tut?' · TUT '+s2.tut:'');
            b+=`<tr><td class="sN">S${si+1}</td><td class="pl">${esc(plan)}</td><td>${esc(s2.rec||'')}</td><td>${log.kg?'<span class="fill">'+esc(log.kg)+'</span>':''}</td><td>${log.rip?'<span class="fill">'+esc(log.rip)+'</span>':''}</td><td>${log.rpe?'<span class="fill">'+esc(log.rpe)+'</span>':''}</td><td></td></tr>`;});
          b+=`</tbody></table></div>`;});
        b+=`</div>`;});
      const note=st.noteSessione[wi];
      b+=`<div class="wnote">Note della settimana${note?': <span style="color:#3a414c;font-style:italic">'+esc(note)+'</span>':' — sensazioni, dolori, sonno, alimentazione…'}</div>`;
      b+=`<div class="ft">JacopsPT · Over 40 Fitness — Settimana ${wi+1} di ${nW}</div>`;
      pages+=`<div class="page">${b}</div>`;}
    return {css,pages:`<div class="dw">${pages}</div>`};}
  buildDiarioPrint(){const p=this.buildDiarioParts(true);
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Diario — JacopsPT</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"><style>${p.css}</style></head><body>${p.pages}</body></html>`;}
  openPrint(tipo){const html=tipo==='diario'?this.buildDiarioPrint():this.buildPrint(tipo);const w=window.open('','_blank');if(!w){this._toast('Abilita i popup per stampare');return;}w.document.open();w.document.write(html);w.document.close();setTimeout(()=>{try{w.focus();w.print();}catch(e){}},350);}
  onPrintScheda=()=>this.openPrint('scheda');
  onPrintDiario=()=>this.openPrint('diario');

  // ---- CLIENTE ----
  activeCli(){return this.state.clienti.find(c=>c.id===this.state.clienteId)||this.state.clienti[0];}
  onPickCli=(e)=>this.setState({clienteId:e.currentTarget.dataset.id});
  onAddCli=()=>{const c=makeCliente();this.setState(st=>({clienti:st.clienti.concat([c]),clienteId:c.id}));};
  onDelCli=()=>{const cur=this.activeCli();if(!confirm('Eliminare l\'atleta "'+cliLabel(cur)+'" con tutti i suoi dati?'))return;const snap=clone(cur);this.setState(st=>{if(st.clienti.length<=1){const fresh=makeCliente();return {clienti:[fresh],clienteId:fresh.id};}const clienti=st.clienti.filter(c=>c.id!==st.clienteId);return {clienti,clienteId:clienti[0].id};});this._toast('Atleta eliminato',()=>this.setState(st=>({clienti:st.clienti.concat([snap]),clienteId:snap.id})));};
  onDupCli=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>{const c=st.clienti.find(x=>x.id===id);if(!c)return{};const cl=clone(c);cl.id=uid();cl.anag=Object.assign({},cl.anag,{nome:((cl.anag.nome||'')+' (copia)').trim()});cl.storico=[];return {clienti:st.clienti.concat([cl])};});this._toast('Atleta duplicato');};
  onDupSalvata=(e)=>{const id=e.currentTarget.dataset.id;this.setState(st=>{const sv=st.schedeSalvate.find(x=>x.id===id);if(!sv)return{};const cl=clone(sv);cl.id=uid();cl.nome=sv.nome+' (copia)';cl.data=new Date().toLocaleDateString('it-IT');cl.schede.forEach(s=>{s.id=uid();});return {schedeSalvate:st.schedeSalvate.concat([cl])};});this._toast('Programma duplicato');};
  mutCli(path,val){this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);setPath(c,path,val);arr[i]=c;return {clienti:arr};});}
  onCli=(e)=>this.mutCli(e.currentTarget.dataset.k,e.target.value);
  onCliSet=(e)=>{const d=e.currentTarget.dataset;this.mutCli(d.k,d.v);};
  onCliSel=(e)=>this.mutCli(e.currentTarget.dataset.k,e.target.value);
  onNutriToggle=(e)=>{const k=e.currentTarget.dataset.k;const cur=getPath(this.activeCli(),k);this.mutCli(k,!cur);};
  onNutriIntol=(e)=>{const v=e.currentTarget.dataset.v;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);c.nutri=c.nutri||makeNutri();const a=c.nutri.intolleranze||[];const j=a.indexOf(v);if(j<0)a.push(v);else a.splice(j,1);c.nutri.intolleranze=a;arr[i]=c;return{clienti:arr};});};
  onApplyDefSug=()=>{const cli=this.activeCli();const C=nutriCalc(cli,this.cliBFnow(cli));const s=defSug(cli,C);
    if(!s.show)return;this.mutCli('nutri.adjMode','kcal');this.mutCli('nutri.adjVal',String(s.daily));this.mutCli('nutri.timeline',s.weeks+' settimane');
    this._toast('✓ Applicato: '+(s.daily>0?'+':'')+s.daily+' kcal/giorno · '+s.weeks+' settimane');};
  onNutriGiorno=(e)=>{const d=e.currentTarget.dataset.d;const cur=getPath(this.activeCli(),'nutri.giorni.'+d);this.mutCli('nutri.giorni.'+d,!cur);};
  onNutriImportFreq=()=>{const c=this.activeCli();const freq=c.frequenza||'';const map={'4':['lun','mar','gio','ven'],'3':['lun','mer','ven'],'2':['lun','gio'],'1':['mer']};const days=map[freq]||['lun','mer','ven'];const g={};GG.forEach(x=>g[x.k]=days.indexOf(x.k)>=0);this.mutCli('nutri.giorni',g);this._toast('✓ Giorni importati dalla frequenza scheda');};
  onNutriAddInt=()=>{this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);c.nutri=c.nutri||makeNutri();c.nutri.integratori=(c.nutri.integratori||[]).concat([makeIntegr()]);arr[i]=c;return{clienti:arr};});};
  onNutriDelInt=(e)=>{const idx=+e.currentTarget.dataset.i;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);c.nutri.integratori.splice(idx,1);arr[i]=c;return{clienti:arr};});};
  onNutriMoveInt=(e)=>{const idx=+e.currentTarget.dataset.i,dir=+e.currentTarget.dataset.dir;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);const L=c.nutri.integratori;const j=idx+dir;if(j<0||j>=L.length)return{};const t=L[idx];L[idx]=L[j];L[j]=t;arr[i]=c;return{clienti:arr};});};
  onNutriIntField=(e)=>{const d=e.currentTarget.dataset;this.mutCli('nutri.integratori.'+d.i+'.'+d.f,e.target.value);};
  onNutriIntToggle=(e)=>{const d=e.currentTarget.dataset;const cur=getPath(this.activeCli(),'nutri.integratori.'+d.i+'.'+d.f);this.mutCli('nutri.integratori.'+d.i+'.'+d.f,!cur);};
  onNutriDay=(e)=>this.setState({nutriDay:+e.currentTarget.dataset.d});
  onNutriView=(e)=>this.setState({nutriView:e.currentTarget.dataset.v});
  onTogglePrompt=()=>this.setState(st=>({promptOpen:!st.promptOpen}));
  onNutriTpl=(e)=>this.mutCli('nutri.promptTpl',e.target.value);
  onGenMode=(e)=>this.mutCli('nutri.genMode',e.currentTarget.dataset.v);
  giorniLabels(N){const on=GG.filter(g=>N.giorni&&N.giorni[g.k]),off=GG.filter(g=>!(N.giorni&&N.giorni[g.k]));const full={lun:'lunedì',mar:'martedì',mer:'mercoledì',gio:'giovedì',ven:'venerdì',sab:'sabato',dom:'domenica'};return {on:on.map(g=>full[g.k]).join(', ')||'nessuno',off:off.map(g=>full[g.k]).join(', ')||'nessuno'};}
  nutriDataBlock(cli,C){const N=cli.nutri;const L=[];const add=(k,v)=>{if(v!=null&&String(v).trim()!=='')L.push(k+': '+v);};
    const sx=cli.anag.sesso;const sexW=sx==='F'?'donna':(sx==='M'?'uomo':'soggetto');
    add('Soggetto',sexW+(C.eta?', '+r0(C.eta)+' anni':''));
    add('Altezza',C.altezza?r0(C.altezza)+' cm':'');
    add('Peso',isNaN(C.peso)?'':r1(C.peso)+' kg');
    if(!isNaN(C.bf))add('Composizione',r1(C.bf)+'% massa grassa ('+r1(C.fatKg)+' kg), massa magra '+r1(C.lbm)+' kg');
    add('Obiettivo',N.obiettivo);
    if(N.pesoTarget)add('Peso target',N.pesoTarget+' kg'+(N.timeline?' in '+N.timeline:''));
    const gl=this.giorniLabels(N);
    add('Giorni allenamento (ON)',gl.on+(N.orarioAllen?' — sessioni alle '+N.orarioAllen:'')+(N.tipoAllen?' ('+N.tipoAllen+')':''));
    add('Giorni riposo (OFF)',gl.off);
    const intoll=[].concat(N.intolleranze||[]);if(N.intollNote)intoll.push(N.intollNote);
    add('Intolleranze/allergie',intoll.join(', '));
    add('Patologie',N.patologie);
    add('Regime alimentare',N.regime==='altro'?(N.regimeAltro||'altro'):N.regime);
    {const fp={animali:'PREVALENTEMENTE ANIMALI (carne, pesce, uova, latticini) — usa fonti vegetali solo come contorno marginale',miste:'MISTE (alterna fonti animali e vegetali, buon equilibrio tra le due)',vegetali:'VEGETALI (legumi, tofu, tempeh, seitan, edamame, proteine vegetali) — evita carne e pesce'};add('Fonti proteiche richieste',(fp[N.fontiProt]||fp.miste)+'. Mantieni la MASSIMA varietà ruotando tra le fonti ammesse e rispettando intolleranze/allergie e alimenti esclusi.');}
    add('Alimenti esclusi',N.alimentiEsclusi);
    add('Pasti al giorno',N.nPasti);
    add('Orari indicativi pasti',N.orariPasti);
    add('Tempo per cucinare',N.tempoCucina);
    L.push('');
    add('TDEE stimato',isNaN(C.tdee)?'':r0(C.tdee)+' kcal');
    const adj=N.adjMode==='kcal'?((num(N.adjVal)>=0?'+':'')+r0(num(N.adjVal))+' kcal'):((num(N.adjVal)>=0?'+':'')+num(N.adjVal)+'%');
    add('Target giornaliero',isNaN(C.kcalTarget)?'':r0(C.kcalTarget)+' kcal ('+adj+')');
    add('Proteine',isNaN(C.protG)?'':r0(C.protG)+' g ('+N.protPerKg+' g/kg '+(N.protBase==='magra'?'massa magra':'peso corporeo')+')');
    add('Grassi',isNaN(C.fatG)?'':r0(C.fatG)+' g');
    add('Carboidrati',isNaN(C.carbG)?'':r0(C.carbG)+' g (a completamento delle kcal residue)');
    if(N.carbCyc&&!isNaN(C.carbOff))L.push('Ciclizzazione: nei giorni OFF riduci i carboidrati a '+r0(C.carbOff)+' g mantenendo invariati proteine e grassi.');
    if(N.timingOn)L.push('Timing: nei giorni ON concentra i carboidrati nel pasto pre-workout (~'+N.preMin+' min prima) e post-workout (entro '+N.postMin+' min).'+(N.intraOn?' Prevedi un intra-workout.':''));
    const integ=(N.integratori||[]).filter(it=>it.nome);
    if(integ.length){L.push('');L.push('Integrazione prevista:');
      const tmap={risveglio:'al risveglio',colazione:'a colazione',pre:'pre-workout',intra:'intra-workout',post:'post-workout',pasto:'con un pasto',prima_dormire:'prima di dormire',vuoto:'a stomaco vuoto'};
      const fmap={ogni:'tutti i giorni',on:'nei soli giorni di allenamento',off:'nei soli giorni di riposo'};
      integ.forEach(it=>{let s='- '+it.nome+(it.dose?' '+it.dose+(it.unita||''):'')+' '+(fmap[it.freq]||'')+' '+(tmap[it.timing]||'');
        if(it.conteggia)s+=' ('+(r0(num(it.kcal))||0)+' kcal, '+(num(it.p)||0)+'P/'+(num(it.c)||0)+'C/'+(num(it.g)||0)+'G — già conteggiato nei totali)';
        if(it.note)s+=' ['+it.note+']';L.push(s);});
    }
    return L.join('\n');}
  nutriPrompt(cli,C,request){return (cli.nutri.promptTpl||DEFAULT_NUTRI_TPL)+"\n\n=== DATI SOGGETTO ===\n"+this.nutriDataBlock(cli,C)+"\n\n=== RICHIESTA ===\n"+request;}
  replicateArche(arche,N){const on=arche.find(d=>String(d.tipoGiorno).toUpperCase()==='ON')||arche[0];const off=arche.find(d=>String(d.tipoGiorno).toUpperCase()==='OFF')||arche[arche.length-1]||on;const full={lun:'lunedì',mar:'martedì',mer:'mercoledì',gio:'giovedì',ven:'venerdì',sab:'sabato',dom:'domenica'};
    return GG.map(g=>{const isOn=!!(N.giorni&&N.giorni[g.k]);const src=isOn?on:off;const d=src?clone(src):{pasti:[]};d.giorno=full[g.k];d.tipoGiorno=isOn?'ON':'OFF';return d;});}
  buildLista(settimana,N){const seen={};const agg={};
    settimana.forEach(d=>{(d.pasti||[]).forEach(m=>{(m.alimenti||[]).forEach(a=>{const key=(a.alimento||'').trim().toLowerCase();if(!key)return;const cat=catOf(a.alimento);agg[cat]=agg[cat]||{};agg[cat][key]=agg[cat][key]||{nome:a.alimento,g:0};agg[cat][key].g+=num(a.grammi)||0;});});});
    const integ=(N.integratori||[]).filter(it=>it.nome);if(integ.length){agg['Integratori']=agg['Integratori']||{};integ.forEach(it=>{const k=it.nome.toLowerCase();agg['Integratori'][k]={nome:it.nome+(it.dose?' '+it.dose+(it.unita||''):''),g:0};});}
    const order=['Carne','Pesce','Uova','Latticini','Cereali & amidi','Verdura','Frutta','Frutta secca & semi','Grassi & condimenti','Integratori','Altro'];
    const out=[];order.forEach(cat=>{if(!agg[cat])return;const voci=Object.keys(agg[cat]).map(k=>{const it=agg[cat][k];return it.g>0?it.nome+' — '+r0(it.g*7/1000*10)/10+' kg/sett':it.nome;});out.push({categoria:cat,voci});});
    return out;}
  onCopyPrompt=()=>{const cli=this.activeCli();const C=nutriCalc(cli,this.cliBFnow(cli));const req=(cli.nutri.genMode==='sequenziale')?'Genera l\'intera settimana (lun-dom) con i tipiGiorno ON/OFF indicati.':'Genera un GIORNO-TIPO ON (allenamento) e un GIORNO-TIPO OFF (riposo) completi.';const full=NUTRI_SYS+"\n\n"+this.nutriPrompt(cli,C,req);
    try{navigator.clipboard.writeText(full);this._toast('✓ Prompt copiato negli appunti');}catch(e){this.setState({genPromptCopy:full});this._toast('Prompt pronto qui sotto — copialo manualmente');}};
  async onGenPiano(){const cli=this.activeCli();const C=nutriCalc(cli,this.cliBFnow(cli));
    if(isNaN(C.kcalTarget)){this._toast('Completa peso, altezza ed età per calcolare il target');return;}
    if(!(window.claude&&window.claude.complete)){this._toast('⚠ Generazione AI non disponibile qui — usa "Copia prompt"');return;}
    const N=cli.nutri;const mode=N.genMode||'archetipo';const full={lun:'lunedì',mar:'martedì',mer:'mercoledì',gio:'giovedì',ven:'venerdì',sab:'sabato',dom:'domenica'};
    this.setState({genLoading:true,genErr:'',genProgress:mode==='sequenziale'?{done:0,total:3}:{done:0,total:1}});
    try{let settimana=[];
      if(mode==='archetipo'){
        const raw=await window.claude.complete({model:MODEL_NUTRI,max_tokens:8000,system:NUTRI_SYS,messages:[{role:'user',content:this.nutriPrompt(cli,C,'Genera un GIORNO-TIPO ON (allenamento) e un GIORNO-TIPO OFF (riposo) completi, con tutti i pasti richiesti.')}]});
        const j=parseNutriJSON(raw);if(!j||!Array.isArray(j.settimana)||!j.settimana.length)throw new Error('Risposta non valida dal modello');
        settimana=this.replicateArche(j.settimana,N);
      }else{
        const chunks=[['lun','mar','mer'],['gio','ven','sab'],['dom']];
        for(let ci=0;ci<chunks.length;ci++){const days=chunks[ci].map(k=>full[k]+' ('+((N.giorni&&N.giorni[k])?'ON':'OFF')+')').join(', ');
          const usati=[...new Set(settimana.flatMap(d=>(d.pasti||[]).flatMap(m=>(m.alimenti||[]).map(a=>a.alimento))).filter(Boolean))];
          const fpMap={animali:'privilegiando fonti proteiche ANIMALI diverse',miste:'alternando fonti proteiche animali e vegetali',vegetali:'usando solo fonti proteiche VEGETALI diverse'};const fpTxt=fpMap[N.fontiProt]||fpMap.miste;
          const avoid=usati.length?' Nei giorni precedenti hai già usato questi alimenti: '+usati.join(', ')+'. Usa fonti DIVERSE ('+fpTxt+') per garantire varietà nella settimana.':'';
          const raw=await window.claude.complete({model:MODEL_NUTRI,max_tokens:8000,system:NUTRI_SYS,messages:[{role:'user',content:this.nutriPrompt(cli,C,'Genera ESATTAMENTE e SOLO questi giorni completi: '+days+'. Campo "giorno" in minuscolo (es. "lunedì").'+avoid)}]});
          const j=parseNutriJSON(raw);if(!j||!Array.isArray(j.settimana))throw new Error('Risposta non valida (blocco '+(ci+1)+')');
          settimana=settimana.concat(j.settimana);this.setState({genProgress:{done:ci+1,total:chunks.length}});}
      }
      const listaSpesa=this.buildLista(settimana,N);
      const piano={data:new Date().toLocaleDateString('it-IT'),ora:new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}),mode,settimana,listaSpesa,note:(N.piano&&N.piano.note)||''};
      this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{genLoading:false};const arr=st.clienti.slice();const c=clone(arr[i]);c.nutri=c.nutri||makeNutri();if(c.nutri.piano)c.nutri.pianiStorico=(c.nutri.pianiStorico||[]).concat([c.nutri.piano]).slice(-8);c.nutri.piano=piano;arr[i]=c;return{clienti:arr,genLoading:false,nutriDay:0,nutriView:'piano'};},()=>this._toast('✓ Piano alimentare generato'));
    }catch(e){this.setState({genLoading:false,genErr:String((e&&e.message)||e)});}}
  onRestorePiano=(e)=>{const idx=+e.currentTarget.dataset.i;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);const h=c.nutri.pianiStorico||[];const p=h[idx];if(!p)return{};h.splice(idx,1);if(c.nutri.piano)h.push(c.nutri.piano);c.nutri.pianiStorico=h;c.nutri.piano=p;arr[i]=c;return{clienti:arr,nutriDay:0};});};
  onDelPiano=()=>{if(!confirm('Eliminare il piano alimentare corrente?'))return;this.mutCli('nutri.piano',null);};
  onPianoFood=(e)=>{const d=e.currentTarget.dataset;this.mutCli('nutri.piano.settimana.'+d.day+'.pasti.'+d.m+'.alimenti.'+d.a+'.'+d.f,e.target.value);};
  onPianoAddFood=(e)=>{const d=e.currentTarget.dataset;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);c.nutri.piano.settimana[d.day].pasti[d.m].alimenti.push({alimento:'',grammi:'',kcal:'',p:'',c:'',g:''});arr[i]=c;return{clienti:arr};});};
  onPianoDelFood=(e)=>{const d=e.currentTarget.dataset;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);c.nutri.piano.settimana[d.day].pasti[d.m].alimenti.splice(+d.a,1);arr[i]=c;return{clienti:arr};});};
  onPrintPiano=()=>{const cli=this.activeCli();if(!cli.nutri||!cli.nutri.piano){this._toast('Nessun piano da stampare');return;}const html=this.buildPianoPrint(cli);const w=window.open('','_blank');if(w){w.document.write(html);w.document.close();setTimeout(()=>{try{w.focus();w.print();}catch(e){}},350);}else{this._toast('Consenti i popup per stampare');}};
  buildPianoPrint(cli){const P=cli.nutri.piano;const esc=(s)=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const atleta=cliLabel(cli);const logoUrl=(()=>{try{return new URL('assets/jacopspt-icon.png',location.href).href;}catch(e){return 'assets/jacopspt-icon.png';}})();
    const css="@page{size:A4;margin:12mm 11mm 13mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',Arial,sans-serif;color:#1c2127;font-size:10pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}"
      +".pg{page-break-after:always}.cover{min-height:250mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.cover img{width:70mm;height:70mm;object-fit:contain}.cover h1{font-family:'Barlow Condensed',Arial;font-weight:800;font-size:32pt;color:#1e3a5f;margin-top:12mm;line-height:.95}.cover .s{font-family:'Barlow Condensed';font-weight:700;letter-spacing:.26em;color:#d4a017;font-size:11pt;margin-top:5mm}.cover .r{width:58mm;height:3px;background:#d4a017;margin:8mm 0}.cover .m{font-size:11pt;color:#3a414c}"
      +"h2{font-family:'Barlow Condensed',Arial;font-weight:800;color:#1e3a5f;font-size:20pt;border-bottom:2px solid #d4a017;padding-bottom:3px;margin-bottom:8px}"
      +".day{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}.tag{font-size:9pt;font-weight:800;padding:2px 9px;border-radius:10px;color:#fff}.on{background:#27ae60}.off{background:#9aa0a8}"
      +"table{width:100%;border-collapse:collapse;margin-bottom:6px}th,td{border:1px solid #d9dde3;padding:4px 6px;font-size:8.5pt;text-align:left}th{background:#f4f5f7;font-weight:800;color:#1e3a5f}td.n{text-align:right;font-variant-numeric:tabular-nums}"
      +".meal{font-family:'Barlow Condensed';font-weight:800;font-size:12pt;color:#1e3a5f;margin:9px 0 3px}.meal small{font-weight:600;color:#9aa0a8;font-size:9pt}"
      +".alt{font-size:8pt;color:#6a7280;font-style:italic;margin:2px 0 4px}.tot{background:#1e3a5f;color:#fff;font-weight:800}.tot td{color:#fff;border-color:#1e3a5f}"
      +".integ{margin-top:6px}.integ th{background:#fffaf0;color:#a9780b}.ftr{text-align:center;font-size:7pt;color:#9aa0a8;margin-top:8px}";
    let body="<div class='cover pg'><img src='"+logoUrl+"'><h1>PIANO<br>ALIMENTARE</h1><div class='s'>OVER 40 FITNESS</div><div class='r'></div><div class='m'>Atleta: <b>"+esc(atleta)+"</b></div><div class='m' style='color:#6a7280;margin-top:3mm'>Generato il "+esc(P.data)+"</div></div>";
    (P.settimana||[]).forEach((d,di)=>{const on=String(d.tipoGiorno).toUpperCase()==='ON';
      body+="<div class='pg'><div class='day'><h2 style='border:none;padding:0;margin:0'>"+esc(d.giorno||('Giorno '+(di+1)))+"</h2><span class='tag "+(on?'on':'off')+"'>"+(on?'ALLENAMENTO':'RIPOSO')+"</span></div>";
      (d.pasti||[]).forEach(m=>{body+="<div class='meal'>"+esc(m.nome||'Pasto')+(m.orario?" <small>"+esc(m.orario)+"</small>":'')+"</div>";
        body+="<table><tr><th>Alimento</th><th style='width:52px'>g</th><th style='width:48px'>kcal</th><th style='width:34px'>P</th><th style='width:34px'>C</th><th style='width:34px'>G</th></tr>";
        (m.alimenti||[]).forEach(a=>{body+="<tr><td>"+esc(a.alimento)+"</td><td class='n'>"+esc(a.grammi)+"</td><td class='n'>"+esc(a.kcal)+"</td><td class='n'>"+esc(a.p)+"</td><td class='n'>"+esc(a.c)+"</td><td class='n'>"+esc(a.g)+"</td></tr>";});
        const mt=m.totali||{};body+="<tr class='tot'><td>Totale pasto</td><td class='n'>—</td><td class='n'>"+esc(mt.kcal)+"</td><td class='n'>"+esc(mt.proteine)+"</td><td class='n'>"+esc(mt.carboidrati)+"</td><td class='n'>"+esc(mt.grassi)+"</td></tr></table>";
        if(m.alternative&&m.alternative.length)body+="<div class='alt'>Alternative: "+esc(m.alternative.join(' · '))+"</div>";});
      if(d.integrazione&&d.integrazione.length){body+="<table class='integ'><tr><th>Integrazione</th><th>Timing</th><th style='width:48px'>kcal</th><th style='width:34px'>P</th><th style='width:34px'>C</th><th style='width:34px'>G</th></tr>";
        d.integrazione.forEach(x=>{body+="<tr><td><b>"+esc(x.nome)+"</b> "+esc(x.dose||'')+"</td><td>"+esc(x.timing||'')+"</td><td class='n'>"+esc(x.kcal)+"</td><td class='n'>"+esc(x.p)+"</td><td class='n'>"+esc(x.c)+"</td><td class='n'>"+esc(x.g)+"</td></tr>";});body+="</table>";}
      const dt=d.totali||{};body+="<table style='margin-top:6px'><tr class='tot'><td><b>TOTALE GIORNATA</b></td><td class='n'>"+esc(dt.kcal)+" kcal</td><td class='n'>P "+esc(dt.proteine)+"</td><td class='n'>C "+esc(dt.carboidrati)+"</td><td class='n'>G "+esc(dt.grassi)+"</td></tr></table>";
      body+="<div class='ftr'>JacopsPT · Piano Alimentare · "+esc(atleta)+"</div></div>";});
    if(P.listaSpesa&&P.listaSpesa.length){body+="<div class='pg'><h2>Lista della spesa</h2>";P.listaSpesa.forEach(c=>{body+="<div class='meal' style='margin-bottom:2px'>"+esc(c.categoria)+"</div><div style='font-size:9pt;color:#3a414c;margin-bottom:8px'>"+(c.voci||[]).map(esc).join(' · ')+"</div>";});if(P.note)body+="<div style='margin-top:10px;font-size:9pt;color:#3a414c'><b>Note:</b> "+esc(P.note)+"</div>";body+="</div>";}
    return "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Piano Alimentare — "+esc(atleta)+"</title><link href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap' rel='stylesheet'><style>"+css+"</style></head><body>"+body+"</body></html>";}
  onCliSearch=(e)=>this.setState({cliSearch:e.target.value});
  onSelCli=(e)=>this.setState({clienteId:e.target.value});
  onOpenCliente=(e)=>this.setState({clienteId:e.currentTarget.dataset.id,tab:'atleta'});
  onGoClienti=()=>this.setState({tab:'clienti'});
  onAddCliGo=()=>{const c=makeCliente();this.setState(st=>({clienti:st.clienti.concat([c]),clienteId:c.id,tab:'atleta'}));};
  cliBFnow(c){const formula=c.plicoFormula||'jp7';const sesso=c.anag.sesso||'';const eta=num(c.plicoEta)||ageFromDate(c.anag.dataNascita);const sites=plicoSites(formula,sesso);const set={};sites.forEach(s=>set[s]=true);const meas=(c.pliche||[]).filter(p=>!p.deriv&&set[p.nome]);const calc=(k)=>{if(!(meas.length===sites.length&&meas.every(p=>num(p[k])>0)))return null;const sum=meas.reduce((a,p)=>a+(num(p[k])||0),0);return siriBF(bodyDensity(formula,sesso,eta,sum));};const f=calc('fine');return f!=null?f:calc('inizio');}
  onAddMisura=()=>{this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);const bf=this.cliBFnow(c);c.storico=(c.storico||[]).concat([{id:uid(),data:new Date().toLocaleDateString('it-IT'),peso:c.antro.pesoAttuale||'',bf:bf!=null?String(Math.round(bf*10)/10):'',note:''}]);arr[i]=c;return {clienti:arr};});this._toast('Misurazione registrata');};
  onMisura=(e)=>{const d=e.currentTarget.dataset;this.mutCli('storico.'+d.i+'.'+d.f,e.target.value);};
  onDelMisura=(e)=>{const idx=+e.currentTarget.dataset.i;this.setState(st=>{const i=st.clienti.findIndex(c=>c.id===st.clienteId);if(i<0)return{};const arr=st.clienti.slice();const c=clone(arr[i]);c.storico=(c.storico||[]).filter((_,k)=>k!==idx);arr[i]=c;return {clienti:arr};});};

  buildClientePrint(){const c=this.activeCli();
    const esc=(s)=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const v=(x)=>{const s=esc(x);return s?s:'<span style="color:#cfd3da">—</span>';};
    const page=(inner)=>`<div class="page"><div class="brandtop"><span>JACOPSPT &middot; OVER 40 FITNESS</span><span>DIARIO DI ALLENAMENTO</span></div><div class="body">${inner}</div><div class="foot"><span>JACOPSPT &middot; OVER 40 FITNESS</span><span>DIARIO DI ALLENAMENTO</span></div></div>`;
    const sechead=(n,t)=>`<div class="sechead"><div class="secnum">${n}</div><div class="sectitle">${t}</div><div class="secline"></div></div>`;
    const blk=(t,inner)=>`<div class="blk"><div class="blktitle">${t}</div>${inner}</div>`;
    const fld=(lab,val)=>`<div class="fld"><div class="lab">${esc(lab)}</div><div class="val">${v(val)}</div></div>`;
    const gridN=(n,fields)=>`<div class="grid" style="grid-template-columns:repeat(${n},1fr)">${fields.join('')}</div>`;
    const A=c.anag,AN=c.antro,S=c.stile,P=c.pasti,F=c.fase,D=c.divisione;
    // cover
    const cover=`<div class="page cover"><div class="brandtop"><span>JACOPSPT &middot; OVER 40 FITNESS</span><span>DIARIO DI ALLENAMENTO</span></div>
      <div class="coverbody">
        <div style="font-family:'Barlow Condensed';letter-spacing:.34em;font-size:11px;font-weight:700;color:#3fae8e;margin-bottom:20px">PROGRAMMAZIONE &middot; MONITORAGGIO &middot; PROGRESSI</div>
        <div style="font-family:'Barlow Condensed';font-weight:800;font-size:62px;line-height:.9;color:#1e3a5f;letter-spacing:.01em">DIARIO DI<br>ALLENAMENTO</div>
        <div style="width:74px;height:4px;background:#d4a017;margin:26px auto 34px"></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px 46px;width:80%;margin:0 auto;text-align:left">
          ${fld('Atleta',c.cover.atleta||cliLabel(c))}${fld('Data inizio',c.cover.dataInizio)}${fld('Programma / Obiettivo',c.cover.programma)}${fld('Coach',c.cover.coach)}
        </div>
      </div>
      <div style="text-align:center;font-size:9px;color:#9aa6b2;font-family:'Barlow Condensed';letter-spacing:.04em;padding-bottom:4px">A cura di JacopsPT — Over 40 Fitness &middot; Allenamento sostenibile e consapevole</div></div>`;
    // somato + freq boxes
    const somatoBoxes=`<div style="display:flex;gap:9px">${SOMATO.map(s=>{const sel=c.somato===s.k;return `<div style="flex:1;border:1.5px solid ${sel?'#1e3a5f':'#e2e5ea'};background:${sel?'#1e3a5f':'#fbfbfc'};border-radius:9px;padding:10px 11px"><div style="font-family:'Barlow Condensed';font-weight:800;font-size:14px;color:${sel?'#d4a017':'#1e3a5f'}">${s.nome}</div><div style="font-size:8.5px;margin-top:2px;color:${sel?'#cdd8e6':'#9aa0a8'}">${s.desc}</div></div>`;}).join('')}</div>`;
    const freqBoxes=`<div style="display:flex;gap:9px;flex-wrap:wrap">${FREQ.map(f=>{const sel=c.frequenza===f.k;return `<div style="flex:1;min-width:110px;border:1.5px solid ${sel?'#1e3a5f':'#e2e5ea'};background:${sel?'#1e3a5f':'#fbfbfc'};border-radius:9px;padding:9px 11px"><div style="font-family:'Barlow Condensed';font-weight:800;font-size:13px;color:${sel?'#fff':'#1e3a5f'}">${f.t}</div><div style="font-size:8.5px;margin-top:2px;color:${sel?'#9fb3c9':'#9aa0a8'}">${f.d}</div></div>`;}).join('')}</div>`;
    const sCols=[1,2,3,4,5,6,7,8];
    const pulsTable=`<table><thead><tr><th>Battiti / min</th>${sCols.map(i=>`<th class="ctr">S${i}</th>`).join('')}</tr></thead><tbody>${[['A riposo',c.puls.riposo],["15'' dopo alzati",c.puls.d15],["120'' dopo alzati",c.puls.d120]].map(r=>`<tr class="zebra"><td style="font-weight:700">${r[0]}</td>${r[1].map(x=>`<td class="ctr">${v(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    const pesoTable=`<table><thead><tr><th>Peso (kg)</th>${sCols.map(i=>`<th class="ctr">S${i}</th>`).join('')}</tr></thead><tbody><tr class="zebra"><td style="font-weight:700">Mattino a digiuno</td>${c.pesoMattino.map(x=>`<td class="ctr">${v(x)}</td>`).join('')}</tr></tbody></table>`;
    const meas=c.pliche.filter(p=>!p.deriv);const sommaI=meas.reduce((a,p)=>a+(num(p.inizio)||0),0)||'';const sommaF=meas.reduce((a,p)=>a+(num(p.fine)||0),0)||'';
    // %MG per la stampa
    const Pformula=c.plicoFormula||'jp7';const Psesso=c.anag.sesso||'';const Peta=num(c.plicoEta)||ageFromDate(c.anag.dataNascita);
    const Psites=plicoSites(Pformula,Psesso);const PsiteSet={};Psites.forEach(s=>PsiteSet[s]=true);
    const PreqMeas=meas.filter(p=>PsiteSet[p.nome]);
    const PhaveI=PreqMeas.length===Psites.length&&PreqMeas.every(p=>num(p.inizio)>0);
    const PhaveF=PreqMeas.length===Psites.length&&PreqMeas.every(p=>num(p.fine)>0);
    const PsumI=PreqMeas.reduce((a,p)=>a+(num(p.inizio)||0),0),PsumF=PreqMeas.reduce((a,p)=>a+(num(p.fine)||0),0);
    const Pbf=(sum,have)=>have?siriBF(bodyDensity(Pformula,Psesso,Peta,sum)):null;
    const PbfI=Pbf(PsumI,PhaveI),PbfF=Pbf(PsumF,PhaveF);const Pf1=x=>x==null?'—':(Math.round(x*10)/10)+' %';
    const PformulaLabel=(PLICO_FORMULAS.find(f=>f.k===Pformula)||{}).label||'';
    const dCell=(a,b)=>{const x=num(a),y=num(b);if(isNaN(x)||isNaN(y))return '<span style="color:#cfd3da">—</span>';const dd=Math.round((y-x)*10)/10;if(dd===0)return '<span style="color:#9aa0a8">0</span>';const col=dd<0?'#1e8e5a':'#c0392b';return `<span style="color:${col};font-weight:800">${dd<0?'▼':'▲'} ${dd>0?'+':''}${dd}</span>`;};
    const plicheTable=`<table><thead><tr><th>Plica</th><th class="ctr">Inizio</th><th class="ctr">Fine</th><th class="ctr">Δ</th></tr></thead><tbody>${c.pliche.map(p=>{const isS=p.nome==='Somma Pliche';const req=!p.deriv&&PsiteSet[p.nome];return `<tr class="zebra"><td style="${p.deriv?'font-style:italic;color:#5a6470':(req?'font-weight:800;color:#c0392b':'font-weight:600')}">${req?'● ':''}${p.nome}</td><td class="ctr">${v(isS?sommaI:p.inizio)}</td><td class="ctr">${v(isS?sommaF:p.fine)}</td><td class="ctr">${p.deriv?'':dCell(p.inizio,p.fine)}</td></tr>`;}).join('')}</tbody></table>`;
    const circTable=`<table><thead><tr><th>Circonferenza</th><th class="ctr">Inizio</th><th class="ctr">Fine</th><th class="ctr">Δ</th></tr></thead><tbody>${c.circonf.map(p=>`<tr class="zebra"><td style="font-weight:600">${p.nome}</td><td class="ctr">${v(p.inizio)}</td><td class="ctr">${v(p.fine)}</td><td class="ctr">${dCell(p.inizio,p.fine)}</td></tr>`).join('')}</tbody></table>`;
    const bfBlock=`<div style="display:flex;gap:9px;margin-bottom:11px">
      <div style="flex:1;border:1px solid #e6e9ee;border-radius:8px;padding:9px 12px"><div style="font-size:7.5px;font-weight:800;letter-spacing:.07em;color:#9aa0a8;text-transform:uppercase">% Massa Grassa — Inizio</div><div style="font-family:'Barlow Condensed';font-weight:800;font-size:24px;color:#1e3a5f;line-height:1.1">${Pf1(PbfI)}</div></div>
      <div style="flex:1;border:1px solid #e6e9ee;border-radius:8px;padding:9px 12px"><div style="font-size:7.5px;font-weight:800;letter-spacing:.07em;color:#9aa0a8;text-transform:uppercase">% Massa Grassa — Fine</div><div style="font-family:'Barlow Condensed';font-weight:800;font-size:24px;color:#1e3a5f;line-height:1.1">${Pf1(PbfF)}</div></div>
      <div style="flex:1;border:1px solid #e6e9ee;border-radius:8px;padding:9px 12px;background:#fbfbfc"><div style="font-size:7.5px;font-weight:800;letter-spacing:.07em;color:#9aa0a8;text-transform:uppercase">Δ % Massa Grassa</div><div style="font-family:'Barlow Condensed';font-weight:800;font-size:24px;line-height:1.1">${(PbfI!=null&&PbfF!=null)?dCell(PbfI,PbfF):'<span style=\"color:#cfd3da\">—</span>'}</div></div>
    </div><div style="font-size:8.5px;color:#6a7280;margin-bottom:11px"><b>${esc(PformulaLabel)}</b> · Pliche: ${esc(Psites.join(' · '))} · Siri (495/D−450)${Psesso?' · '+(Psesso==='F'?'Donna':'Uomo'):''}${Peta?' · '+Peta+' anni':''}</div>`;
    const testTable=(b)=>`<table><thead><tr><th>Parte del corpo</th><th>Esercizio consigliato</th><th class="ctr">Carico kg</th><th class="ctr">Rip.</th><th class="ctr">1RM stimato</th></tr></thead><tbody>${b.righe.map(r=>{const rm=brzycki(r.carico,r.rip);return `<tr class="zebra"><td style="font-weight:700">${r.parte}</td><td>${v(r.es)}</td><td class="ctr">${v(r.carico)}</td><td class="ctr">${v(r.rip)}</td><td class="ctr" style="font-weight:800;color:#1e3a5f">${rm?Math.round(rm)+' kg':'—'}</td></tr>`;}).join('')}</tbody></table>`;
    const hatTable=`<table><thead><tr><th>Parte del corpo</th><th>Esercizio consigliato</th><th class="ctr">80% 1RM</th><th class="ctr">Rip. eseguite</th><th class="ctr">Tipo fibra</th></tr></thead><tbody>${c.hatfield.map(r=>{const fib=r.fibra||fibraFromRip(r.rip);return `<tr class="zebra"><td style="font-weight:700">${r.parte}</td><td>${v(r.es)}</td><td class="ctr">${v(r.carico)}</td><td class="ctr">${v(r.rip)}</td><td class="ctr">${fib?esc(fib):'<span style=\"color:#cfd3da\">—</span>'}</td></tr>`;}).join('')}</tbody></table>`;
    // pages
    const p2=page(sechead('01','QUADRO CLINICO ATLETA')+
      blk('Dati anagrafici',gridN(3,[fld('Cognome',A.cognome),fld('Nome',A.nome),fld('Data di nascita',A.dataNascita),fld('Professione',A.professione),fld('Attività sportiva',A.attivitaSportiva),fld('Anzianità allenamento',A.anzianita)]))+
      blk('Misure antropometriche',gridN(3,[fld('Altezza (cm)',AN.altezza),fld('Peso attuale (kg)',AN.pesoAttuale),fld('Peso massimo (kg)',AN.pesoMax),fld('Peso minimo (kg)',AN.pesoMin),fld('Peso a 20 anni (kg)',AN.peso20),fld('Peso inizio sport (kg)',AN.pesoInizioSport)]))+
      blk('Somatotipo',somatoBoxes)+
      blk('Problemi articolari / malattie',`<div class="note">${v(c.problemi)}</div>`));
    const p3=page(sechead('01','QUADRO CLINICO ATLETA')+
      blk('Stile di vita',gridN(3,[fld('Fumo',S.fumo),fld('Alcol',S.alcol),fld('Caffè',S.caffe),fld('Qualità del sonno',S.qualitaSonno),fld('Ore di sonno (media)',S.oreSonno),fld('Regolarità pasti',S.regolaritaPasti)]))+
      blk('Orari pasti',gridN(3,[fld('Colazione',P.colazione),fld('Spuntino mattina',P.spuntinoMattina),fld('Pranzo',P.pranzo),fld('Spuntino pomeriggio',P.spuntinoPomeriggio),fld('Cena',P.cena),fld('Prima di coricarsi',P.primaCoricarsi)]))+
      blk('Farmaci / integratori',`<div class="note">${v(c.farmaci)}</div>`)+
      blk('Obiettivi',gridN(2,[`<div class="fld"><div class="lab">A breve termine</div><div class="note" style="margin-top:2px">${v(c.obiettivi.breve)}</div></div>`,`<div class="fld"><div class="lab">A lungo termine</div><div class="note" style="margin-top:2px">${v(c.obiettivi.lungo)}</div></div>`])));
    const p4=page(sechead('02','FASE DEL MACROCICLO & MONITORAGGIO')+
      blk('Fase attuale',gridN(3,[fld('Microciclo',F.micro),fld('Mesociclo',F.meso),fld('Macrociclo',F.macro)]))+
      blk('Frequenza di allenamento',freqBoxes)+
      blk('Divisione gruppi muscolari',gridN(1,[fld('Allenamento A',D.a),fld('Allenamento B',D.b),fld('Allenamento C',D.c),fld('Allenamento D',D.d),fld('Full Body',D.full)]))+
      blk('Pulsazioni a riposo',pulsTable)+
      blk('Peso al mattino a digiuno',pesoTable));
    const p5=page(sechead('','PLICOMETRIA & MISURAZIONI CORPOREE')+bfBlock+`<div class="grid" style="grid-template-columns:1fr 1fr;gap:14px;align-items:start">${plicheTable}${circTable}</div>`);
    const p6=page(sechead('03','TEST MASSIMALI')+
      `<div class="formula">FORMULA DI BRZYCKI &nbsp;·&nbsp; 1RM = Peso / [1.0278 − (0.0278 × Ripetizioni)]</div>`+
      blk('Test inizio allenamento'+(c.testInizio.data?' — '+esc(c.testInizio.data):''),testTable(c.testInizio))+
      blk('Test fine allenamento'+(c.testFine.data?' — '+esc(c.testFine.data):''),testTable(c.testFine))+
      blk('Test di Hatfield — 80% 1RM / tipo fibra',hatTable+`<div class="guida">Guida: &lt; 7 rip. → Fibre bianche (veloci) &middot; 8–12 rip. → Miste &middot; ≥ 13 rip. → Fibre rosse (lente)</div>`));
    const css=`@page{size:A4;margin:0}*{box-sizing:border-box;margin:0;padding:0}html,body{background:#fff}body{font-family:'Inter',Arial,sans-serif;color:#1c2127;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;min-height:297mm;padding:14mm 14mm 16mm;page-break-after:always;position:relative;display:flex;flex-direction:column}.page:last-child{page-break-after:auto}
.body{flex:1}
.brandtop{display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #e6e9ee;padding-bottom:7px;margin-bottom:14px;font-family:'Barlow Condensed';letter-spacing:.16em;font-size:8.5px;font-weight:700;color:#6a8a7a}
.foot{position:absolute;left:14mm;right:14mm;bottom:8mm;display:flex;justify-content:space-between;border-top:1px solid #eceef2;padding-top:6px;font-family:'Barlow Condensed';letter-spacing:.15em;font-size:7.5px;font-weight:700;color:#aab2bd}
.cover{justify-content:space-between}.coverbody{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.sechead{display:flex;align-items:center;gap:11px;margin:2px 0 15px}.secnum{width:36px;height:36px;border-radius:9px;background:#1e3a5f;color:#d4a017;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed';font-weight:800;font-size:18px}.secnum:empty{display:none}
.sectitle{font-family:'Barlow Condensed';font-weight:800;font-size:20px;letter-spacing:.02em;color:#1e3a5f}.secline{flex:1;height:2px;background:linear-gradient(90deg,#d4a017,#fff)}
.blk{margin-bottom:13px}.blktitle{font-size:8.5px;font-weight:800;letter-spacing:.13em;color:#6a7280;text-transform:uppercase;margin-bottom:7px}
.grid{display:grid;gap:9px 16px}
.fld .lab{font-size:7.5px;font-weight:800;letter-spacing:.07em;color:#9aa0a8;text-transform:uppercase;margin-bottom:2px}.fld .val{font-size:11.5px;font-weight:600;border-bottom:1px solid #e6e9ee;padding-bottom:3px;min-height:17px}
.note{font-size:11px;line-height:1.55;border:1px solid #e6e9ee;border-radius:7px;padding:9px 11px;min-height:46px;background:#fbfbfc}
table{width:100%;border-collapse:collapse;font-size:9px}th{background:#1e3a5f;color:#fff;font-weight:700;padding:5px 7px;text-align:left;font-size:8px;letter-spacing:.02em}td{border:.5px solid #dde1e7;padding:5px 7px;font-size:9.5px}.ctr{text-align:center}tbody tr:nth-child(even){background:#f6f8fa}
.formula{background:#f4f6f9;border-left:3px solid #d4a017;font-size:9px;font-weight:700;color:#1e3a5f;padding:7px 11px;margin-bottom:13px;font-family:'Barlow Condensed';letter-spacing:.02em}
.guida{font-size:8px;color:#6a7280;margin-top:6px;font-style:italic}`;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Scheda Cliente — JacopsPT</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><style>${css}</style></head><body>${cover}${p2}${p3}${p4}${p5}${p6}</body></html>`;
  }
  onPrintCliente=()=>{let html=this.buildClientePrint();
    if(this.state.schede.some(s=>s.esercizi.some(x=>x.nome))){const d=this.buildDiarioParts();html=html.replace('</body>','<style>'+d.css.replace(/@page\{[^}]*\}/,'')+'.dw .page{width:210mm;min-height:297mm;padding:12mm 12mm 14mm}</style>'+d.pages+'</body>');}const w=window.open('','_blank');if(!w){this._toast('Abilita i popup per stampare');return;}w.document.open();w.document.write(html);w.document.close();setTimeout(()=>{try{w.focus();w.print();}catch(e){}},500);};

  // ---- chart builder ----
  topRoundRect(x,y,w,h,r){r=Math.min(r,w/2,h);return 'M'+x+' '+(y+h)+' L'+x+' '+(y+r)+' Q'+x+' '+y+' '+(x+r)+' '+y+' L'+(x+w-r)+' '+y+' Q'+(x+w)+' '+y+' '+(x+w)+' '+(y+r)+' L'+(x+w)+' '+(y+h)+' Z';}
  smoothPath(pts){if(pts.length<2)return pts.length?('M'+pts[0][0]+' '+pts[0][1]):'';let d='M'+pts[0][0]+' '+pts[0][1];for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;const c1x=p1[0]+(p2[0]-p0[0])/6,c1y=p1[1]+(p2[1]-p0[1])/6;const c2x=p2[0]-(p3[0]-p1[0])/6,c2y=p2[1]-(p3[1]-p1[1])/6;d+=' C'+c1x+' '+c1y+' '+c2x+' '+c2y+' '+p2[0]+' '+p2[1];}return d;}
  chart(data,opts){const R=React.createElement;opts=opts||{};const W=640,H=opts.h||200,padL=18,padB=28,padT=opts.line?30:18,padR=opts.line?20:18;const n=data.length||1;const iw=(W-padL-padR);const bw=iw/n;const maxV=Math.max.apply(null,data.map(d=>d.val).concat([1]));const plotH=H-padT-padB;const baseY=padT+plotH;const uid=(this._cn=(this._cn||0)+1);const sheenId='jpSheen'+uid,shId='jpSh'+uid,arId='jpAr'+uid;
    const els=[];
    els.push(R('defs',{key:'defs'},[
      R('linearGradient',{key:'sh',id:sheenId,x1:'0',y1:'0',x2:'0',y2:'1'},[R('stop',{key:0,offset:'0%',stopColor:'#fff',stopOpacity:0.34}),R('stop',{key:1,offset:'55%',stopColor:'#fff',stopOpacity:0.06}),R('stop',{key:2,offset:'100%',stopColor:'#fff',stopOpacity:0})]),
      R('linearGradient',{key:'ar',id:arId,x1:'0',y1:'0',x2:'0',y2:'1'},[R('stop',{key:0,offset:'0%',stopColor:'#e8b53a',stopOpacity:0.32}),R('stop',{key:1,offset:'100%',stopColor:'#e8b53a',stopOpacity:0})]),
      R('filter',{key:'f',id:shId,x:'-30%',y:'-30%',width:'160%',height:'160%'},[R('feDropShadow',{dx:0,dy:2,stdDeviation:2.5,floodColor:'#1e3a5f',floodOpacity:0.16})])
    ]));
    // soft gridlines + value axis ticks
    for(let g=0;g<=3;g++){const y=padT+plotH*(g/3);els.push(R('line',{key:'gl'+g,x1:padL,x2:W-padR,y1:y,y2:y,stroke:'#edeff3',strokeWidth:1,strokeDasharray:g===3?'0':'2 5'}));}
    els.push(R('line',{key:'base',x1:padL,x2:W-padR,y1:baseY,y2:baseY,stroke:'#dfe3e9',strokeWidth:1.5}));
    const bgap=Math.min(bw*0.34,16);const w=bw-bgap;
    data.forEach((d,i)=>{const bh=Math.max(3,plotH*(d.val/maxV));const x=padL+bw*i+bgap/2;const y=baseY-bh;const cx=padL+bw*i+bw/2;const rad=Math.min(7,w/2.4);
      els.push(R('path',{key:'b'+i,d:this.topRoundRect(x,y,w,bh,rad),fill:d.color||'#1e3a5f',filter:'url(#'+shId+')'}));
      els.push(R('path',{key:'s'+i,d:this.topRoundRect(x,y,w,bh,rad),fill:'url(#'+sheenId+')'}));
      if(d.val>0){els.push(R('text',{key:'v'+i,x:cx,y:y-7,textAnchor:'middle',fontSize:12,fontWeight:800,fill:'#2b3340',style:{fontFamily:'Barlow Condensed,sans-serif'}},opts.valFmt?opts.valFmt(d.val):String(d.val)));}
      els.push(R('text',{key:'x'+i,x:cx,y:H-padB+17,textAnchor:'middle',fontSize:11,fontWeight:700,fill:'#8a909a'},d.label));
      if(d.pct!=null){els.push(R('text',{key:'p'+i,x:cx,y:y-21,textAnchor:'middle',fontSize:9.5,fontWeight:800,fill:d.pct>=0?'#23a85a':'#d0453f'},(d.pct>=0?'▲':'▼')+Math.abs(d.pct)+'%'));}
    });
    if(opts.line){const lvMax=Math.max.apply(null,opts.line.concat([1]));const pts=opts.line.map((v,i)=>[padL+bw*i+bw/2,padT+plotH-plotH*(v/lvMax)*0.82]);
      const line=this.smoothPath(pts);
      const area=line+' L'+pts[pts.length-1][0]+' '+baseY+' L'+pts[0][0]+' '+baseY+' Z';
      els.push(R('path',{key:'area',d:area,fill:'url(#'+arId+')'}));
      els.push(R('path',{key:'ln',d:line,fill:'none',stroke:'#d99a16',strokeWidth:2.6,strokeLinecap:'round',strokeLinejoin:'round'}));
      pts.forEach((p,i)=>{if(opts.line[i]>0){els.push(R('circle',{key:'dh'+i,cx:p[0],cy:p[1],r:5,fill:'#fff'}));els.push(R('circle',{key:'d'+i,cx:p[0],cy:p[1],r:3,fill:'#d99a16'}));}});
    }
    return R('svg',{viewBox:'0 0 '+W+' '+H,style:{width:'100%',height:'auto',display:'block',overflow:'visible'}},els);
  }

  // grouped bars: weekLabels=['W1'..], series=[{name,color,vals:[..perWeek]}]
  groupedChart(weekLabels,series,opts){const R=React.createElement;opts=opts||{};const W=720,H=opts.h||220,padL=24,padB=30,padT=16,padR=14;
    const n=weekLabels.length||1;const G=series.length||1;const iw=W-padL-padR;const gw=iw/n;const plotH=H-padT-padB;const baseY=padT+plotH;
    let maxV=1;series.forEach(s=>s.vals.forEach(v=>{if(v>maxV)maxV=v;}));
    const fmt=opts.valFmt||(v=>v?String(v):'');
    const uid=(this._cn=(this._cn||0)+1);const els=[];
    for(let g=0;g<=3;g++){const y=padT+plotH*(g/3);els.push(R('line',{key:'gl'+g,x1:padL,x2:W-padR,y1:y,y2:y,stroke:'#edeff3',strokeWidth:1,strokeDasharray:g===3?'0':'2 5'}));}
    els.push(R('line',{key:'base',x1:padL,x2:W-padR,y1:baseY,y2:baseY,stroke:'#dfe3e9',strokeWidth:1.5}));
    const innerPad=gw*0.16;const cluster=gw-innerPad*2;const bw=Math.min(cluster/G,30);const clusterW=bw*G;const offset=(gw-clusterW)/2;
    weekLabels.forEach((wl,wi)=>{const gx=padL+gw*wi;
      series.forEach((s,si)=>{const val=s.vals[wi]||0;const bh=Math.max(val>0?3:0,plotH*(val/maxV));const x=gx+offset+bw*si;const y=baseY-bh;const r=Math.min(5,bw/2.6);
        if(bh>0){els.push(R('path',{key:'b'+wi+'_'+si,d:this.topRoundRect(x,y,bw-2,bh,r),fill:s.color}));
          if(G<=4&&val>0){els.push(R('text',{key:'v'+wi+'_'+si,x:x+(bw-2)/2,y:y-4,textAnchor:'middle',fontSize:9,fontWeight:800,fill:'#5a6470'},fmt(val)));}}
      });
      els.push(R('text',{key:'x'+wi,x:gx+gw/2,y:H-padB+18,textAnchor:'middle',fontSize:11,fontWeight:700,fill:'#8a909a'},wl));
    });
    return R('svg',{viewBox:'0 0 '+W+' '+H,style:{width:'100%',height:'auto',display:'block',overflow:'visible'}},els);
  }
  progMetrics(prog,group){const schede=prog.schede||[];let nW=1;schede.forEach(s=>{const w=s.nW||(s.esercizi&&s.esercizi[0]&&s.esercizi[0].settimane.length)||0;if(w>nW)nW=w;});
    const vol=Array(nW).fill(0),iS=Array(nW).fill(0),iC=Array(nW).fill(0),rS=Array(nW).fill(0),rC=Array(nW).fill(0);
    schede.forEach(s=>(s.esercizi||[]).forEach(e=>{if(group!=='all'&&e.gruppo!==group)return;const rm=num(e.oneRM)||null;
      (e.settimane||[]).forEach((stt,w)=>{if(w>=nW)return;(stt.serie||[]).forEach(sr=>{vol[w]++;let kg=serieKg(sr,rm);if(kg&&!isNaN(kg)){iS[w]+=kg;iC[w]++;}const rs=RECSEC[sr.rec||'90s'];if(rs){rS[w]+=rs;rC[w]++;}});});}));
    return {nW,volume:vol,intensita:iS.map((s,i)=>iC[i]?Math.round(s/iC[i]):0),densita:rS.map((s,i)=>rC[i]?Math.round(s/rC[i]):0)};
  }

  renderVals(){
    this._cn=0;
    const st=this.state;const sc=this.active();const nW=sc.nW;const tab=st.tab;
    const get1RM=(e)=>e.oneRMauto?get1RMfromLogs(st.logs,e.id):(num(e.oneRM)||null);
    const mkTab=(k)=>k===tab?TABBASE+'background:#1e3a5f;color:#fff':TABBASE+'background:#fff;color:#6a7280;border:1px solid #d9dde3';
    const mkPanel=(k)=>st.panel===k?PANELBASE+'background:#1e3a5f;color:#fff;border:1px solid #1e3a5f':PANELBASE+'background:#fff;color:#6a7280;border:1px solid #d9dde3';
    const out={
      tabStyle:{costruttore:mkTab('costruttore'),schede:mkTab('schede'),diario:mkTab('diario'),volume:mkTab('volume'),alimentazione:mkTab('alimentazione'),clienti:mkTab('clienti'),atleta:mkTab('atleta')},
      panelStyle:{salvate:mkPanel('salvate'),prog:mkPanel('prog'),db:mkPanel('db')},
      onTab:this.onTab,onPanel:this.onPanel,onClosePanel:this.onClosePanel,onInstall:this.onInstall,onExport:this.onExport,onImport:this.onImport,storageWarn:st.storageOK===false,
      isSchede:tab==='schede',isDiario:tab==='diario',isVolume:tab==='volume',isAlimentazione:tab==='alimentazione',isCostruttore:tab==='costruttore',isAtleta:tab==='atleta',isClienti:tab==='clienti',
      showSalvate:st.panel==='salvate',showProg:st.panel==='prog',showDB:st.panel==='db',
      salvateBadge:st.schedeSalvate.length?'('+st.schedeSalvate.length+')':'',progBadge:st.cartella.length?'('+st.cartella.length+')':'',
      onStop:this.onStop
    };

    // superset labels map
    const ssIndex={};
    const ssLabelOf=(ex,list)=>{if(!ex.superset||ex.superset==='—')return {has:false,label:''};const grp=list.filter(x=>x.superset===ex.superset);const i=grp.findIndex(x=>x.id===ex.id);return {has:true,label:ex.superset+(i+1)};};

    // ---- SCHEDE ----
    out.schedeTabs=st.schede.map(s=>({id:s.id,nome:s.nome||'Scheda',style:'border-radius:8px;padding:8px 14px;font-weight:700;font-size:12.5px;cursor:pointer;font-family:Barlow Condensed,sans-serif;'+(s.id===st.activeId?'background:#1e3a5f;color:#fff;border:1px solid #1e3a5f':'background:#fff;color:#6a7280;border:1px solid #d9dde3')}));
    out.onPickScheda=this.onPickScheda;out.onAddScheda=this.onAddScheda;out.onDelScheda=this.onDelScheda;
    out.schedaNome=sc.nome;out.onSchedaName=this.onSchedaName;out.onPrintScheda=this.onPrintScheda;
    out.weekOptions=Array.from({length:9},(_,i)=>i+4).map(n=>({n,style:'min-width:26px;padding:5px 7px;font-size:11px;border-radius:6px;cursor:pointer;font-weight:700;'+(nW===n?'background:#1e3a5f;color:#fff;border:1px solid #1e3a5f':'background:#fff;color:#6a7280;border:1px solid #d9dde3')}));
    out.onSetWeeks=this.onSetWeeks;
    const swv=(typeof st.schedaWeek==='number'&&st.schedaWeek>=0&&st.schedaWeek<nW)?st.schedaWeek:-1;
    out.onSchedaWeek=this.onSchedaWeek;
    out.schedaWeekChips=[{w:-1,label:'Tutte'}].concat(Array.from({length:nW},(_,i)=>({w:i,label:'W'+(i+1)}))).map(o=>({w:o.w,label:o.label,style:'min-width:26px;padding:5px 8px;font-size:11px;border-radius:6px;cursor:pointer;font-weight:700;'+(swv===o.w?'background:#d4a017;color:#16293f;border:1px solid #d4a017':'background:#fff;color:#6a7280;border:1px solid #d9dde3')}));
    out.onDupScheda=this.onDupScheda;out.onBulkSerieText=this.onBulkSerieText;out.onBulkApply=this.onBulkApply;out.onAutoProg=this.onAutoProg;out.onDupSalvata=this.onDupSalvata;out.onDupCli=this.onDupCli;
    out.onExportCliente=this.onExportCliente;out.onMailCliente=this.onMailCliente;out.onImportRisposta=this.onImportRisposta;
    out.allDbNames=GRUPPI.reduce((a,g)=>a.concat((st.esDB[g]||[]).map(n=>({v:n}))),[]);

    out.exVM=(sc.esercizi||[]).map((ex)=>{
      const col=GCOL[ex.gruppo]||'#1e3a5f';const ss=ssLabelOf(ex,sc.esercizi);const rm=get1RM(ex);
      const nopts=(st.esDB[ex.gruppo]||[]).slice();if(ex.nome&&!nopts.includes(ex.nome))nopts.unshift(ex.nome);
      const vid=ex.video||(st.videoDB||{})[ex.nome]||'';
      return {id:ex.id,nome:ex.nome,nomeOr:ex.nome||'—',gruppo:ex.gruppo,nameOptions:nopts.map(v=>({v})),note:ex.note||'',commento:ex.commento||'',video:ex.video||'',vid,hasVideo:!!vid,bulkText:(st.bulkSerie||{})[ex.id]||'',superset:ex.superset||'—',oneRM:ex.oneRM||'',oneRMauto:!!ex.oneRMauto,showManualRM:!ex.oneRMauto,
        col,colHead:col+'14',colBar:col+'66',colBorder:col+'40',caret:ex.collapsed?'▶':'▼',collapsed:!!ex.collapsed,open:!ex.collapsed,
        hasSS:ss.has,ssLabel:ss.label,rmLabel:rm?Math.round(rm)+'kg':'—',serieCount:ex.settimane.reduce((a,s)=>a+s.serie.length,0),
        weeks:ex.settimane.map((stt,wi)=>({stt,wi})).filter(o=>swv<0||o.wi===swv).map(({stt,wi})=>({w:wi,label:'W'+(wi+1),scount:'('+stt.serie.length+'s)',bg:col+'08',
          series:stt.serie.map((s,si)=>{const cvm=caricoVM(s);const m=serieMode(s);const eqv=(m==='pct'&&s.pct&&rm)?Math.round(rm*num(s.pct)/100):(m==='rm'&&s.rm&&rm)?Math.round(rmToKg(rm,s.rm)):null;
            return {id:s.id,e:ex.id,w:wi,label:'S'+(si+1),tipo:s.tipo,isFisso:s.tipo==='fisso',isRange:s.tipo==='range',isMaxrep:s.tipo==='maxrep',isEmom:s.tipo==='emom',isTempo:s.tipo==='tempo',isTest:s.tipo==='test',
              carico:cvm.v,caricoF:cvm.f,caricoPh:cvm.ph,pctLabel:cvm.lab,pctBg:cvm.bg,pctColor:cvm.col,
              showEq:!!eqv,eq:eqv?'≈'+eqv+'kg':'',rip:s.rip,ripMin:s.ripMin,ripMax:s.ripMax,minuti:s.minuti,secondi:s.secondi,rec:s.rec,rpe:s.rpe,tut:s.tut||'',rpeColor:rpeCol(s.rpe),cellBorder:col+'33'};
          })}))};
    });
    out.onMoveEx=this.onMoveEx;out.onCollapseEx=this.onCollapseEx;out.onExField=this.onExField;out.onExNote=this.onExNote;out.onExAuto=this.onExAuto;out.onDupEx=this.onDupEx;out.onDelEx=this.onDelEx;out.onAddEx=this.onAddEx;
    out.onSerie=this.onSerie;out.onSerieKey=this.onSerieKey;out.onTogPct=this.onTogPct;out.onAddSerie=this.onAddSerie;out.onDelSerie=this.onDelSerie;out.onCopyWeekAll=this.onCopyWeekAll;

    out.hasCardio=(sc.cardio||[]).length>0;
    out.cardioVM=(sc.cardio||[]).map(c=>({id:c.id,nome:c.nome||'',posizione:c.posizione||'separata',caret:c.collapsed?'▶':'▼',open:!c.collapsed,
      weeks:c.settimane.map((stt,wi)=>({stt,wi})).filter(o=>swv<0||o.wi===swv).map(({stt,wi})=>({w:wi,label:'W'+(wi+1),attivita:(stt.attivita||[]).map((a,ai)=>({id:a.id,c:c.id,w:wi,label:'Att.'+(ai+1),tipoAtt:a.tipoAtt,tempo:a.tempo,intervalliStruttura:a.intervalliStruttura,fcMin:a.fcMin,fcMax:a.fcMax,rpe:a.rpe,rpeColor:rpeCol(a.rpe)}))}))}));
    out.onAddCardio=this.onAddCardio;out.onDelCardio=this.onDelCardio;out.onDupCardio=this.onDupCardio;out.onCollapseCardio=this.onCollapseCardio;out.onCardioField=this.onCardioField;out.onAtt=this.onAtt;out.onAddAtt=this.onAddAtt;out.onDelAtt=this.onDelAtt;out.onCopyCardioWeekAll=this.onCopyCardioWeekAll;

    // ---- DIARIO ----
    const wi=Math.min(st.settimana,nW-1);
    const completion=(s,w)=>{let tot=0,comp=0;s.esercizi.forEach(e=>{const stt=e.settimane[w];if(!stt)return;stt.serie.forEach((_,si)=>{tot++;const l=this.getLog(s.id,w,e.id,si);if(l.kg||l.rip)comp++;});});return {tot,comp,pct:tot>0?Math.round(comp/tot*100):0};};
    out.weekSel=Array.from({length:nW},(_,i)=>{const agg=st.schede.reduce((a,s)=>{const c=completion(s,i);return {tot:a.tot+c.tot,comp:a.comp+c.comp};},{tot:0,comp:0});const pct=agg.tot>0?Math.round(agg.comp/agg.tot*100):0;return {i,label:'W'+(i+1),pct:pct>0?pct+'%':'',pctStyle:'font-size:9px;font-weight:800;margin-left:3px;color:'+(pct===100?'#27ae60':'#e0900a'),style:'padding:6px 9px;font-size:11.5px;border-radius:7px;cursor:pointer;font-weight:700;'+(i===wi?'background:#1e3a5f;color:#fff;border:1px solid #1e3a5f':'background:#fff;color:#6a7280;border:1px solid #d9dde3')};});
    out.onCheckMedia=this.onCheckMedia;out.onDelCheckMedia=this.onDelCheckMedia;out.onAddCheck=this.onAddCheck;out.onDelCheck=this.onDelCheck;out.onCheckDate=this.onCheckDate;
    out.checkAtleta=cliLabel(this.activeCli());
    const cliChecks=this.checksOf(st.clienteId);
    out.checksEmpty=cliChecks.length===0;
    out.checksVM=cliChecks.map(c=>({n:c.n,title:'CHECK '+(c.n+1),data:c.data||'',
      slots:CHECK_SLOTS.map(sd=>{const key=st.clienteId+'|'+c.n+'|'+sd.slot;const meta=(st.checkMedia||{})[key];if(meta&&tab==='atleta')this._ensureMedia(key);
        const url=(this._mURL||{})[key]||'';const loading=!!((this._mLoading||{})[key])||(!!meta&&!url);
        return{slot:sd.slot,ck:String(c.n),label:sd.label,icon:sd.icon,accept:sd.video?'video/*':'image/*',cta:sd.video?'Carica video':'Carica foto',
          has:!!meta&&!!url,imgs:(meta&&meta.t==='img'&&url)?[{url}]:[],
          vidEl:(meta&&meta.t==='vid'&&url)?React.createElement('video',{key:key+'|'+url,src:url,controls:true,playsInline:true,style:{width:'100%',height:110,borderRadius:6,background:'#000',objectFit:'cover',display:'block'}}):null,
          empty:!meta&&!loading,loading};})}));
    // confronto foto prima/dopo
    out.onCmpFotoOpen=this.onCmpFotoOpen;out.onCmpFotoClose=this.onCmpFotoClose;out.onCmpFotoPose=this.onCmpFotoPose;out.onCmpFotoNav=this.onCmpFotoNav;out.onCmpFotoWeek=this.onCmpFotoWeek;
    const cf=st.cf;out.cfOpen=!!cf;
    if(cf){const poses=CHECK_SLOTS.slice(0,4);const pose=poses[cf.pose]||poses[0];
      const kA=st.clienteId+'|'+cf.a+'|'+pose.slot,kB=st.clienteId+'|'+cf.b+'|'+pose.slot;
      if((st.checkMedia||{})[kA])this._ensureMedia(kA);if((st.checkMedia||{})[kB])this._ensureMedia(kB);
      const uA=(this._mURL||{})[kA]||'',uB=(this._mURL||{})[kB]||'';
      out.cfPoses=poses.map((p,i)=>({i,label:p.label,style:'border-radius:8px;padding:8px 14px;font-weight:800;font-size:12px;cursor:pointer;letter-spacing:.04em;'+(i===cf.pose?'background:#d4a017;color:#16293f;border:none':'background:rgba(255,255,255,.08);color:#8ea2b8;border:1px solid rgba(255,255,255,.12)')}));
      const ckLab=(c)=>'Check '+(c.n+1)+(c.data?' · '+c.data:'');
      const cfChecks=this._cfChecks();
      out.cfWeekOpts=cfChecks.map(c=>({v:String(c.n),label:ckLab(c)}));
      const cA=cfChecks.find(c=>c.n===cf.a),cB=cfChecks.find(c=>c.n===cf.b);
      out.cfA=String(cf.a);out.cfB=String(cf.b);out.cfALabel=cA?ckLab(cA):'Check '+(cf.a+1);out.cfBLabel=cB?ckLab(cB):'Check '+(cf.b+1);
      out.cfPoseName=pose.label;
      out.cfImgsA=uA?[{url:uA}]:[];out.cfNoA=!uA;out.cfImgsB=uB?[{url:uB}]:[];out.cfNoB=!uB;
    }
    out.onPickWeek=this.onPickWeek;out.weekLabel='W'+(wi+1);out.weekNote=st.noteSessione[wi]||'';out.onWeekNote=this.onWeekNote;out.onPrintDiario=this.onPrintDiario;out.onLog=this.onLog;
    out.diarioSchede=st.schede.map(s=>{const c=completion(s,wi);const pcol=c.pct===100?'#27ae60':c.pct>50?'#e0900a':'#2980b9';
      return {title:s.nome+' — W'+(wi+1),fraction:c.comp+'/'+c.tot,pct:c.pct,pctLabel:c.pct+'%',pctColor:pcol,
        esercizi:s.esercizi.map(e=>{const col=GCOL[e.gruppo]||'#1e3a5f';const rm=get1RM(e);const stt=e.settimane[wi];const ss=ssLabelOf(e,s.esercizi);const vid=e.video||(st.videoDB||{})[e.nome]||'';
          return {col,colHead:col+'14',colBar:col+'55',colBorder:col+'40',hasSS:ss.has,ssLabel:ss.label,gruppo:e.gruppo,nome:e.nome||'—',vid,hasVideo:!!vid,noteTxt:e.note?'— '+e.note:'',rmLabel:rm?'1RM '+Math.round(rm)+'kg':'',
            rows:(stt?stt.serie:[]).map((s2,si)=>{const cTxt=planLoadTxt(s2,rm);const log=this.getLog(s.id,wi,e.id,si);const dlt=(log.kg&&eq)?Math.round((num(log.kg)-eq)*10)/10:null;
              return {sc:s.id,w:wi,e:e.id,i:si,label:'S'+(si+1),tipo:TIPI_L[s2.tipo]||'—',rec:s2.rec,planRpe:s2.rpe||'—',planRpeColor:rpeCol(s2.rpe),planned:cTxt+(ripStr(s2)?' '+ripStr(s2):'')+(s2.tut?' · TUT '+s2.tut:''),
                kg:log.kg||'',rip:log.rip||'',rpe:log.rpe||'',effRpeColor:rpeCol(log.rpe),zebra:si%2?'#fafbfc':'#fff',delta:dlt==null?'—':(dlt>=0?'+'+dlt:''+dlt),deltaColor:dlt==null?'#9aa0a8':dlt>=0?'#27ae60':'#c0392b'};
            })};
        })};
    });

    // ---- VOLUME ----
    out.onVolMode=this.onVolMode;out.onSelGroup=this.onSelGroup;
    out.volModeStyle={forza:st.volMode==='forza'?TABBASE+'background:#1e3a5f;color:#fff':TABBASE+'background:#fff;color:#6a7280;border:1px solid #d9dde3',cardio:st.volMode==='cardio'?TABBASE+'background:#e67e22;color:#fff':TABBASE+'background:#fff;color:#6a7280;border:1px solid #d9dde3'};
    out.isVolForza=st.volMode==='forza';out.isVolCardio=st.volMode==='cardio';
    // aggregate
    const perW=Array.from({length:nW},()=>({vol:0,iS:0,iC:0,rc:{}}));
    const groupW={};GRUPPI.forEach(g=>groupW[g]=Array.from({length:nW},()=>({vol:0,iS:0,iC:0,rc:{}})));
    st.schede.forEach(s=>{s.esercizi.forEach(e=>{const rm=get1RM(e);const g=e.gruppo;e.settimane.forEach((stt,w)=>{if(w>=nW)return;stt.serie.forEach(sr=>{perW[w].vol++;groupW[g][w].vol++;let kg=serieKg(sr,rm);if(kg&&!isNaN(kg)){perW[w].iS+=kg;perW[w].iC++;groupW[g][w].iS+=kg;groupW[g][w].iC++;}const rec=sr.rec||'90s';perW[w].rc[rec]=(perW[w].rc[rec]||0)+1;groupW[g][w].rc[rec]=(groupW[g][w].rc[rec]||0)+1;});});});});
    const domRec=(rc)=>{const ks=Object.keys(rc);return ks.length?ks.sort((a,b)=>rc[b]-rc[a])[0]:'90s';};
    const globalData=perW.map((d,i)=>({label:'W'+(i+1),val:d.vol,color:densCol(domRec(d.rc)),pct:i>0?pctChg(d.vol,perW[i-1].vol):null}));
    const intensity=perW.map(d=>d.iC>0?d.iS/d.iC:0);
    out.hasForza=perW.some(d=>d.vol>0);out.noForza=!out.hasForza;
    out.forzaChart=out.hasForza?this.chart(globalData,{line:intensity,h:200}):null;
    const activeGroups=GRUPPI.filter(g=>groupW[g].some(d=>d.vol>0));
    const grpTot=activeGroups.map(g=>{let v=0,iS=0,iC=0,wk=0;groupW[g].forEach(d=>{if(d.vol>0)wk++;v+=d.vol;iS+=d.iS;iC+=d.iC;});return {g,vol:wk?Math.round(v/wk):0,int:iC?Math.round(iS/iC):0};});
    const byVol=grpTot.slice().sort((a,b)=>b.vol-a.vol);
    out.grpVolChart=byVol.length?this.chart(byVol.map(o=>({label:o.g,val:o.vol,color:GCOL[o.g]})),{h:210}):null;
    const byInt=grpTot.filter(o=>o.int>0).sort((a,b)=>b.int-a.int);
    out.grpIntChart=byInt.length?this.chart(byInt.map(o=>({label:o.g,val:o.int,color:GCOL[o.g]})),{h:190,valFmt:v=>v+'kg'}):null;
    out.groupBtns=activeGroups.map(g=>({name:g,style:'padding:5px 11px;font-size:11.5px;font-weight:700;border-radius:7px;cursor:pointer;border:1px solid '+GCOL[g]+';'+(st.selGroup===g?'background:'+GCOL[g]+';color:#fff':'background:#fff;color:'+GCOL[g])}));
    out.hasSelGroup=!!(st.selGroup&&activeGroups.includes(st.selGroup));
    if(out.hasSelGroup){const g=st.selGroup;const gd=groupW[g].map((d,i)=>({label:'W'+(i+1),val:d.vol,color:densCol(domRec(d.rc)),pct:i>0?pctChg(d.vol,groupW[g][i-1].vol):null}));const gi=groupW[g].map(d=>d.iC>0?d.iS/d.iC:0);out.gruppoChart=this.chart(gd,{line:gi,h:180});out.selGroupName=g;out.selGroupColor=GCOL[g];out.selGroupBorder=GCOL[g]+'44';out.selGroupBg=GCOL[g]+'08';}
    else{out.gruppoChart=null;out.selGroupName='';out.selGroupColor='#1e3a5f';out.selGroupBorder='#e0e3e8';out.selGroupBg='#fff';}
    // cardio volume
    const cardW=Array.from({length:nW},()=>0);
    st.schede.forEach(s=>(s.cardio||[]).forEach(c=>c.settimane.forEach((stt,w)=>{if(w>=nW)return;(stt.attivita||[]).forEach(a=>{cardW[w]+=num(a.tempo)||0;});})));
    out.hasCardioData=cardW.some(v=>v>0);out.noCardio=!out.hasCardioData;
    out.cardioChart=out.hasCardioData?this.chart(cardW.map((v,i)=>({label:'W'+(i+1),val:Math.round(v),color:'#e67e22'})),{h:200}):null;

    // ---- VOLUME: confronto programmi (storico per atleta) ----
    out.onVolView=this.onVolView;out.onCmpToggle=this.onCmpToggle;out.onCmpGroup=this.onCmpGroup;
    const segB='border:none;border-radius:9px;padding:8px 16px;font-weight:800;font-size:13px;cursor:pointer;font-family:Barlow Condensed,sans-serif;';
    const segOn=segB+'background:#1e3a5f;color:#fff';const segOff=segB+'background:#fff;color:#6a7280;border:1px solid #d9dde3';
    out.isVolConfronto=st.volView==='confronto';out.isVolAttuale=st.volView!=='confronto';
    out.volViewStyle={confronto:out.isVolConfronto?segOn:segOff,attuale:out.isVolAttuale?segOn:segOff};
    const cliCur=this.activeCli();out.cmpAtleta=cliCur?cliLabel(cliCur):'';
    const cliProgs=st.schedeSalvate.filter(sv=>sv.clienteId===st.clienteId);
    out.cmpNoPrograms=cliProgs.length===0;out.cmpHasPrograms=cliProgs.length>0;
    const chipB='border-radius:8px;padding:7px 12px;font-weight:700;font-size:12px;cursor:pointer;';
    out.cmpProgChips=cliProgs.map((p,i)=>{const color=CMPPAL[i%CMPPAL.length];const sel=st.cmpSel[p.id]!==false;return {id:p.id,nome:p.nome,date:p.data,dot:color,style:chipB+(sel?'background:#eef2f7;color:#1e3a5f;border:1px solid #1e3a5f':'background:#fff;color:#9aa0a8;border:1px solid #d9dde3')};});
    const presentGroups=GRUPPI.filter(g=>cliProgs.some(p=>(p.schede||[]).some(s=>(s.esercizi||[]).some(e=>e.gruppo===g))));
    const gChipB='border-radius:7px;padding:5px 11px;font-weight:700;font-size:11.5px;cursor:pointer;';
    out.cmpGroupChips=[{g:'all',name:'Tutti'}].concat(presentGroups.map(g=>({g,name:g}))).map(o=>({g:o.g,name:o.name,style:gChipB+(st.cmpGroup===o.g?'background:#1e3a5f;color:#fff;border:1px solid #1e3a5f':'background:#fff;color:#6a7280;border:1px solid #d9dde3')}));
    out.cmpGroupLabel=st.cmpGroup==='all'?'Tutti i gruppi':st.cmpGroup;
    const selProgs=cliProgs.filter(p=>st.cmpSel[p.id]!==false);
    if(selProgs.length){let maxW=1;const mets=selProgs.map(p=>{const m=this.progMetrics(p,st.cmpGroup);if(m.nW>maxW)maxW=m.nW;return {p,color:CMPPAL[cliProgs.indexOf(p)%CMPPAL.length],m};});
      const weekLabels=Array.from({length:maxW},(_,i)=>'W'+(i+1));const pad=(a)=>Array.from({length:maxW},(_,i)=>a[i]||0);
      out.cmpVolChart=this.groupedChart(weekLabels,mets.map(o=>({name:o.p.nome,color:o.color,vals:pad(o.m.volume)})),{h:220});
      out.cmpIntChart=this.groupedChart(weekLabels,mets.map(o=>({name:o.p.nome,color:o.color,vals:pad(o.m.intensita)})),{h:200,valFmt:v=>v?v+'kg':''});
      out.cmpDenChart=this.groupedChart(weekLabels,mets.map(o=>({name:o.p.nome,color:o.color,vals:pad(o.m.densita)})),{h:200,valFmt:v=>v?v+'s':''});
      out.cmpLegend=mets.map(o=>({name:o.p.nome,color:o.color,date:o.p.data}));
      out.cmpReady=true;out.cmpNoSel=false;
    }else{out.cmpVolChart=null;out.cmpIntChart=null;out.cmpDenChart=null;out.cmpLegend=[];out.cmpReady=false;out.cmpNoSel=cliProgs.length>0;}

    // ---- panels ----
    out.salvateVM=st.schedeSalvate.map(sv=>({id:sv.id,nome:sv.nome,meta:sv.data+' · '+sv.schede.map(s=>s.nome).join(', '),atleta:sv.atleta||'',hasAtleta:!!sv.atleta,assignId:sv.clienteId||'',assignOpts:[{k:'',label:'— Non assegnata —',sel:!sv.clienteId}].concat(st.clienti.map(c=>({k:c.id,label:cliLabel(c),sel:c.id===sv.clienteId})))}));
    out.salvateEmpty=st.schedeSalvate.length===0;out.onLoadSalvata=this.onLoadSalvata;out.onDelSalvata=this.onDelSalvata;out.onOpenSaveModal=this.onOpenSaveModal;out.onAssignSalvata=this.onAssignSalvata;
    const pgF=st.progFilter||'';
    out.progFilters=['volume','densita','intensita','mista'].map(k=>{const on=pgF===k;const c=PROG_TIPI[k].col;const n=st.cartella.filter(p=>(p.tipo||'mista')===k).length;
      return{v:k,label:PROG_TIPI[k].label+(n?' '+n:''),style:'border-radius:7px;padding:5px 10px;font-size:11px;font-weight:800;cursor:pointer;'+(on?'background:'+c+';color:#fff;border:1px solid '+c:'background:#fff;color:'+c+';border:1px solid '+c+'66')};});
    out.onProgFilter=this.onProgFilter;
    out.progVM=st.cartella.filter(p=>!pgF||(p.tipo||'mista')===pgF).map(p=>({id:p.id,nome:p.nome,applyTarget:(st._pt||{})[p.id]||'',tipoLabel:(PROG_TIPI[p.tipo]||PROG_TIPI.mista).label,tipoCol:(PROG_TIPI[p.tipo]||PROG_TIPI.mista).col,meta:(p.desc?p.desc+' · ':'')+p.nW+' sett.',applyTarget:(st._pt||{})[p.id]||'',
      dragStyle:'background:#fff;border:1px solid '+(st._overProgId===p.id&&st._dragProgId!==p.id?'#1f6aa0':'#e0e3e8')+';border-radius:10px;padding:12px;transition:border-color .1s,opacity .1s;'+(st._dragProgId===p.id?'opacity:.45;':'')+(st._overProgId===p.id&&st._dragProgId!==p.id?'box-shadow:0 0 0 2px rgba(31,106,160,.18);':''),
      weeks:p.settimane.map((stt,i)=>{const s0=stt.serie[0]||{};return {label:'W'+(i+1),summary:(caricoStr(s0)||'—')+(ripStr(s0)?' x'+ripStr(s0):''),rpe:s0.rpe?'@'+s0.rpe:''};})}));
    out.progEmpty=st.cartella.length===0||(pgF&&!st.cartella.some(p=>(p.tipo||'mista')===pgF));
    out.progEmptyMsg=pgF&&st.cartella.length?'Nessuna progressione di tipo "'+(PROG_TIPI[pgF]||{}).label+'". Le altre '+st.cartella.length+' sono nascoste dal filtro: riclicca il pulsante per vederle tutte.':'Nessuna progressione salvata. Crea un template riutilizzabile da applicare agli esercizi.';out.onNewProg=this.onNewProg;out.onDelProg=this.onDelProg;out.onProgPickTarget=this.onProgPickTarget;out.onApplyProg=this.onApplyProg;
    out.applyOptions=st.schede.reduce((a,s)=>a.concat(s.esercizi.map(e=>({id:e.id,nome:(s.nome+' · '+(e.nome||'(senza nome)'))+(e.progNome?' ⚠ ha già: '+e.progNome:''),optStyle:e.progNome?{color:'#c0392b',fontWeight:700}:undefined}))),[]);
    out.dbVM=GRUPPI.map(g=>({name:g,color:GCOL[g],bg:GCOL[g]+'22',border:GCOL[g]+'55',draft:st.dbDraft[g]||'',items:(st.esDB[g]||[]).map(n=>({nome:n,g,vidCol:(st.videoDB||{})[n]?'#c0392b':'#c9ced6'}))}));
    out.onDbVideo=this.onDbVideo;out.onExVideo=this.onExVideo;
    out.onDbDraft=this.onDbDraft;out.onAddDbEx=this.onAddDbEx;out.onDelDbEx=this.onDelDbEx;
    out.bulkGroup=st.bulkGroup;out.bulkText=st.bulkText;out.onBulkGroup=this.onBulkGroup;out.onBulkText=this.onBulkText;out.onBulkAdd=this.onBulkAdd;

    // ---- COSTRUTTORE ----
    const b=st.builder;
    out.bSettimane=b.settimane;out.onBDef=this.onBDef;
    out.tplBtns=[{id:'vuoto',label:'Vuoto'},{id:'fullbody',label:'Full Body'},{id:'upperlower',label:'Upper / Lower'},{id:'ppl',label:'Push / Pull / Legs'}];
    out.onApplyTpl=this.onApplyTpl;out.onAddSess=this.onAddSess;out.onDelSess=this.onDelSess;out.onSessName=this.onSessName;out.onMoveSessEx=this.onMoveSessEx;out.onDelSessEx=this.onDelSessEx;out.onOpenPicker=this.onOpenPicker;out.onGenerate=this.onGenerate;
    out.bSessioni=b.sessioni.map((s,si)=>({id:s.id,nome:s.nome,letter:String.fromCharCode(65+si),empty:s.esercizi.length===0,
      esercizi:s.esercizi.map((x,i)=>({s:s.id,i,nome:x.nome,gruppo:x.gruppo,col:GCOL[x.gruppo]||'#1e3a5f',bg:(GCOL[x.gruppo]||'#1e3a5f')+'0e',border:(GCOL[x.gruppo]||'#1e3a5f')+'33'}))}));
    out.bGenCount=b.sessioni.filter(s=>s.esercizi.length>0).length;
    out.onOpenSplitSave=this.onOpenSplitSave;out.onApplyModel=this.onApplyModel;out.onDelModel=this.onDelModel;
    out.hasModels=st.splitModels.length>0;
    out.modelBtns=st.splitModels.map(m=>({id:m.id,nome:m.nome,meta:'· '+m.sessioni.length+(m.sessioni.length===1?' seduta':' sedute')}));
    out.splitModalOpen=st.splitModal;out.onCloseSplitSave=this.onCloseSplitSave;out.splitName=st.splitName;out.onSplitName=this.onSplitName;out.onConfirmSplitSave=this.onConfirmSplitSave;
    out.splitSummary=(b.sessioni.filter(s=>s.esercizi.length>0).length||0)+' sedute · '+b.sessioni.reduce((a,s)=>a+s.esercizi.length,0)+' esercizi';
    // picker
    const pk=st.picker;out.pickerOpen=!!pk;out.onClosePicker=this.onClosePicker;out.onPickerGroup=this.onPickerGroup;out.onPickerCustom=this.onPickerCustom;out.onPickEx=this.onPickEx;out.onStopDrag=this.onStopDrag;out.onCustomKey=this.onCustomKey;out.onAddCustom=this.onAddCustom;out.onPickerDrag=this.onPickerDrag;out.pickerDX=(st.pickerPos&&st.pickerPos.x)||0;out.pickerDY=(st.pickerPos&&st.pickerPos.y)||0;
    if(pk){const sess=b.sessioni.find(s=>s.id===pk.sessionId);out.pickerSessName=sess?sess.nome:'';out.pickerCustom=pk.custom||'';
      out.pickerChips=GRUPPI.map(g=>({name:g,style:'padding:5px 10px;font-size:11.5px;font-weight:700;border-radius:7px;cursor:pointer;border:1px solid '+(pk.gruppo===g?GCOL[g]:'#d9dde3')+';'+(pk.gruppo===g?'background:'+GCOL[g]+';color:#fff':'background:#fff;color:'+GCOL[g])}));
      out.pickerList=(st.esDB[pk.gruppo]||[]).map(n=>({nome:n,gruppo:pk.gruppo,col:GCOL[pk.gruppo]||'#1e3a5f'}));
    }else{out.pickerSessName='';out.pickerCustom='';out.pickerChips=[];out.pickerList=[];}

    // modals
    out.saveModalOpen=st.saveModal;out.onCloseSaveModal=this.onCloseSaveModal;out.saveName=st.saveName;out.onSaveName=this.onSaveName;out.onConfirmSave=this.onConfirmSave;out.onToggleSaveScheda=this.onToggleSaveScheda;
    out.saveSchedeList=st.schede.map(s=>({id:s.id,nome:s.nome,checked:!!st.saveSel[s.id]}));
    out.saveClienteId=st.saveClienteId||'';out.onSaveCliente=this.onSaveCliente;
    const _svCli=st.saveClienteId&&st.clienti.find(c=>c.id===st.saveClienteId);
    out.saveConfirmLabel=_svCli?'👤 Assegna a '+(_svCli.anag.nome||'atleta')+' e salva':'💾 Salva soltanto';
    out.saveConfirmStyle={flex:1,background:_svCli?'#27ae60':'#1e3a5f',color:'#fff',border:'none',borderRadius:'9px',padding:'11px',fontWeight:800,fontSize:'13.5px',cursor:'pointer'};
    out.saveClienteOpts=st.clienti.map(c=>({k:c.id,label:cliLabel(c),sel:c.id===(st.saveClienteId||st.clienteId)}));
    out.progEditorOpen=st.progEditor;out.onCloseProgEditor=this.onCloseProgEditor;out.onPdTipo=this.onPdTipo;
    out.onEditProg=this.onEditProg;out.onProgDragStart=this.onProgDragStart;out.onProgDragOver=this.onProgDragOver;out.onProgDrop=this.onProgDrop;out.onProgDragEnd=this.onProgDragEnd;
    out.pdTitle=st.pd&&st.pd.editId?'Modifica progressione':'Nuova progressione';
    out.pdSaveLabel=st.pd&&st.pd.editId?'Salva modifiche':'Salva progressione';
    out.pdTipi=st.pd?Object.keys(PROG_TIPI).map(k=>{const on=(st.pd.tipo||'mista')===k;const c=PROG_TIPI[k].col;return{v:k,label:PROG_TIPI[k].label,style:'border-radius:7px;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;'+(on?'background:'+c+';color:#fff;border:1px solid '+c:'background:#fff;color:#6a7280;border:1px solid #d9dde3')};}):[];
    const pd=st.pd;out.pdName=pd?pd.nome:'';out.pdDesc=pd?pd.desc:'';out.pdNote=pd?(pd.note||''):'';out.onPdNote=this.onPdNote;out.pdWeeks=pd?pd.weeks.length:0;
    out.pdCols=pd?pd.weeks.map((wk,wi)=>({w:wi,label:'W'+(wi+1),scount:'('+wk.serie.length+'s)',series:wk.serie.map((s,si)=>{const cvm=caricoVM(s);return {id:s.id,w:wi,label:'S'+(si+1),tipo:s.tipo,isFisso:s.tipo==='fisso',isRange:s.tipo==='range',isMaxrep:s.tipo==='maxrep',isEmom:s.tipo==='emom',isTempo:s.tipo==='tempo',isTest:s.tipo==='test',carico:cvm.v,caricoF:cvm.f,caricoPh:cvm.ph,pctLabel:cvm.lab,pctBg:cvm.bg,pctColor:cvm.col,rip:s.rip,ripMin:s.ripMin,ripMax:s.ripMax,minuti:s.minuti,secondi:s.secondi,rec:s.rec,rpe:s.rpe,tut:s.tut||'',rpeColor:rpeCol(s.rpe)};})})):[];
    out.onPdName=this.onPdName;out.onPdDesc=this.onPdDesc;out.onPdWeekMinus=this.onPdWeekMinus;out.onPdWeekPlus=this.onPdWeekPlus;out.onPdSerie=this.onPdSerie;out.onPdSerieKey=this.onPdSerieKey;out.onPdTogPct=this.onPdTogPct;out.onPdAddSerie=this.onPdAddSerie;out.onPdCopyWeekAll=this.onPdCopyWeekAll;out.onPdDelSerie=this.onPdDelSerie;out.onSavePd=this.onSavePd;

    // ---- CLIENTE ----
    const cli=this.activeCli();
    out.onCli=this.onCli;out.onCliSet=this.onCliSet;out.onPickCli=this.onPickCli;out.onAddCli=this.onAddCli;out.onDelCli=this.onDelCli;out.onPrintCliente=this.onPrintCliente;
    out.onSelCli=this.onSelCli;out.onGoClienti=this.onGoClienti;
    out.clienteIdSel=st.clienteId;
    out.cliSelOpts=st.clienti.slice().sort((a,b)=>cliLabel(a).localeCompare(cliLabel(b))).map(c=>({k:c.id,label:cliLabel(c)}));
    const cliProgsList=st.schedeSalvate.filter(sv=>sv.clienteId===cli.id).slice().reverse();
    out.cliProgs=cliProgsList.map(sv=>({id:sv.id,nome:sv.nome,meta:(sv.data?sv.data+' · ':'')+sv.schede.map(s=>s.nome).join(', ')}));
    out.cliProgsEmpty=cliProgsList.length===0;
    out.cliProgsCount=cliProgsList.length?cliProgsList.length+(cliProgsList.length===1?' programma':' programmi'):'';
    out.onUnassignSalvata=this.onUnassignSalvata;
    const F=(lab,k,val)=>({lab,k,v:val==null?'':val});
    out.fCover=[F('Atleta','cover.atleta',cli.cover.atleta),F('Data inizio','cover.dataInizio',cli.cover.dataInizio),F('Programma / Obiettivo','cover.programma',cli.cover.programma),F('Coach','cover.coach',cli.cover.coach),F('Scadenza programma (gg/mm/aaaa)','cover.scadenza',cli.cover.scadenza)];
    out.fAnag=[F('Cognome','anag.cognome',cli.anag.cognome),F('Nome','anag.nome',cli.anag.nome),F('Data di nascita','anag.dataNascita',cli.anag.dataNascita),F('Email','anag.email',cli.anag.email),F('Professione','anag.professione',cli.anag.professione),F('Attività sportiva','anag.attivitaSportiva',cli.anag.attivitaSportiva),F('Anzianità allenamento','anag.anzianita',cli.anag.anzianita)];
    out.fAntro=[F('Altezza (cm)','antro.altezza',cli.antro.altezza),F('Peso attuale (kg)','antro.pesoAttuale',cli.antro.pesoAttuale),F('Peso massimo (kg)','antro.pesoMax',cli.antro.pesoMax),F('Peso minimo (kg)','antro.pesoMin',cli.antro.pesoMin),F('Peso a 20 anni (kg)','antro.peso20',cli.antro.peso20),F('Peso inizio sport (kg)','antro.pesoInizioSport',cli.antro.pesoInizioSport)];
    const somBase='text-align:left;border-radius:10px;padding:11px 13px;cursor:pointer;width:100%;display:block;';
    out.somatoCards=SOMATO.map(s=>{const sel=cli.somato===s.k;return {k:s.k,nome:s.nome,desc:s.desc,descColor:sel?'#cdd8e6':'#9aa0a8',nomeColor:sel?'#d4a017':'#1e3a5f',style:somBase+(sel?'background:#1e3a5f;border:1px solid #1e3a5f':'background:#f4f5f7;border:1px solid #e0e3e8')};});
    out.cliProblemi=cli.problemi||'';out.cliFarmaci=cli.farmaci||'';out.cliObBreve=cli.obiettivi.breve||'';out.cliObLungo=cli.obiettivi.lungo||'';
    out.fStile=[F('Fumo','stile.fumo',cli.stile.fumo),F('Alcol','stile.alcol',cli.stile.alcol),F('Caffè','stile.caffe',cli.stile.caffe),F('Qualità del sonno','stile.qualitaSonno',cli.stile.qualitaSonno),F('Ore di sonno (media)','stile.oreSonno',cli.stile.oreSonno),F('Regolarità pasti','stile.regolaritaPasti',cli.stile.regolaritaPasti)];
    out.fPasti=[F('Colazione','pasti.colazione',cli.pasti.colazione),F('Spuntino mattina','pasti.spuntinoMattina',cli.pasti.spuntinoMattina),F('Pranzo','pasti.pranzo',cli.pasti.pranzo),F('Spuntino pomeriggio','pasti.spuntinoPomeriggio',cli.pasti.spuntinoPomeriggio),F('Cena','pasti.cena',cli.pasti.cena),F('Prima di coricarsi','pasti.primaCoricarsi',cli.pasti.primaCoricarsi)];
    out.fFase=[F('Microciclo','fase.micro',cli.fase.micro),F('Mesociclo','fase.meso',cli.fase.meso),F('Macrociclo','fase.macro',cli.fase.macro)];
    const frBase='text-align:left;border-radius:10px;padding:10px 12px;cursor:pointer;width:100%;display:block;';
    out.freqCards=FREQ.map(f=>{const sel=cli.frequenza===f.k;return {k:f.k,t:f.t,d:f.d,tColor:sel?'#fff':'#1e3a5f',dColor:sel?'#9fb3c9':'#9aa0a8',style:frBase+(sel?'background:#1e3a5f;border:1px solid #1e3a5f':'background:#f4f5f7;border:1px solid #e0e3e8')};});
    out.fDiv=[F('Allenamento A','divisione.a',cli.divisione.a),F('Allenamento B','divisione.b',cli.divisione.b),F('Allenamento C','divisione.c',cli.divisione.c),F('Allenamento D','divisione.d',cli.divisione.d),F('Full Body','divisione.full',cli.divisione.full)];
    out.sCols=['S1','S2','S3','S4','S5','S6','S7','S8'].map(l=>({l}));
    out.pulsRows=[{label:'A riposo',cells:cli.puls.riposo.map((v,i)=>({v,k:'puls.riposo.'+i}))},{label:"15'' dopo alzati",cells:cli.puls.d15.map((v,i)=>({v,k:'puls.d15.'+i}))},{label:"120'' dopo alzati",cells:cli.puls.d120.map((v,i)=>({v,k:'puls.d120.'+i}))}];
    out.pesoMattinoCells=cli.pesoMattino.map((v,i)=>({v,k:'pesoMattino.'+i}));
    // ---- PLICOMETRIA: formula, evidenza pliche richieste, %MG live, Δ ----
    const formula=cli.plicoFormula||'jp7';const sesso=cli.anag.sesso||'';const eta=num(cli.plicoEta)||ageFromDate(cli.anag.dataNascita);
    const sites=plicoSites(formula,sesso);const siteSet={};sites.forEach(s=>siteSet[s]=true);
    out.onCliSel=this.onCliSel;
    out.plicoFormula=formula;
    out.cliSesso=sesso;
    out.plicoFormulaOpts=PLICO_FORMULAS.map(f=>({k:f.k,label:f.label,sel:f.k===formula}));
    out.sessoOpts=[{k:'',label:'—',sel:!sesso},{k:'M',label:'Uomo',sel:sesso==='M'},{k:'F',label:'Donna',sel:sesso==='F'}];
    out.plicoEta=cli.plicoEta||(eta?String(eta):'');out.plicoEtaPh=eta?String(eta)+' (da data nascita)':'es. 42';
    const formulaLabel=(PLICO_FORMULAS.find(f=>f.k===formula)||{}).label||'';
    out.plicoSitesLabel=sites.join(' · ');
    const deltaCell=(a,b,lowerBetter)=>{const x=num(a),y=num(b);if(isNaN(x)||isNaN(y))return {txt:'',color:'#c7ccd3',show:false};const d=y-x;if(Math.abs(d)<1e-9)return {txt:'0',color:'#9aa0a8',show:true};const good=lowerBetter?d<0:d>0;const sign=d>0?'+':'';return {txt:sign+(Math.round(d*10)/10),color:good?'#1e8e5a':'#c0392b',arrow:d<0?'▼':'▲',show:true};};
    const measAll=cli.pliche.filter(p=>!p.deriv);
    // somma SOLO delle pliche richieste dalla formula
    const reqMeas=measAll.filter(p=>siteSet[p.nome]);
    const haveAllI=reqMeas.length===sites.length&&reqMeas.every(p=>num(p.inizio)>0);
    const haveAllF=reqMeas.length===sites.length&&reqMeas.every(p=>num(p.fine)>0);
    const sumReqI=reqMeas.reduce((a,p)=>a+(num(p.inizio)||0),0);const sumReqF=reqMeas.reduce((a,p)=>a+(num(p.fine)||0),0);
    const sommaI=measAll.reduce((a,p)=>a+(num(p.inizio)||0),0)||'';const sommaF=measAll.reduce((a,p)=>a+(num(p.fine)||0),0)||'';
    out.plicheRows=cli.pliche.map((p,i)=>{const isS=p.nome==='Somma Pliche';const req=!p.deriv&&!!siteSet[p.nome];
      const nameStyle=p.deriv?'font-style:italic;color:#6a7280':(req?'color:#c0392b;font-weight:800':'color:#1c2127;font-weight:600');
      const inpBase='width:100%;border-radius:6px;padding:6px 2px;font-size:12px;text-align:center;';
      const inpStyle=req?inpBase+'background:#fff5f4;border:1.5px solid #e2a39d;color:#7a241d;font-weight:700':inpBase+'background:#fff;border:1px solid #d9dde3;color:#1c2127';
      const d=p.deriv?{show:false}:deltaCell(p.inizio,p.fine,true);
      return {nome:p.nome,deriv:p.deriv,req,mark:req?'●':'',nameStyle,inpStyle,ro:isS,editable:!isS,vI:isS?sommaI:p.inizio,vF:isS?sommaF:p.fine,kI:'pliche.'+i+'.inizio',kF:'pliche.'+i+'.fine',dTxt:d.txt||'',dColor:d.color||'#c7ccd3',dArrow:d.arrow||'',dShow:!!d.show};});
    out.circonfRows=cli.circonf.map((p,i)=>{const d=deltaCell(p.inizio,p.fine,true);return {nome:p.nome,vI:p.inizio,vF:p.fine,kI:'circonf.'+i+'.inizio',kF:'circonf.'+i+'.fine',dTxt:d.txt||'',dColor:d.color||'#c7ccd3',dArrow:d.arrow||'',dShow:!!d.show};});
    {const cval=(i)=>{const c=cli.circonf[i]||{};const v=(c.fine!==''&&c.fine!=null)?c.fine:c.inizio;return (v!==''&&v!=null&&!isNaN(num(v)))?(num(v)+' cm'):'—';};
     out.bodyFig={spalle:cval(8),vita:cval(0),fianchi:cval(1),braccio:cval(6),coscia:cval(3),polpaccio:cval(5)};
     out.bodyIsF=(cli.anag&&cli.anag.sesso==='F');out.bodyIsM=!out.bodyIsF;
     const pill='background:#fff;border:1px solid #e0e3e8;border-radius:20px;box-shadow:0 2px 6px rgba(20,30,45,.12);padding:4px 10px;font-size:11px;white-space:nowrap;display:flex;gap:6px;align-items:baseline';
     const wrapR=(t)=>'position:absolute;top:'+t+';left:118px;pointer-events:none';
     const wrapL=(t)=>'position:absolute;top:'+t+';right:118px;pointer-events:none';
     out.bodyCallouts=[
       {label:'Spalle',val:cval(8),wrapStyle:wrapR('98px'),pillStyle:pill},
       {label:'Braccio',val:cval(6),wrapStyle:wrapL('156px'),pillStyle:pill},
       {label:'Vita',val:cval(0),wrapStyle:wrapR('196px'),pillStyle:pill},
       {label:'Fianchi',val:cval(1),wrapStyle:wrapL('244px'),pillStyle:pill},
       {label:'Coscia',val:cval(3),wrapStyle:wrapR('322px'),pillStyle:pill},
       {label:'Polpaccio',val:cval(5),wrapStyle:wrapL('430px'),pillStyle:pill}
     ];}
    // calcolo %MG
    const peso=num(cli.antro.pesoAttuale);
    const calcBF=(sum,have)=>{if(!have)return null;const bd=bodyDensity(formula,sesso,eta,sum);return siriBF(bd);};
    const bfI=calcBF(sumReqI,haveAllI),bfF=calcBF(sumReqF,haveAllF);
    const fmt1=v=>v==null?null:(Math.round(v*10)/10);
    out.plicoNeedSesso=(sesso!=='M'&&sesso!=='F');out.plicoNeedEta=!eta;
    out.plicoFormulaName=formulaLabel;
    const bfd=(bfI!=null&&bfF!=null)?deltaCell(bfI,bfF,true):{show:false};
    out.plicoBFi=bfI!=null?fmt1(bfI)+' %':'—';out.plicoBFf=bfF!=null?fmt1(bfF)+' %':'—';
    out.plicoBFdelta=bfd.show?(bfd.arrow+' '+bfd.txt+' %'):'';out.plicoBFdeltaColor=bfd.color||'#9aa0a8';
    out.plicoSumI=sumReqI?String(Math.round(sumReqI*10)/10):'—';out.plicoSumF=sumReqF?String(Math.round(sumReqF*10)/10):'—';
    out.plicoHasResult=(bfI!=null||bfF!=null);
    const fmI=(bfI!=null&&!isNaN(peso))?fmt1(peso*bfI/100):null;const fmF=(bfF!=null&&!isNaN(peso))?fmt1(peso*bfF/100):null;
    out.plicoFatKgI=fmI!=null?fmI+' kg':'—';out.plicoFatKgF=fmF!=null?fmF+' kg':'—';
    out.plicoLeanKgI=(fmI!=null)?fmt1(peso-peso*bfI/100)+' kg':'—';out.plicoLeanKgF=(fmF!=null)?fmt1(peso-peso*bfF/100)+' kg':'—';
    out.plicoIncomplete=!haveAllI&&!haveAllF&&!out.plicoNeedSesso&&!out.plicoNeedEta;
    const mkTestRows=(b,pre)=>b.righe.map((r,i)=>{const rm=brzycki(r.carico,r.rip);return {parte:r.parte,es:r.es,carico:r.carico,rip:r.rip,rm:rm?Math.round(rm)+' kg':'—',kEs:pre+'.righe.'+i+'.es',kC:pre+'.righe.'+i+'.carico',kR:pre+'.righe.'+i+'.rip'};});
    out.testInizioRows=mkTestRows(cli.testInizio,'testInizio');out.testFineRows=mkTestRows(cli.testFine,'testFine');
    out.testInizioData=cli.testInizio.data;out.testFineData=cli.testFine.data;
    out.hatfieldRows=cli.hatfield.map((r,i)=>({parte:r.parte,es:r.es,carico:r.carico,rip:r.rip,fibra:r.fibra,fibraPh:fibraFromRip(r.rip)||'auto da rip.',kEs:'hatfield.'+i+'.es',kC:'hatfield.'+i+'.carico',kR:'hatfield.'+i+'.rip',kF:'hatfield.'+i+'.fibra'}));

    // ---- CLIENTI DASHBOARD ----
    out.onCliSearch=this.onCliSearch;out.onOpenCliente=this.onOpenCliente;out.onAddCliGo=this.onAddCliGo;
    out.cliSearch=st.cliSearch||'';
    out.clientiBadge=st.clienti.length>1?'('+st.clienti.length+')':'';
    const cliQ=(st.cliSearch||'').trim().toLowerCase();
    const cliList=st.clienti.filter(c=>!cliQ||cliLabel(c).toLowerCase().includes(cliQ)).sort((a,b)=>cliLabel(a).localeCompare(cliLabel(b)));
    out.clientiCount=cliList.length+(cliList.length===1?' atleta':' atleti');
    out.clientiNoRes=cliList.length===0;
    out.clientiVM=cliList.map(c=>{const progs=st.schedeSalvate.filter(sv=>sv.clienteId===c.id);const stoC=c.storico||[];const last=stoC[stoC.length-1];
      const etaC=num(c.plicoEta)||ageFromDate(c.anag.dataNascita);const pesoC=c.antro.pesoAttuale;
      const nomeC=cliLabel(c);const ini=nomeC.split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase()||'?';
      const scad=parseIT(c.cover&&c.cover.scadenza);let scadCol='#6a7280',scadBg='#f4f5f7',scadTxt='';
      if(scad){const days=Math.ceil((scad-new Date())/86400000);scadTxt=(days<0?'scaduto ':days<=7?'scade ':'')+(c.cover.scadenza||'');scadCol=days<0?'#fff':days<=7?'#7a4a00':'#6a7280';scadBg=days<0?'#c0392b':days<=7?'#ffe9c2':'#f4f5f7';}
      return {id:c.id,nome:nomeC,iniziali:ini,hasScad:!!scad,scadTxt,scadCol,scadBg,
        sub:[(etaC?etaC+' anni':''),(pesoC?pesoC+' kg':''),(c.frequenza?c.frequenza+'x/sett.':'')].filter(Boolean).join(' · ')||'Scheda da compilare',
        border:c.id===st.clienteId?'#1e3a5f':'#e0e3e8',
        nProg:progs.length+(progs.length===1?' programma':' programmi'),
        lastMis:last?(last.data+(last.peso?' · '+last.peso+'kg':'')+(last.bf?' · '+last.bf+'%':'')):'nessuna misura',
        hasProgs:progs.length>0,noProgs:progs.length===0,
        progs:progs.slice().reverse().slice(0,3).map(p=>({id:p.id,nome:p.nome,data:p.data}))};});
    // ---- STORICO MISURE ----
    out.onAddMisura=this.onAddMisura;out.onMisura=this.onMisura;out.onDelMisura=this.onDelMisura;
    const sto=cli.storico||[];
    out.storicoEmpty=sto.length===0;out.storicoHasRows=sto.length>0;
    out.storicoRows=sto.map((m,i)=>({i,data:m.data,peso:m.peso,bf:m.bf,note:m.note}));
    const stoP=sto.filter(m=>!isNaN(num(m.peso)));
    out.storicoHasChart=stoP.length>=2;
    out.storicoChart=out.storicoHasChart?this.chart(stoP.map(m=>({label:String(m.data||'').slice(0,5),val:num(m.peso),color:'#1e3a5f'})),{line:stoP.map(m=>num(m.bf)||0),h:190}):null;

    // ---- GENERATORE PROSSIMA SCHEDA ----
    out.onGwOpen=this.onGwOpen;out.onGwClose=this.onGwClose;out.onGwManual=this.onGwManual;out.onGwStep=this.onGwStep;out.onGwSub=this.onGwSub;out.onGwSubName=this.onGwSubName;out.onGwConfirm=this.onGwConfirm;
    out.onGwPrin=this.onGwPrin;out.onGwFreqAdd=this.onGwFreqAdd;out.onGwFreqDel=this.onGwFreqDel;out.onGwRepVal=this.onGwRepVal;out.onGwRepCopy=this.onGwRepCopy;out.onGwAccDef=this.onGwAccDef;out.onGwGrpVal=this.onGwGrpVal;
    const gw=st.gw;out.gwOpen=!!gw;
    if(gw){
      out.gwStep0=gw.step===0;out.gwStep1=gw.step===1;out.gwStep2=gw.step===2;out.gwStep4=gw.step===4;
      out.gwAtleta=cliLabel(this.activeCli());
      out.gwSteps=[{n:1,label:'Esercizi'},{n:2,label:'Gruppi'},{n:4,label:'Anteprima'}].map((o,i)=>({label:(i+1)+'. '+o.label,style:'padding:5px 11px;border-radius:7px;font-size:11px;font-weight:800;'+(gw.step===o.n?'background:#d4a017;color:#16293f':'background:#eef2f7;color:#6a7280')}));
      out.gwShowNav=gw.step>0;out.gwIsLast=gw.step===4;out.gwNotLast=gw.step>0&&gw.step<4;
      // step1
      out.gwExVM=this.gwExList().map(o=>{const e=o.es;const sub=gw.subs[e.id];const opts=(st.esDB[e.gruppo]||[]).filter(n=>n!==e.nome);
        return{id:e.id,nome:e.nome,scheda:o.scheda.nome,gruppo:e.gruppo,col:GCOL[e.gruppo]||'#1e3a5f',isSub:!!sub,
          subName:sub?sub.nuovo:'',subOpts:opts.map(n=>({v:n})),
          btnLabel:sub?'↩ Mantieni':'⇄ Sostituisci',
          btnStyle:'border-radius:7px;padding:6px 11px;font-size:11.5px;font-weight:700;cursor:pointer;'+(sub?'background:#c0392b;color:#fff;border:1px solid #c0392b':'background:#fff;color:#6a7280;border:1px solid #d9dde3')};});
      const nSub=Object.keys(gw.subs).length;out.gwSubCount=nSub?('Da sostituire: '+nSub+'.'):'';
      // step2 gruppi
      const w1cnt=(schede,g)=>schede.reduce((a,s)=>a+s.esercizi.filter(e=>e.nome&&e.gruppo===g).reduce((x,e)=>x+((e.settimane[0]||{serie:[]}).serie.length),0),0);
      out.gwAccDef=gw.accDef;
      out.gwRecOpts=[{v:'',label:'(invariato)'}].concat(['15s','30s','45s','60s','90s','2min','3min','4min','5min'].map(r=>({v:r,label:r})));
      const progOpts=[{v:'',label:'— parametri attuali —'}].concat(st.cartella.map(p=>({v:p.id,label:(PROG_TIPI[p.tipo]||PROG_TIPI.mista).label+' · '+p.nome+' ('+p.nW+'W)'}))).concat([{v:'__new',label:'＋ Crea nuova progressione…'}]);
      const schedaOpts=st.schede.map(s=>({v:s.id,label:s.nome||'Scheda'}));
      out.gwGroupVM=Object.keys(gw.groups).map(g=>{const c=gw.groups[g];
        const nAcc=st.schede.reduce((a,s)=>a+s.esercizi.filter(e=>e.nome&&e.gruppo===g&&e.nome!==c.prin).length,0);
        const freqG=st.schede.filter(s=>s.esercizi.some(e=>e.nome&&e.gruppo===g)).length;
        return{g,col:GCOL[g]||'#1e3a5f',totW1:w1cnt(st.schede,g)+' serie in W1 · gruppo in '+freqG+(freqG===1?' seduta':' sedute'),
          prin:c.prin,prinOpts:c.names.map(n=>({v:n})),freq:c.reps.length,
          accPct:c.accPct,recPrin:c.recPrin,recAcc:c.recAcc,nAcc:nAcc+(nAcc===1?' esercizio':' esercizi'),
          reps:c.reps.map((r,i)=>{const cur=st.schede.some(s=>s.id===r.schedaId&&s.esercizi.some(e=>e.gruppo===g&&e.nome===c.prin));
            return{g,i,schedaId:r.schedaId,progId:r.progId,isNew:!cur,
              copyLabel:r.copyAcc?'✓ copia accessori':'+ copia accessori',
              copyStyle:'border-radius:6px;padding:5px 9px;font-size:10.5px;font-weight:700;cursor:pointer;'+(r.copyAcc?'background:#27ae60;color:#fff;border:1px solid #27ae60':'background:#fff;color:#6a7280;border:1px dashed #c7ccd3'),
              schedaOpts,progOpts};})};});
      // step4
      if(gw.step===4){const prop=this.gwProposal();const groups=Object.keys(gw.groups);
        out.gwChart=this.groupedChart(groups,[{name:'Attuale',color:'#9aa7b8',vals:groups.map(g=>w1cnt(st.schede,g))},{name:'Proposta',color:'#d4a017',vals:groups.map(g=>w1cnt(prop,g))}],{h:200});
        out.gwLegend=[{name:'Attuale',color:'#9aa7b8'},{name:'Proposta',color:'#d4a017'}];
        out.gwBadges=groups.map(g=>{const c=gw.groups[g];const p=num(c.accPct)||0;return{g,lab:c.reps.length+'×/sett · acc '+(p>0?'+':'')+p+'%',col:GCOL[g]||'#1e3a5f'};});
        const oldMap={};st.schede.forEach(s=>s.esercizi.forEach(e=>{oldMap[e.id]=e;}));
        out.gwPreview=prop.map(s=>({nome:s.nome,esercizi:s.esercizi.map(e=>{const old=oldMap[e._oldId];
          const oldN=old?old.settimane.reduce((a,w)=>a+w.serie.length,0):0;const newN=e.settimane.reduce((a,w)=>a+w.serie.length,0);
          const s0=(e.settimane[0]&&e.settimane[0].serie[0])||{};
          return{nome:e.nome,gruppo:e.gruppo,col:GCOL[e.gruppo]||'#1e3a5f',badges:(e._badges||[]).map(b=>({b})),
            serieTxt:oldN+' → '+newN+' serie totali',
            w1:'W1: '+((e.settimane[0]||{serie:[]}).serie.length)+' serie · '+(caricoStr(s0)||'—')+(ripStr(s0)?' × '+ripStr(s0):'')+' · rec '+(s0.rec||'—')};})}));
      }else{out.gwChart=null;out.gwLegend=[];out.gwBadges=[];out.gwPreview=[];}
    }
    // ---- ALIMENTAZIONE ----
    if(cli){
      const N=cli.nutri||makeNutri();out.N=N;
      const plicoBF=this.cliBFnow(cli);
      const C=nutriCalc(cli,plicoBF);
      const nn=(v,suf)=>v==null?'—':(v+(suf||''));
      out.nu={
        peso:nn(r1(C.peso),' kg'),pesoBase:cli.antro&&cli.antro.pesoAttuale?cli.antro.pesoAttuale+' kg':'—',
        bf:nn(r1(C.bf),' %'),bfSrc:(N.bf!==''&&!isNaN(num(N.bf)))?'override':(plicoBF!=null?'da plicometria':'—'),
        lbm:nn(r1(C.lbm),' kg'),fatKg:nn(r1(C.fatKg),' kg'),
        bmr:nn(r0(C.bmr),' kcal'),bmrName:C.bmrName||'—',
        fact:isNaN(C.fact)?'—':('× '+C.fact),tdee:nn(r0(C.tdee),' kcal'),
        kcalTarget:nn(r0(C.kcalTarget),' kcal'),
        protG:nn(r0(C.protG),' g'),fatG:nn(r0(C.fatG),' g'),carbG:nn(r0(C.carbG),' g'),
        carbOff:nn(r0(C.carbOff),' g'),
        pctP:nn(r0(C.pctP),'%'),pctC:nn(r0(C.pctC),'%'),pctG:nn(r0(C.pctG),'%'),
        kcalMacros:nn(r0(C.kcalMacros),' kcal'),
        sK:r0(C.sK)||0,sP:r0(C.sP)||0,sC:r0(C.sC)||0,sG:r0(C.sG)||0,
        foodProt:nn(r0(C.foodProt),' g'),foodCarb:nn(r0(C.foodCarb),' g'),foodFat:nn(r0(C.foodFat),' g'),foodKcal:nn(r0(C.foodKcal),' kcal'),
        carbNeg:C.carbNeg,
        barP:isNaN(C.pctP)?0:Math.max(0,Math.min(100,C.pctP)),barC:isNaN(C.pctC)?0:Math.max(0,Math.min(100,C.pctC)),barG:isNaN(C.pctG)?0:Math.max(0,Math.min(100,C.pctG))
      };
      out.nAttOpts=[{k:'sedentario',label:'Sedentario (1.2)'},{k:'leggero',label:'Leggero (1.375)'},{k:'moderato',label:'Moderato (1.55)'},{k:'attivo',label:'Attivo (1.725)'},{k:'molto attivo',label:'Molto attivo (1.9)'}];
      out.nLavOpts=[{k:'sedentario',label:'Sedentario'},{k:'in piedi',label:'In piedi'},{k:'fisico',label:'Fisico'}];
      out.nRegimeOpts=[{k:'onnivoro',label:'Onnivoro'},{k:'vegetariano',label:'Vegetariano'},{k:'vegano',label:'Vegano'},{k:'altro',label:'Altro'}];
      out.nFontiProtOpts=[{k:'animali',label:'Prevalentemente animali'},{k:'miste',label:'Miste (animali + vegetali)'},{k:'vegetali',label:'Vegetali'}];
      out.nObbOpts=[{k:'ricomposizione',label:'Ricomposizione'},{k:'definizione',label:'Definizione'},{k:'massa',label:'Massa'},{k:'mantenimento',label:'Mantenimento'}];
      out.nBmrOpts=[{k:'auto',label:'Automatica (Katch se %MG, altrimenti Mifflin)'},{k:'katch',label:'Katch-McArdle (da massa magra)'},{k:'mifflin',label:'Mifflin-St Jeor'},{k:'harris',label:'Harris-Benedict (rivista)'},{k:'owen',label:'Owen'},{k:'lyle',label:'Lyle McDonald (Cunningham, da massa magra)'}];
      out.nIntollChips=INTOLL_COMUNI.map(v=>({v,on:(N.intolleranze||[]).indexOf(v)>=0,style:'padding:5px 11px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+((N.intolleranze||[]).indexOf(v)>=0?'#c0392b;background:#c0392b;color:#fff':'#d9dde3;background:#fff;color:#6a7280')}));
      out.nGiorni=GG.map(g=>{const on=!!(N.giorni&&N.giorni[g.k]);return {k:g.k,t:g.t,on,style:'flex:1;padding:9px 4px;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer;text-align:center;border:1px solid '+(on?'#27ae60;background:#27ae60;color:#fff':'#d9dde3;background:#fff;color:#9aa0a8')};});
      out.nGiorniOnLabel=GG.filter(g=>N.giorni&&N.giorni[g.k]).map(g=>g.t).join(', ')||'nessuno';
      out.nTimingOn=!!N.timingOn;out.nIntraOn=!!N.intraOn;out.nCarbCyc=!!N.carbCyc;
      out.nProtBasePeso=N.protBase!=='magra';out.nFatPerkg=N.fatMode!=='perc';out.nAdjPerc=N.adjMode!=='kcal';
      const seg=(on)=>({a:'flex:1;padding:8px;border-radius:7px;font-size:12px;font-weight:800;cursor:pointer;border:1px solid '+(on?'#1e3a5f;background:#1e3a5f;color:#fff':'#d9dde3;background:#fff;color:#6a7280'),b:'flex:1;padding:8px;border-radius:7px;font-size:12px;font-weight:800;cursor:pointer;border:1px solid '+(!on?'#1e3a5f;background:#1e3a5f;color:#fff':'#d9dde3;background:#fff;color:#6a7280')});
      out.segProtBase=seg(N.protBase!=='magra');out.segFat=seg(N.fatMode!=='perc');out.segAdj=seg(N.adjMode!=='kcal');out.segCyc=seg(N.carbCycMode!=='kcal');
      const sw=(on)=>'width:42px;height:24px;border-radius:13px;border:none;cursor:pointer;padding:0;position:relative;flex:none;background:'+(on?'#27ae60':'#c7ccd3');
      const swK=(on)=>'position:absolute;top:3px;left:'+(on?'21px':'3px')+';width:18px;height:18px;border-radius:50%;background:#fff;transition:left .15s;display:block';
      out.swCarbCyc=sw(!!N.carbCyc);out.swCarbCycKnob=swK(!!N.carbCyc);
      out.swTiming=sw(!!N.timingOn);out.swTimingKnob=swK(!!N.timingOn);
      out.swIntra=sw(!!N.intraOn);out.swIntraKnob=swK(!!N.intraOn);
      out.onNutriPick=this.onCliSet;
      out.nRegimeAltro=N.regime==='altro';
      out.nTimeUnit=(num(N.adjVal)<0?'deficit':(num(N.adjVal)>0?'surplus':'mantenimento'));
      (function(){var sug=defSug(cli,C);if(sug.show){sug.dir=sug.loss?'Deficit calorico':'Surplus calorico';sug.col=sug.loss?'#c0392b':'#27ae60';sug.kcalTxt=(sug.daily>0?'+':'−')+Math.abs(sug.daily)+' kcal';sug.rate='~'+(Math.round(Math.abs(sug.rateKg)*10)/10)+' kg/settimana';}out.nDefSug=sug;})();
      out.nRitmoOpts=[{k:'lento',label:'Lento (conservativo)'},{k:'moderato',label:'Moderato (consigliato)'},{k:'veloce',label:'Veloce (aggressivo)'}];
      const uOpts=['g','mg','mcg','ml','UI','misurini','capsule'];
      const fOpts=[{k:'ogni',label:'Ogni giorno'},{k:'on',label:'Solo giorni ON'},{k:'off',label:'Solo giorni OFF'}];
      const tOpts=[{k:'risveglio',label:'Al risveglio'},{k:'colazione',label:'Colazione'},{k:'pre',label:'Pre-workout'},{k:'intra',label:'Intra-workout'},{k:'post',label:'Post-workout'},{k:'pasto',label:'Con un pasto'},{k:'prima_dormire',label:'Prima di dormire'},{k:'vuoto',label:'A stomaco vuoto'}];
      out.nIntegr=(N.integratori||[]).map((it,i)=>({
        id:it.id,i,nome:it.nome,dose:it.dose,unita:it.unita,freq:it.freq,timing:it.timing,note:it.note,
        conteggia:!!it.conteggia,kcal:it.kcal,p:it.p,c:it.c,g:it.g,
        cntLabel:it.conteggia?'✓ Conteggiato nei macro':'Conta nei macro',
        cntStyle:'padding:7px 12px;border-radius:7px;font-size:12px;font-weight:800;cursor:pointer;border:1px solid '+(it.conteggia?'#d4a017;background:#d4a017;color:#fff':'#d9dde3;background:#fff;color:#6a7280'),
        uOpts:uOpts.map(u=>({k:u,label:u})),fOpts:fOpts.slice(),tOpts:tOpts.slice(),
        cardStyle:'border:1px solid '+(it.conteggia?'#d4a017':'#e0e3e8')+';border-radius:11px;padding:13px;background:'+(it.conteggia?'#fffdf5':'#fff')+';margin-bottom:10px'
      }));
      out.nIntegrEmpty=!(N.integratori||[]).length;
      out.nIntegrCount=(N.integratori||[]).length;
      out.integrDatalist=INTEGR_COMUNI.slice();
      out.onNutri=this.onCli;out.onNutriSel=this.onCliSel;out.onNutriToggle=this.onNutriToggle;out.onNutriIntol=this.onNutriIntol;
      out.onNutriGiorno=this.onNutriGiorno;out.onApplyDefSug=this.onApplyDefSug;out.onNutriImportFreq=this.onNutriImportFreq;
      out.onNutriAddInt=this.onNutriAddInt;out.onNutriDelInt=this.onNutriDelInt;out.onNutriMoveInt=this.onNutriMoveInt;out.onNutriIntField=this.onNutriIntField;out.onNutriIntToggle=this.onNutriIntToggle;
      // ---- PIANO / GENERAZIONE ----
      out.genLoading=!!st.genLoading;out.genErr=st.genErr||'';out.genPromptCopy=st.genPromptCopy||'';
      out.genProgressLabel=(st.genLoading&&st.genProgress)?('Generazione… '+st.genProgress.done+'/'+st.genProgress.total):'';
      out.promptOpen=!!st.promptOpen;
      out.segGen=seg(N.genMode!=='sequenziale');
      out.onGenPiano=()=>this.onGenPiano();out.onCopyPrompt=this.onCopyPrompt;out.onGenMode=this.onGenMode;out.onTogglePrompt=this.onTogglePrompt;out.onNutriTpl=this.onNutriTpl;
      out.onNutriDay=this.onNutriDay;out.onNutriView=this.onNutriView;out.onRestorePiano=this.onRestorePiano;out.onDelPiano=this.onDelPiano;out.onPrintPiano=this.onPrintPiano;
      out.onPianoFood=this.onPianoFood;out.onPianoAddFood=this.onPianoAddFood;out.onPianoDelFood=this.onPianoDelFood;
      const P=N.piano;out.hasPiano=!!(P&&Array.isArray(P.settimana)&&P.settimana.length);
      out.aiAvail=!!(typeof window!=='undefined'&&window.claude&&window.claude.complete);
      if(out.hasPiano){
        out.pianoData=P.data+(P.ora?' · '+P.ora:'')+(P.mode?' · '+(P.mode==='sequenziale'?'settimana intera':'per archetipo'):'');
        const di=Math.max(0,Math.min(st.nutriDay||0,P.settimana.length-1));
        out.nDayTabs=P.settimana.map((d,i)=>{const on=String(d.tipoGiorno).toUpperCase()==='ON';const act=i===di;return {i,label:(d.giorno||('G'+(i+1))).slice(0,3),on,style:'padding:7px 11px;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer;text-transform:capitalize;border:1px solid '+(act?'#1e3a5f;background:#1e3a5f;color:#fff':(on?'#cde9d9;background:#f2fbf6;color:#1e7a48':'#e0e3e8;background:#fff;color:#9aa0a8'))};});
        out.nView=st.nutriView||'piano';out.nIsPiano=out.nView!=='spesa';out.nIsSpesa=out.nView==='spesa';
        out.viewPianoStyle=seg(out.nView!=='spesa').a;out.viewSpesaStyle=seg(out.nView!=='spesa').b;
        const d=P.settimana[di];const on=String(d.tipoGiorno).toUpperCase()==='ON';
        let dK=0,dP=0,dC=0,dG=0;
        const pasti=(d.pasti||[]).map((m,mi)=>{let k=0,p=0,c=0,g=0;
          const al=(m.alimenti||[]).map((a,ai)=>{k+=num(a.kcal)||0;p+=num(a.p)||0;c+=num(a.c)||0;g+=num(a.g)||0;return {day:di,m:mi,a:ai,alimento:a.alimento,grammi:a.grammi,kcal:a.kcal,p:a.p,c:a.c,g:a.g};});
          dK+=k;dP+=p;dC+=c;dG+=g;
          return {mi,day:di,nome:m.nome,orario:m.orario,alimenti:al,alt:(m.alternative||[]).join(' · '),totK:r0(k),totP:r0(p),totC:r0(c),totG:r0(g)};});
        const integ=(d.integrazione||[]).map(x=>{dK+=num(x.kcal)||0;dP+=num(x.p)||0;dC+=num(x.c)||0;dG+=num(x.g)||0;return {nome:x.nome,dose:x.dose,timing:x.timing,kcal:x.kcal,p:x.p,c:x.c,g:x.g};});
        out.nDay={giorno:d.giorno,on,tag:on?'ALLENAMENTO':'RIPOSO',tagStyle:'font-size:11px;font-weight:800;padding:3px 11px;border-radius:11px;color:#fff;background:'+(on?'#27ae60':'#9aa0a8'),pasti,integ,hasInteg:integ.length>0,dK:r0(dK),dP:r0(dP),dC:r0(dC),dG:r0(dG)};
        out.nSpesa=P.listaSpesa||[];out.nPianoNote=P.note||'';
      }else{out.nDayTabs=[];out.nSpesa=[];}
      out.nVersioni=(N.pianiStorico||[]).slice().reverse().map((p,ri)=>({i:(N.pianiStorico.length-1-ri),label:(p.data||'')+(p.ora?' '+p.ora:'')}));
      out.nHasVersioni=(N.pianiStorico||[]).length>0;
      out.nCliName=cliLabel(cli);
    }
    return out;
  }
}

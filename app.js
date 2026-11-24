/* NYU Formula SAE Electronics — PCB Learning
   No framework or build step. All progress stays in the learner's browser. */
'use strict';

const videos = {
  kicad1: {
    id:'0WCi1rhueH4', title:'KiCad 9: intro and installation', by:'DigiKey · Getting Started, Part 1',
    desc:'Meet the project manager, learn the core editors, and get oriented.', tag:'START HERE'
  },
  kicad2: {
    id:'0Q6gU7-QqUg', title:'KiCad 9: schematic layout', by:'DigiKey · Getting Started, Part 2',
    desc:'Create a project, place symbols, edit values, and wire nets in the schematic editor.', tag:'SCHEMATIC'
  },
  kicad3: {
    id:'0MqHR6cU_y0', title:'KiCad 9: custom schematic symbol', by:'DigiKey · Getting Started, Part 3',
    desc:'Build a custom buzzer symbol in the Symbol Editor and organize a symbol library.', tag:'SYMBOLS'
  },
  kicad4: {
    id:'KN3fHXhNkTU', title:'KiCad 9: finishing the schematic', by:'DigiKey · Getting Started, Part 4',
    desc:'Place the custom symbol, add net labels, power flags, BOM placeholders, and run ERC.', tag:'SCHEMATIC'
  },
  kicad5: {
    id:'4YSZwcUSgJo', title:'KiCad 9: footprints', by:'DigiKey · Getting Started, Part 5',
    desc:'Assign footprints to symbols and create a custom footprint with a 3D model.', tag:'FOOTPRINTS'
  },
  kicad6: {
    id:'zdieFtrvjew', title:'KiCad 9: PCB layout', by:'DigiKey · Getting Started, Part 6',
    desc:'Design rules, placement, routing, vias, copper zones, and DRC in the PCB editor.', tag:'ROUTING'
  },
  kicad7: {
    id:'zMNGZAnHPts', title:'KiCad 9: images, Gerbers and BOM', by:'DigiKey · Getting Started, Part 7',
    desc:'Add board graphics, export Gerber and drill files, preview them, and build a BOM.', tag:'FABRICATION'
  },
  aesthetic: {
    id:'D2UaRPkRExw', title:'Aesthetic PCB design tips', by:"Phil’s Lab #84 · Altium demo, same ideas in KiCad",
    desc:'Grid, placement, routing style, silkscreen and edge details: boards that look intentional also route better.', tag:'DESIGN'
  },
  designTips: {
    id:'kkc8BxL5Eo0', title:'My top 10 PCB design tips', by:'Dustin Watts · Team-recommended',
    desc:'Practical placement and routing choices. Take notes on what applies to your board.', tag:'DESIGN'
  },
  designMistakes: {
    id:'D0X76Kbf8fQ', title:'PCB design mistakes to avoid', by:'Team Directory · Learning material',
    desc:'Common traps to look for during your schematic and placement reviews.', tag:'DESIGN'
  },
  rc: {
    id:'_2L0l-E1Wx0', title:'RC low-pass filters explained', by:'All About Electronics',
    desc:'Understand the cutoff frequency, attenuation and why filtered analog sensors matter.', tag:'ANALOG'
  },
  viaGuide: {
    id:'nPPDPVjin3M', title:'Ground planes and stitching vias in KiCad', by:'KiCad layout walkthrough · older UI',
    desc:'Pay attention to copper pours, GND return paths and stitching; UI differs from KiCad 9.', tag:'GROUND'
  },
  trace: {
    id:'xEVntmYLARw', title:'PCB traces 101', by:"Phil’s Lab #112 · Watch selected chapters",
    desc:'Trace width, current, copper thickness, routing geometry and practical guidelines.', tag:'TRACE WIDTH'
  },
  differential: {
    id:'xwrdvhm4vgw', title:'Differential pairs explained', by:"Phil’s Lab #83 · Optional deep dive",
    desc:'Why paired data traces need matching geometry and a continuous reference plane.', tag:'USB SIGNALS'
  },
  smd: {
    id:'JBeSvg4B7Us', title:"Beginner's Guide to Surface Mount Soldering!", by:'Robonyx',
    desc:'Surface-mount soldering basics. SMD parts go on first.', tag:'SMD SOLDERING'
  },
  throughHole: {
    id:'3jAw41LRBxU', title:"HOW TO SOLDER! (Beginner's Guide)", by:'HackMakeMod',
    desc:'Through-hole soldering basics. Through-hole parts go on last.', tag:'THROUGH-HOLE'
  }
};

function safeText(value){return String(value).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}
function buildVideoCard(v){
  const url = v.url || `https://www.youtube.com/watch?v=${v.id}`;
  const media = v.id
    ? `<img src="https://i.ytimg.com/vi/${encodeURIComponent(v.id)}/hqdefault.jpg" loading="lazy" alt="Video preview: ${safeText(v.title)}" referrerpolicy="no-referrer"><span class="video-play" aria-hidden="true">▶</span>`
    : `<span class="video-no-thumb"><span aria-hidden="true">▶</span><b>VIDEO LESSON</b></span>`;
  return `<a class="video-card" href="${safeText(url)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${safeText(v.title)} in a new tab">
    <div class="video-image">${media}</div>
    <div class="video-info"><h3>${safeText(v.title)}</h3></div>
  </a>`;
}
document.querySelectorAll('[data-video-ids]').forEach(el => {
  const ids = el.dataset.videoIds.split(',').map(s=>s.trim());
  el.innerHTML = ids.filter(id => videos[id]).map(id => buildVideoCard(videos[id])).join('');
});

let toastTimer;
function toast(message){
  const el=document.getElementById('toast');
  if (!el) return;
  el.textContent=message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'), 2400);
}
async function copyText(str){
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(str);
    } else {
      const temp=document.createElement('textarea');
      temp.value=str;temp.setAttribute('readonly','');
      temp.style.position='fixed';temp.style.opacity='0';
      document.body.appendChild(temp);temp.select();
      const ok=document.execCommand('copy');temp.remove();
      if (!ok) throw new Error('Clipboard unavailable');
    }
    toast('Copied to clipboard');
  } catch (_e){toast('Copy unavailable: select and copy the command manually');}
}
document.querySelectorAll('button[data-copy]').forEach(btn=>btn.addEventListener('click',()=>{
  // HTML data attributes retain literal backslash-n separators.
  copyText(btn.dataset.copy.replace(/\\n/g,'\n'));
}));
const review = document.getElementById('copyReview');
if(review) review.addEventListener('click',()=>copyText(`Hi! Could you review my practice PCB?\n\nRepo: https://github.com/NYU-Formula-SAE-Electronics/FirstLast-Dev-PCB\nReview gate: [01 schematic / 02 placement / 03 routing / 04 fabrication]\nCompleted: [brief summary]\nQuestions or concerns: [anything I'm unsure about]\nScreenshots: [optional schematic, layout or 3D screenshot]\n\nThanks!`));

// macOS/Windows tool setup tabs
const tabButtons = [...document.querySelectorAll('[data-tab]')];
tabButtons.forEach(btn => btn.addEventListener('click',()=>{
  const tab=btn.dataset.tab;
  tabButtons.forEach(other=>{
    const active=other.dataset.tab===tab;
    other.classList.toggle('active',active);
    other.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-panel]').forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===tab));
}));

// Task checklist state is local browser data, not a GitHub submission.
const storeKey = 'nyu-fsae-pcb-course-v1';
let progress = {};
try {progress=JSON.parse(localStorage.getItem(storeKey)||'{}') || {};} catch (_e) {progress={};}
function saveProgress(){try{localStorage.setItem(storeKey,JSON.stringify(progress));}catch(_e){/* private browsing */}}
const tasks=[...document.querySelectorAll('input[type=checkbox][data-task]')];
function updateProgress(){
  const total=tasks.length+1; // includes successful knowledge check
  const done=tasks.filter(task=>task.checked).length+(progress.quizPass?1:0);
  const fraction=Math.round(100*done/total);
  const num=document.getElementById('progressNumber');
  const bar=document.getElementById('progressBar');
  const description=document.getElementById('progressDescription');
  if (num) num.textContent=`${fraction}%`;
  if (bar) bar.style.width=`${fraction}%`;
  if (description) description.textContent=`${done} of ${total} milestones complete · saved locally`;
}
tasks.forEach(cb=>{
  cb.checked=Boolean(progress[cb.dataset.task]);
  cb.addEventListener('change',()=>{
    progress[cb.dataset.task]=cb.checked;
    saveProgress();updateProgress();
  });
});
updateProgress();

const quizQuestions = [
  {q:'What is the difference between a schematic symbol and a PCB footprint?',
   a:['The symbol is used in software; the footprint describes the physical pads and dimensions','A symbol is always smaller than its footprint','Footprints describe the electrical behavior and symbols describe the copper layers','They are interchangeable'],
   correct:0, why:'The symbol communicates circuit function and pin names; the footprint defines physical pads. Their pin mapping must agree.'},
  {q:'What does a via do on a PCB?',
   a:['Filters noise on the ground plane','Connects copper on different layers through a plated hole','Automatically increases trace current capacity','Replaces a decoupling capacitor'],
   correct:1, why:'A via is a plated conductive hole between layers. Its size, spacing and placement must meet fabrication rules.'},
  {q:'Why should decoupling capacitors be placed close to an MCU supply pin?',
   a:['They increase firmware execution speed','They stabilize USB connector mechanics','They provide local transient charge and minimize supply loop inductance','They replace the power supply'],
   correct:2, why:'Short supply-to-cap-to-ground paths help handle the MCU’s rapid current demand.'},
  {q:'Can every trace on a PCB safely use the same 0.3 mm width?',
   a:['Yes: all copper is equally conductive regardless of geometry','Yes: KiCad automatically adjusts trace temperature','No: current, copper thickness, voltage drop and impedance matter','No: every trace must be at least 2 mm'],
   correct:2, why:'Signal traces may be narrow, but higher-current or controlled-impedance traces need deliberate sizing.'},
  {q:'What is KiCad DRC primarily checking?',
   a:['That the firmware can boot over USB','Physical PCB rules such as spacing and unconnected copper','That the LDO is stable with the selected capacitor','Whether the circuit passes an EMC certification test'],
   correct:1, why:'DRC checks layout constraints and connectivity. It cannot guarantee a functional circuit or correct part values.'},
  {q:'According to the team four-layer stackup, which layer is the main ground reference?',
   a:['Top copper / F.Cu','Second copper layer / In1.Cu','Third copper layer / In2.Cu','Bottom silkscreen'],
   correct:1, why:'Our agreed stackup is signals on F.Cu, GND on In1.Cu, power on In2.Cu, and signals on B.Cu.'}
];
let quizIndex=0, chosen=null, quizScore=0;
const quizBody=document.getElementById('quizBody');
const quizNext=document.getElementById('quizNext');
const quizRestart=document.getElementById('quizRestart');
const quizCounter=document.getElementById('quizCounter');
const quizMeterFill=document.getElementById('quizMeterFill');
function renderQuiz(){
  if (!quizBody) return;
  const q=quizQuestions[quizIndex];chosen=null;
  quizCounter.textContent=`QUESTION ${quizIndex+1} / ${quizQuestions.length}`;
  quizMeterFill.style.width=`${(quizIndex+1)*100/quizQuestions.length}%`;
  quizBody.innerHTML=`<div class="quiz-question">${safeText(q.q)}</div>${q.a.map((answer,i)=>`<button type="button" class="quiz-choice" data-answer="${i}"><span class="choice-letter">${'ABCD'[i]}</span>${safeText(answer)}</button>`).join('')}<div id="quizFeedback"></div>`;
  quizNext.disabled=true;
  quizNext.textContent=quizIndex===quizQuestions.length-1?'See my results →':'Next question →';
  quizNext.hidden=false;
  quizRestart.hidden=true;
  quizBody.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
    if(chosen!==null)return;
    chosen=Number(btn.dataset.answer);
    if(chosen===q.correct)quizScore++;
    quizBody.querySelectorAll('[data-answer]').forEach(choice=>{
      const i=Number(choice.dataset.answer);
      choice.disabled=true;
      if(i===q.correct)choice.classList.add('correct');
      if(i===chosen && i!==q.correct)choice.classList.add('wrong');
    });
    document.getElementById('quizFeedback').innerHTML=`<div class="quiz-feedback"><strong>${chosen===q.correct?'Correct.':'Not quite.'}</strong> ${safeText(q.why)}</div>`;
    quizNext.disabled=false;
  }));
}
function quizResults(){
  const passed=quizScore>=5;
  if(passed){progress.quizPass=true;saveProgress();updateProgress();}
  quizCounter.textContent='ASSESSMENT COMPLETE';
  quizMeterFill.style.width='100%';
  quizBody.innerHTML=`<div class="quiz-complete"><div class="score">${quizScore}<small> / ${quizQuestions.length}</small></div><h3>${passed?'You’re ready for the real board.':'Review the concepts and try again.'}</h3><p>${passed?'Well done. Bring this understanding into your schematic review. Your quiz milestone is now checked in the sidebar.':'Aim for 5 out of 6. Revisit traces/vias, footprints, decoupling, and the team stackup before retrying.'}</p>${passed?'<span class="quiz-pass">✓ KNOWLEDGE CHECK PASSED</span>':''}</div>`;
  quizNext.hidden=true;quizRestart.hidden=false;
}
if(quizBody){
  quizNext.addEventListener('click',()=>{
    if(chosen===null)return;
    if(quizIndex===quizQuestions.length-1){quizResults();return;}
    quizIndex++;renderQuiz();
  });
  quizRestart.addEventListener('click',()=>{quizIndex=0;quizScore=0;renderQuiz();});
  renderQuiz();
}

// Sidebar navigation; also close the drawer on phones.
const toggle=document.getElementById('menuToggle');
const sidebar=document.getElementById('sidebar');
if(toggle && sidebar){
  toggle.addEventListener('click',()=>{
    const open=sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open?'Close course navigation':'Open course navigation');
    toggle.textContent=open?'✕':'☰';
  });
  document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{
    sidebar.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';
  }));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){sidebar.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}});
}
const navigation=[...document.querySelectorAll('.nav-link[href^="#"]')];
const navTargets=navigation.map(a=>({a, el:document.getElementById(a.getAttribute('href').substring(1))})).filter(x=>x.el);
let scrollTicking=false;
function updateActiveNav(syncHash){
  scrollTicking=false;
  const offset=window.scrollY+145;
  let active=navTargets[0];
  for (const candidate of navTargets){if(candidate.el.offsetTop<=offset)active=candidate;else break;}
  navigation.forEach(a=>a.classList.toggle('active',a===active?.a));
  if(syncHash&&active){
    const h=active.a.getAttribute('href');
    if(location.hash!==h){try{history.replaceState(null,'',h);}catch(e){}}
  }
}
window.addEventListener('scroll',()=>{
  if(!scrollTicking){scrollTicking=true;window.requestAnimationFrame(()=>updateActiveNav(true));}
},{passive:true});
updateActiveNav();

// Collapsible sidebar (desktop); state persists across visits.
(function(){
  const collapse=document.getElementById('sidebarCollapse'), expand=document.getElementById('sidebarExpand');
  if(!collapse||!expand)return;
  const set=c=>{
    document.body.classList.toggle('sidebar-collapsed',c);
    try{localStorage.setItem('sidebarCollapsed',c?'1':'0');}catch(e){}
  };
  try{if(localStorage.getItem('sidebarCollapsed')==='1')document.body.classList.add('sidebar-collapsed');}catch(e){}
  collapse.addEventListener('click',()=>set(true));
  expand.addEventListener('click',()=>set(false));
})();

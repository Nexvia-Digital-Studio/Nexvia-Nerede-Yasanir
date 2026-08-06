/* ============================================================
   Yaşam Haritası — frontend mantığı
   (Quiz, Beni Şaşırt, Instagram Hikaye Kartı, Karşılaştırma, Favoriler)
   Veri: api/cities.php (DB) + api/refresh.php (canlı nem/AQI)
   ============================================================ */

// SVG ikonlar
const SVG = {
  'map-pin':'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  'globe':'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10z"/>',
  'waves':'<path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  'mountain':'<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  'ruler':'<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0L2.7 16.7a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  'thermometer':'<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  'moon':'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  'droplet':'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  'cloud-rain':'<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
  'users':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'building':'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  'briefcase':'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'navigation':'<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  'shield':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  'wifi':'<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  'alert':'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  'activity':'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'compass':'<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>',
  'chevron':'<polyline points="9 18 15 12 9 6"/>',
  'rotate':'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  'check':'<polyline points="20 6 9 17 4 12"/>',
  'layers':'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  'wind':'<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  'search':'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
};

function iconSvg(name, size=16, cls='ic'){
  const p = SVG[name] || SVG['map-pin'];
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

/* ============================================================
   FİLTRE TANIMLARI
   ============================================================ */
const FILTERS = [
  {grp:'Coğrafi', icon:'globe', open:true, items:[
    {key:'deniz', label:'Deniz kenarı', ic:'waves', type:'tri', opts:['farketmez','evet','hayır']},
    {key:'rakim', label:'Rakım', ic:'mountain', type:'range', min:0, max:2000, step:50, unit:'m'},
    {key:'daglik', label:'Dağlık/arazi', ic:'mountain', type:'range', min:0, max:10, step:1, unit:'/10',
      note:'Rakım + engebe tahmini (rakımdan türetilir)'},
  ]},
  {grp:'İklim', icon:'thermometer', open:true, items:[
    {key:'yillik_sicaklik', label:'Yıllık ort. sıcaklık', ic:'thermometer', type:'range', min:4, max:22, step:0.5, unit:'°C'},
    {key:'kis_sicaklik', label:'Kış sıcaklığı (Ocak)', ic:'thermometer', type:'range', min:-10, max:14, step:0.5, unit:'°C'},
    {key:'yaz_sicaklik', label:'Yaz sıcaklığı (Temmuz)', ic:'thermometer', type:'range', min:15, max:35, step:0.5, unit:'°C'},
    {key:'yillik_yagis', label:'Yıllık yağış', ic:'cloud-rain', type:'range', min:280, max:2400, step:50, unit:'mm'},
    {key:'gunes_suresi', label:'Güneş süresi', ic:'sun', type:'range', min:1500, max:4000, step:50, unit:'sa/yıl'},
    {key:'kar_yagisi', label:'Kar yağışı', ic:'cloud-rain', type:'range', min:0, max:400, step:10, unit:'cm/yıl', lower:true},
  ]},
  {grp:'Demografi', icon:'users', open:false, items:[
    {key:'nufus', label:'Nüfus (il)', ic:'users', type:'range', min:80, max:16000, step:80, unit:'bin', log:true},
  ]},
  {grp:'Yaşam Kalitesi', icon:'building', open:false, items:[
    {key:'ulasim', label:'Ulaşım / altyapı', ic:'navigation', type:'range', min:0, max:10, step:1, unit:'/10',
      note:'Nüfus ve bölge merkezîyetinden türetilir'},
    {key:'internet', label:'İnternet hızı (tahmini)', ic:'wifi', type:'range', min:20, max:100, step:5, unit:'Mbps',
      note:'Nüfus yoğunluğundan tahmini'},
  ]},
  {grp:'Riskler (düşük iyi)', icon:'alert', open:false, items:[
    {key:'depremRiski', label:'Deprem riski', ic:'activity', type:'range', min:0, max:5, step:1, unit:'/5', lower:true,
      note:'AFAD haritasından il bazlı yaklaşıktır'},
    {key:'nem', label:'Nem oranı (canlı)', ic:'droplet', type:'range', min:40, max:90, step:1, unit:'%', lower:true,
      note:'Open-Meteo canlı veri — popup açınca güncellenir'},
    {key:'aqi', label:'Hava kirliliği (canlı AQI)', ic:'wind', type:'range', min:0, max:100, step:5, unit:'AQI', lower:true,
      note:'European AQI — popup açınca güncellenir'},
  ]},
  {grp:'Bölge', icon:'compass', open:false, items:[
    {key:'bolge', label:'Bölgeler', ic:'compass', type:'checks', opts:['Marmara','Ege','Akdeniz','İç Anadolu','Karadeniz','Doğu Anadolu','Güneydoğu']}
  ]},
];

/* ============================================================
   STATE & FAVORİLER & TEMA MANTIĞI
   ============================================================ */
let RAW = {iller:[], ilceler:[], meta:{}};
let state = {};
let strictMode = true;
let layerMode = 'auto';     // 'auto' | 'il' | 'ilce'
let labelMode = localStorage.getItem('yh_label') || 'full'; // 'full' | 'compact'
let currentTheme = localStorage.getItem('yh_theme') || 'dark';

let favorites = new Set(JSON.parse(localStorage.getItem('yh_favs') || '[]'));

function saveFavs(){
  localStorage.setItem('yh_favs', JSON.stringify([...favorites]));
  const countEl = document.getElementById('favCount');
  if(countEl) countEl.textContent = favorites.size;
}
saveFavs();

function toggleFav(id, type){
  const key = `${type}_${id}`;
  if(favorites.has(key)) favorites.delete(key);
  else favorites.add(key);
  saveFavs();
  update();
}

const markersIl = {};     // id → marker
const markersIlce = {};   // id → marker

/* ============================================================
   TEMA (AÇIK / KARANLIK MOD) & TILE LAYERS
   ============================================================ */
const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const lightTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

const map = L.map('map',{zoomControl:true, minZoom:5, maxZoom:14, worldCopyJump:false}).setView([39.0,35.5], 6);
const tileLayer = L.tileLayer(currentTheme==='light'? lightTileUrl : darkTileUrl, {
  attribution:'© OpenStreetMap © Carto', subdomains:'abcd', maxZoom:19
}).addTo(map);

function setTheme(theme){
  currentTheme = theme;
  localStorage.setItem('yh_theme', theme);
  document.body.classList.toggle('light-theme', theme==='light');
  tileLayer.setUrl(theme==='light'? lightTileUrl : darkTileUrl);
}
setTheme(currentTheme);

document.getElementById('btnThemeToggle').addEventListener('click', ()=>{
  setTheme(currentTheme==='dark'?'light':'dark');
});

/* Etiket modu toggle */
function setLabelMode(mode){
  labelMode = mode;
  localStorage.setItem('yh_label', mode);
  document.getElementById('labelModeTxt').textContent = mode==='full' ? 'Tam İsimler' : 'Kompakt';
  update();
}
document.getElementById('btnToggleNames').addEventListener('click', ()=>{
  setLabelMode(labelMode==='full' ? 'compact' : 'full');
});

/* ============================================================
   BEN KİMİM & GÖNÜLLÜ PROJE MODALI (NEXVIA DIGITAL STUDIO & BATUHAN AKCAN)
   ============================================================ */
const aboutBackdrop = document.getElementById('aboutBackdrop');
function openAboutModal(){ if(aboutBackdrop) aboutBackdrop.classList.add('show'); }
function closeAboutModal(){ if(aboutBackdrop) aboutBackdrop.classList.remove('show'); }
['btnAbout', 'triggerAbout', 'footerAbout'].forEach(id=>{
  document.getElementById(id)?.addEventListener('click', openAboutModal);
});
document.getElementById('aboutClose')?.addEventListener('click', closeAboutModal);
aboutBackdrop?.addEventListener('click', (e)=>{ if(e.target === aboutBackdrop) closeAboutModal(); });

/* ============================================================
   KAPATILABİLİR POP-UP (INTERSTITIAL) REKLAM MANTIĞI
   ============================================================ */
const adModalBackdrop = document.getElementById('adModalBackdrop');
let hasShownAd = false;

function showAdModal(){
  if(hasShownAd || sessionStorage.getItem('yh_ad_closed')) return;
  hasShownAd = true;
  if(adModalBackdrop) adModalBackdrop.classList.add('show');
}
function closeAdModal(){
  if(adModalBackdrop) adModalBackdrop.classList.remove('show');
  sessionStorage.setItem('yh_ad_closed', '1');
}
document.getElementById('adModalClose')?.addEventListener('click', closeAdModal);
document.getElementById('adSkipBtn')?.addEventListener('click', closeAdModal);
adModalBackdrop?.addEventListener('click', (e)=>{ if(e.target === adModalBackdrop) closeAdModal(); });

setTimeout(()=>{ showAdModal(); }, 25000);

/* ============================================================
   1. 🔮 "RUH ŞEHRİNİ BUL" QUIZ MODU MANTIĞI
   ============================================================ */
const quizModal = document.getElementById('quizModal');
const quizStepContainer = document.getElementById('quizStepContainer');
let quizAnswers = {};
let currentQuizStep = 0;

const QUIZ_QUESTIONS = [
  {
    title: "1. Nasıl bir doğa ve ortam hayal ediyorsun?",
    subtitle: "Sabah pencereyi açtığında gözünün önünde ne olsun?",
    options: [
      { emoji: "🌊", label: "Masmavi Deniz & İnce Kumlu Sahiller", set: { deniz: 1 } },
      { emoji: "🌲", label: "Yüksek Dağlar & Çam Kokulu Ormanlar", set: { rakim: [400, 2000] } },
      { emoji: "🏙️", label: "Büyükşehir Keşmekeşi & Gelişmiş İmkânlar", set: { nufus: [1000, 16000], ulasim: [8, 10] } },
      { emoji: "🏡", label: "Sakin, Yürüyerek Gezilen Şirin Kasaba", set: { nufus: [80, 500] } }
    ]
  },
  {
    title: "2. Sıcaklık ve hava tercihin nasıl?",
    subtitle: "Hangi iklim sana enerji veriyor?",
    options: [
      { emoji: "☀️", label: "Sıcak & Bol Güneşli (Yaz Tutkunu)", set: { yaz_sicaklik: [26, 35] } },
      { emoji: "⛅", label: "Ilıman, Serin & Dengeli Hava", set: { yillik_sicaklik: [10, 17] } },
      { emoji: "❄️", label: "Kar Yağışlı & Soğuk Kış Günleri", set: { kis_sicaklik: [-10, 2], kar_yagisi: [30, 300] } }
    ]
  },
  {
    title: "3. Güvenlik ve Risk Toleransın?",
    subtitle: "Doğal afet kaygıların senin için ne kadar belirleyici?",
    options: [
      { emoji: "🛡️", label: "Deprem Riski En Düşük Güvenli Bölgeler", set: { depremRiski: [0, 2] } },
      { emoji: "🍃", label: "Temiz Hava & Sıfır Kirlilik (Düşük AQI)", set: { aqi: [0, 40] } },
      { emoji: "🤷‍♂️", label: "Fark Etmez, Manzara ve Yaşam Kalitesi Önemli", set: {} }
    ]
  }
];

function startQuiz(){
  quizAnswers = {};
  currentQuizStep = 0;
  renderQuizStep();
  quizModal?.classList.add('show');
}

function renderQuizStep(){
  if(currentQuizStep >= QUIZ_QUESTIONS.length){
    calculateQuizResult();
    return;
  }

  const q = QUIZ_QUESTIONS[currentQuizStep];
  const pct = Math.round(((currentQuizStep + 1) / QUIZ_QUESTIONS.length) * 100);

  quizStepContainer.innerHTML = `
    <h2>🔮 Ruh Şehrini Bul (${currentQuizStep + 1}/${QUIZ_QUESTIONS.length})</h2>
    <p class="quiz-sub">${q.title}</p>
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-options-grid">
      ${q.options.map((opt, i) => `
        <button class="quiz-opt-btn" data-idx="${i}">
          <span class="emoji">${opt.emoji}</span>
          <span>${opt.label}</span>
        </button>
      `).join('')}
    </div>
  `;

  quizStepContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = +btn.dataset.idx;
      Object.assign(quizAnswers, q.options[idx].set);
      currentQuizStep++;
      renderQuizStep();
    });
  });
}

function calculateQuizResult(){
  FILTERS.forEach(g=>g.items.forEach(f=>{
    if(f.type==='range') setRangeVal(f.key, f.min, f.max);
    else if(f.type==='tri') setTriVal(f.key, 0);
  }));

  Object.entries(quizAnswers).forEach(([k, v])=>{
    if(Array.isArray(v)) setRangeVal(k, v[0], v[1]);
    else if(typeof v === 'number') setTriVal(k, v);
  });

  update();

  let bestCity = null;
  let bestScore = -1;
  
  [...RAW.iller, ...RAW.ilceler].forEach(c=>{
    const res = evalCity(c);
    if(res.score > bestScore){
      bestScore = res.score;
      bestCity = c;
    }
  });

  if(bestCity){
    const type = bestCity.il_id ? 'ilce' : 'il';
    const isIlce = type === 'ilce';
    const ilName = isIlce ? (RAW.iller.find(i=>i.id===bestCity.il_id)?.ad || '') : '';
    const fullName = isIlce ? `${bestCity.ad} (${ilName})` : bestCity.ad;

    quizStepContainer.innerHTML = `
      <div class="quiz-result-box">
        <span class="trophy">🏆✨</span>
        <div class="about-badge">Ruh Şehriniz Bulundu!</div>
        <h3>${fullName}</h3>
        <p>Senin yaşam kriterlerinle <b>%${bestScore}</b> mükemmel uyum sağlıyor!</p>
        <div style="display:flex; gap:10px; margin-top:20px;">
          <button class="btn active" id="btnQuizGoMap">🗺️ Haritada Göster</button>
          <button class="social-btn insta" id="btnQuizShare">📸 Hikayede Paylaş</button>
        </div>
      </div>
    `;

    if(typeof confetti === 'function'){
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    document.getElementById('btnQuizGoMap')?.addEventListener('click', ()=>{
      quizModal.classList.remove('show');
      if(isIlce){
        renderIlcelerLazy();
        if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
        map.flyTo([bestCity.lat, bestCity.lng], 10.5, {duration:0.8});
        setTimeout(()=> openCity(bestCity, 'ilce'), 600);
      } else {
        map.flyTo([bestCity.lat, bestCity.lng], 8, {duration:0.8});
        setTimeout(()=> openCity(bestCity, 'il'), 600);
      }
    });

    document.getElementById('btnQuizShare')?.addEventListener('click', ()=>{
      quizModal.classList.remove('show');
      openShareModal(bestCity, bestScore);
    });
  }
}

document.getElementById('btnStartQuiz')?.addEventListener('click', startQuiz);
document.getElementById('quizClose')?.addEventListener('click', ()=> quizModal?.classList.remove('show'));

/* ============================================================
   2. 🎲 "BENİ ŞAŞIRT!" (RASTGELE ŞEHİR BUTONU)
   ============================================================ */
document.getElementById('btnSurprise')?.addEventListener('click', ()=>{
  const validList = [...RAW.iller, ...RAW.ilceler].filter(c=> evalCity(c).eligible);
  if(validList.length === 0) return;

  const target = validList[Math.floor(Math.random() * validList.length)];
  const isIlce = !!target.il_id;

  if(typeof confetti === 'function'){
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
  }

  if(isIlce){
    renderIlcelerLazy();
    if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
    map.flyTo([target.lat, target.lng], 10.5, {duration: 0.8});
    setTimeout(()=> openCity(target, 'ilce'), 600);
  } else {
    map.flyTo([target.lat, target.lng], 8, {duration: 0.8});
    setTimeout(()=> openCity(target, 'il'), 600);
  }
});

/* ============================================================
   3. 📸 INSTAGRAM STORY GÖRSEL KARTI ÜRETİCİSİ (CANVAS)
   ============================================================ */
const shareModal = document.getElementById('shareModal');
const shareCanvas = document.getElementById('shareCanvas');

function openShareModal(city, score){
  if(!shareModal || !shareCanvas) return;
  shareModal.classList.add('show');

  const ctx = shareCanvas.getContext('2d');
  const w = shareCanvas.width;
  const h = shareCanvas.height;

  // Arka plan gradyanı
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Üst Başlık / Logo
  ctx.fillStyle = '#3b82f6';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🗺️ Yaşam Haritası', w/2, 70);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Benim Türkiye\'deki Ruh Şehrim', w/2, 100);

  // Rozet Çemberi
  const isIlce = !!city.il_id;
  const ilName = isIlce ? (RAW.iller.find(i=>i.id===city.il_id)?.ad || '') : '';
  const name = isIlce ? `${city.ad}` : city.ad;
  const subName = isIlce ? `${ilName} ili` : (city.bolge || 'Türkiye');

  ctx.beginPath();
  ctx.arc(w/2, 280, 110, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
  ctx.fill();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Uyum Skoru
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 54px sans-serif';
  ctx.fillText(`%${score}`, w/2, 270);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('UYUM SKORU', w/2, 310);

  // Şehir Adı
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(name, w/2, 460);

  ctx.fillStyle = '#60a5fa';
  ctx.font = '18px sans-serif';
  ctx.fillText(subName, w/2, 495);

  // Özellik Detay Kutusu
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  if (ctx.roundRect) ctx.roundRect(40, 540, w - 80, 240, 16); else ctx.fillRect(40, 540, w - 80, 240);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '15px sans-serif';
  ctx.textAlign = 'left';

  const stats = [
    `🌡️ Yıllık Sıcaklık: ${city.yillik_sicaklik || '—'} °C`,
    `🌊 Deniz Mesafesi: ${city.deniz ? 'Sahil Kıyısında' : (city.denizMesafe+' km')}`,
    `⛰️ Rakım / Yükseklik: ${city.rakim || 0} m`,
    `💨 Canlı Hava (AQI): ${city.aqi || 25} AQI`,
    `🍃 Canlı Nem Oranı: %${city.nem || 60}`
  ];

  stats.forEach((s, idx) => {
    ctx.fillText(s, 60, 580 + (idx * 40));
  });

  // Footer Alt Yazı (Nexvia Studio)
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sen de kendi ruh şehrini keşfet: nexviastudio.com', w/2, 890);
  ctx.fillStyle = '#64748b';
  ctx.font = '11px sans-serif';
  ctx.fillText('🚀 Nexvia Digital Studio · Batuhan Akcan (@batuhann_akcan)', w/2, 920);
}

document.getElementById('shareClose')?.addEventListener('click', ()=> shareModal?.classList.remove('show'));
document.getElementById('btnDownloadStory')?.addEventListener('click', ()=>{
  if(!shareCanvas) return;
  const link = document.createElement('a');
  link.download = `yasam-haritasi-ruh-sehrim.png`;
  link.href = shareCanvas.toDataURL('image/png');
  link.click();
});

/* ============================================================
   4. ⚖️ ŞEHİR KARŞILAŞTIRMA MODALI MANTIĞI
   ============================================================ */
const compareModal = document.getElementById('compareModal');
const compSelect1 = document.getElementById('compSelect1');
const compSelect2 = document.getElementById('compSelect2');

function populateCompareSelects(){
  if(!compSelect1 || !compSelect2) return;
  let html = '<option value="">Şehir veya ilçe seçin...</option>';
  RAW.iller.forEach(c => html += `<option value="il_${c.id}">🏙️ ${c.ad} (İl)</option>`);
  RAW.ilceler.forEach(d => html += `<option value="ilce_${d.id}">📍 ${d.ad} (İlçe)</option>`);
  compSelect1.innerHTML = html;
  compSelect2.innerHTML = html;
}

function renderCompareTable(){
  const val1 = compSelect1.value;
  const val2 = compSelect2.value;
  const container = document.getElementById('compareTableContainer');
  if(!val1 || !val2 || !container){
    container.innerHTML = '<div style="text-align:center; color:var(--muted); padding:30px;">Kıyaslamak için 2 şehir seçin</div>';
    return;
  }

  const getItem = (val)=>{
    const [type, id] = val.split('_');
    return type==='il' ? RAW.iller.find(i=>i.id==+id) : RAW.ilceler.find(d=>d.id==+id);
  };

  const c1 = getItem(val1);
  const c2 = getItem(val2);
  if(!c1 || !c2) return;

  const res1 = evalCity(c1);
  const res2 = evalCity(c2);

  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Özellik</th>
          <th>${c1.ad}</th>
          <th>${c2.ad}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="feature">Uyum Skoru</td>
          <td class="${res1.score>=res2.score?'winner':''}">%${res1.score}</td>
          <td class="${res2.score>=res1.score?'winner':''}">%${res2.score}</td>
        </tr>
        <tr>
          <td class="feature">Yıllık Sıcaklık</td>
          <td>${c1.yillik_sicaklik || '—'} °C</td>
          <td>${c2.yillik_sicaklik || '—'} °C</td>
        </tr>
        <tr>
          <td class="feature">Deniz Kıyısı</td>
          <td>${c1.deniz ? 'Evet' : 'Hayır'}</td>
          <td>${c2.deniz ? 'Evet' : 'Hayır'}</td>
        </tr>
        <tr>
          <td class="feature">Rakım</td>
          <td>${c1.rakim || 0} m</td>
          <td>${c2.rakim || 0} m</td>
        </tr>
        <tr>
          <td class="feature">Yıllık Yağış</td>
          <td>${c1.yillik_yagis || '—'} mm</td>
          <td>${c2.yillik_yagis || '—'} mm</td>
        </tr>
        <tr>
          <td class="feature">Deprem Riski</td>
          <td>${c1.depremRiski || 3}/5</td>
          <td>${c2.depremRiski || 3}/5</td>
        </tr>
        <tr>
          <td class="feature">İnternet Hızı</td>
          <td>${c1.internet || 40} Mbps</td>
          <td>${c2.internet || 40} Mbps</td>
        </tr>
      </tbody>
    </table>
  `;
}

document.getElementById('btnCompare')?.addEventListener('click', ()=>{
  populateCompareSelects();
  compareModal?.classList.add('show');
});
document.getElementById('compareClose')?.addEventListener('click', ()=> compareModal?.classList.remove('show'));
compSelect1?.addEventListener('change', renderCompareTable);
compSelect2?.addEventListener('change', renderCompareTable);

/* ============================================================
   VERİ YÜKLEME
   ============================================================ */
async function loadData(){
  const bar = document.getElementById('loaderBar');
  document.getElementById('loader').classList.add('active');
  bar.style.width = '40%';
  try {
    const res = await fetch('api/cities.php?live=1');
    RAW = await res.json();
    bar.style.width = '90%';
    initDerived();
    buildFilters();
    renderMap();
    update();
    bar.style.width = '100%';
    setTimeout(()=>{ document.getElementById('loader').classList.remove('active'); bar.style.width='0'; }, 400);
  } catch(e){
    document.getElementById('filters').innerHTML = `<div style="text-align:center;color:var(--bad);padding:30px;font-size:12px;">
      ${iconSvg('alert',18)}<br>Veri yüklenemedi.<br><code style="font-size:10px">${e.message}</code></div>`;
  }
}

/* ---- türetilmiş değerler ---- */
const KIYI_NOKTALARI = [
  // Karadeniz kıyısı
  [41.87,27.98],[41.63,28.08],[41.40,28.25],[41.28,28.80],[41.20,29.10],[41.18,29.61],[41.14,30.30],[41.10,30.70],
  [41.08,31.12],[41.28,31.41],[41.46,31.79],[41.64,32.34],[41.74,32.39],[41.84,32.71],[41.90,33.00],[41.97,33.76],
  [41.98,34.02],[42.02,35.15],[41.85,35.25],[41.62,35.90],[41.29,36.33],[41.20,36.70],[41.13,37.28],[41.03,37.50],
  [40.98,37.88],[40.91,38.39],[41.00,39.72],[41.02,40.52],[41.40,41.43],[41.48,41.52],
  // İstanbul Boğazı / Marmara kuzey
  [41.24,29.12],[41.05,29.00],[40.85,29.20],[40.75,29.40],[40.76,29.93],[40.73,30.05],
  // Marmara güney / Çanakkale
  [40.70,29.85],[40.66,29.27],[40.52,29.05],[40.42,28.70],[40.40,27.40],[40.35,26.70],[40.15,26.41],[40.02,26.30],[39.80,26.15],
  // Ege kıyısı
  [39.55,26.65],[39.53,26.12],[39.31,26.69],[39.07,26.88],[38.85,26.85],[38.67,26.75],[38.42,27.14],[38.32,26.30],
  [38.20,26.84],[37.86,27.26],[37.65,27.35],[37.37,27.26],[37.03,27.43],[36.72,27.68],[36.85,28.27],[36.62,29.11],
  // Akdeniz kıyısı
  [36.20,29.63],[36.24,29.98],[36.30,30.14],[36.60,30.56],[36.89,30.71],[36.78,31.44],[36.54,31.99],[36.27,32.31],
  [36.07,32.83],[36.38,33.93],[36.81,34.64],[36.57,35.37],[36.77,35.79],[36.58,36.17],[36.08,35.96],
];

function distKm(lat1, lng1, lat2, lng2){
  const R=6371, toR=d=>d*Math.PI/180;
  const dLat=toR(lat2-lat1), dLng=toR(lng2-lng1);
  const a=Math.sin(dLat/2)**2 + Math.cos(toR(lat1))*Math.cos(toR(lat2))*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function denizMesafe(lat, lng){
  let min=9999;
  for(const [la,lo] of KIYI_NOKTALARI){
    const d=distKm(lat,lng,la,lo);
    if(d<min) min=d;
  }
  return Math.round(min);
}

function initDerived(){
  const DEPREM = {1:4,2:4,3:3,4:3,5:3,6:3,7:4,8:3,9:4,10:3,11:3,12:5,13:4,14:4,15:3,16:3,17:3,18:3,19:2,20:4,
    21:3,22:2,23:5,24:5,25:4,26:3,27:3,28:3,29:3,30:3,31:5,32:3,33:4,34:5,35:4,36:3,37:3,38:3,39:2,40:3,
    41:5,42:3,43:3,44:5,45:4,46:5,47:3,48:4,49:4,50:3,51:3,52:3,53:3,54:5,55:3,56:3,57:3,58:3,59:3,60:3,
    61:3,62:4,63:3,64:3,65:4,66:3,67:3,68:3,69:4,70:3,71:3,72:3,73:3,74:3,75:3,76:4,77:4,78:3,79:3,80:4,81:4};
  RAW.iller.forEach(c=>{
    c.depremRiski = DEPREM[c.id] || 3;
    c.daglik = c.rakim!=null ? Math.min(10, Math.round(c.rakim/200)) : null;
    c.denizMesafe = denizMesafe(c.lat, c.lng);
    if (c.deniz === 1 && c.denizMesafe > 15) c.denizMesafe = 5;
    c.deniz = c.deniz !== undefined ? c.deniz : (c.denizMesafe <= 15 ? 1 : 0);
    if (c.canli) { c.nem = c.canli.nem; c.aqi = c.canli.aqi; }
    const nScore = Math.min(8, Math.log10(c.nufus/1000+1)*2.2);
    c.ulasim = Math.round(Math.min(10, nScore + (c.deniz?1.2:0)));
    c.internet = Math.round(Math.min(100, 25 + Math.log10(c.nufus/1000+1)*22));
  });
  const ilById = {};
  RAW.iller.forEach(i=> ilById[i.id]=i);
  RAW.ilceler.forEach(d=>{
    const il = ilById[d.il_id] || {};
    d.depremRiski = il.depremRiski || 3;
    d.daglik = d.rakim!=null ? Math.min(10, Math.round(d.rakim/200)) : null;
    d.denizMesafe = denizMesafe(d.lat, d.lng);
    d.deniz = d.deniz !== undefined ? d.deniz : (d.denizMesafe <= 15 ? 1 : 0);
    if (d.deniz === 1 && d.denizMesafe > 15) d.denizMesafe = 3;
    if (d.canli) { d.nem = d.canli.nem; d.aqi = d.canli.aqi; }
    d.ulasim = il.ulasim || 5;
    d.internet = il.internet || 40;
    d.bolge = il.bolge || '';
    d.nufus = il.nufus || 0;
  });
}

/* ============================================================
   FİLTRE UI KURULUMU
   ============================================================ */
function fmtNum(v, unit){
  if(unit==='bin') return (v>=1000? (v/1000).toFixed(v%1000?1:0)+'M' : v+'K');
  return v + (unit? ' '+unit : '');
}
function fmtRange(f){
  const lo = state[f.key].min, hi = state[f.key].max;
  if(f.log) return fmtNum(lo,'bin')+' – '+fmtNum(hi,'bin');
  return (lo===f.min && hi===f.max) ? 'Tümü' : (lo+' – '+hi+(f.unit?' '+f.unit:''));
}

function buildFilters(){
  const cont = document.getElementById('filters');
  cont.innerHTML = "";
  FILTERS.forEach((g, gIdx)=>{
    const grp = document.createElement('div');
    grp.className = 'grp' + (g.open?' open':'');
    grp.innerHTML = `<div class="grp-head"><span class="ico">${iconSvg(g.icon,16,'ico')}</span>
      <span class="label">${g.grp}</span><span class="chev">${iconSvg('chevron',14)}</span></div>`;
    const body = document.createElement('div');
    body.className = 'grp-body';
    g.items.forEach(f=>{
      if(f.type==='range'){
        state[f.key] = {min:f.min, max:f.max};
        const fe = document.createElement('div');
        fe.className = 'filter';
        fe.innerHTML = `
          <div class="f-head"><span class="f-label">${iconSvg(f.ic||'activity',14)} ${f.label}</span><span class="f-val default" id="v_${f.key}">Tümü</span></div>
          ${f.note?`<div class="hint">${iconSvg('activity',10)} ${f.note}</div>`:''}
          <div class="range-wrap">
            <div class="range-track"><div class="range-fill" id="fill_${f.key}"></div></div>
            <input type="range" id="min_${f.key}" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.min}">
            <input type="range" id="max_${f.key}" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.max}">
          </div>`;
        body.appendChild(fe);
      } else if(f.type==='tri'){
        state[f.key] = 0;
        const fe = document.createElement('div');
        fe.className = 'filter';
        fe.innerHTML = `
          <div class="f-head"><span class="f-label">${iconSvg(f.ic||'activity',14)} ${f.label}</span></div>
          ${f.note?`<div class="hint">${f.note}</div>`:''}
          <div class="tri" id="tri_${f.key}">
            ${f.opts.map((o,i)=>`<button data-i="${i}" class="${i===0?'sel':''}">${o}</button>`).join('')}
          </div>`;
        body.appendChild(fe);
      } else if(f.type==='checks'){
        state[f.key] = new Set(f.opts);
        const fe = document.createElement('div');
        fe.className = 'filter';
        fe.innerHTML = `
          <div class="f-head"><span class="f-label">${iconSvg(f.ic||'compass',14)} ${f.label}</span></div>
          <div class="checks" id="chk_${f.key}">
            ${f.opts.map(o=>`<label><input type="checkbox" value="${o}" checked> ${o}</label>`).join('')}
          </div>`;
        body.appendChild(fe);
      }
    });
    grp.appendChild(body);
    grp.querySelector('.grp-head').addEventListener('click', ()=> grp.classList.toggle('open'));
    cont.appendChild(grp);

    if (gIdx === 1) {
      const midAd = document.createElement('div');
      midAd.className = 'ad-container filters-mid-ad';
      midAd.innerHTML = `<span class="ad-label">Sponsorlu Bağlantı</span>`;
      cont.appendChild(midAd);
    }
  });
  wireFilters();
  wirePresets();
}

function setRangeVal(key, min, max){
  const f = FILTERS.flatMap(g=>g.items).find(x=>x.key===key);
  if(!f) return;
  state[key] = {min, max};
  const minI = document.getElementById('min_'+key);
  const maxI = document.getElementById('max_'+key);
  const fill = document.getElementById('fill_'+key);
  const val = document.getElementById('v_'+key);
  if(minI && maxI){
    minI.value = min;
    maxI.value = max;
    const span = f.max - f.min;
    const lp = (min - f.min)/span*100, hp = (max - f.min)/span*100;
    if(fill){ fill.style.left = lp+'%'; fill.style.width = (hp-lp)+'%'; }
    const isDef = (min===f.min && max===f.max);
    if(val){ val.textContent = isDef?'Tümü':fmtRange(f); val.classList.toggle('default', isDef); }
  }
}

function setTriVal(key, optIdx){
  state[key] = optIdx;
  const box = document.getElementById('tri_'+key);
  if(box){
    box.querySelectorAll('button').forEach(b=>{
      b.classList.toggle('sel', +b.dataset.i === optIdx);
    });
  }
}

function wirePresets(){
  document.querySelectorAll('.chip-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const p = btn.dataset.preset;
      document.querySelectorAll('.chip-btn').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');

      FILTERS.forEach(g=>g.items.forEach(f=>{
        if(f.type==='range') setRangeVal(f.key, f.min, f.max);
        else if(f.type==='tri') setTriVal(f.key, 0);
      }));

      if(p === 'sea_summer'){
        setTriVal('deniz', 1);
        setRangeVal('yaz_sicaklik', 25, 35);
      } else if(p === 'nature_cool'){
        setRangeVal('rakim', 400, 2000);
        setRangeVal('gunes_suresi', 2200, 4000);
      } else if(p === 'metropolis'){
        setRangeVal('nufus', 1000, 16000);
        setRangeVal('internet', 60, 100);
      } else if(p === 'peace_safety'){
        setRangeVal('depremRiski', 0, 3);
        setRangeVal('nufus', 80, 800);
      }
      update();
    });
  });
}

function wireFilters(){
  FILTERS.forEach(g=>g.items.forEach(f=>{
    if(f.type==='range'){
      const minI=document.getElementById('min_'+f.key);
      const maxI=document.getElementById('max_'+f.key);
      const fill=document.getElementById('fill_'+f.key);
      const val=document.getElementById('v_'+f.key);
      const span=f.max-f.min;
      const upd=()=>{
        let lo=+minI.value, hi=+maxI.value;
        if(lo>hi-(f.step||1)){ if(+minI.value>+maxI.value-(f.step||1)) minI.value=+maxI.value-(f.step||1); if(+maxI.value<+minI.value+(f.step||1)) maxI.value=+minI.value+(f.step||1); lo=+minI.value; hi=+maxI.value; }
        state[f.key]={min:lo,max:hi};
        const lp=(lo-f.min)/span*100, hp=(hi-f.min)/span*100;
        fill.style.left=lp+'%'; fill.style.width=(hp-lp)+'%';
        const isDef=(lo===f.min && hi===f.max);
        val.textContent=isDef?'Tümü':fmtRange(f);
        val.classList.toggle('default',isDef);
        update();
      };
      minI.addEventListener('input',()=>{ if(+minI.value>+maxI.value-(f.step||1)) minI.value=+maxI.value-(f.step||1); upd(); });
      maxI.addEventListener('input',()=>{ if(+maxI.value<+minI.value+(f.step||1)) maxI.value=+minI.value+(f.step||1); upd(); });
      fill.style.left='0%'; fill.style.width='100%';
    } else if(f.type==='tri'){
      const box=document.getElementById('tri_'+f.key);
      box.querySelectorAll('button').forEach(b=>{
        b.addEventListener('click',()=>{
          box.querySelectorAll('button').forEach(x=>x.classList.remove('sel'));
          b.classList.add('sel');
          state[f.key]=+b.dataset.i;
          update();
        });
      });
    } else if(f.type==='checks'){
      const box=document.getElementById('chk_'+f.key);
      box.querySelectorAll('input').forEach(c=>{
        c.addEventListener('change',()=>{
          const s=new Set();
          box.querySelectorAll('input:checked').forEach(x=>s.add(x.value));
          state[f.key]=s;
          update();
        });
      });
    }
  }));
}

/* ============================================================
   HASSAS SÜREKLİ SKORLAMA & %70 EŞİK FİLTRESİ
   ============================================================ */
function evalCity(c){
  let activeFilters = 0;
  let totalRatio = 0;
  const reasons = [];

  FILTERS.forEach(g=>g.items.forEach(f=>{
    if(f.type==='range'){
      let v=c[f.key];
      if(f.key==='nufus' && v!=null){ v=v/1000; }
      const st=state[f.key];
      if(v==null) return;
      const isDef=(st.min===f.min && st.max===f.max);
      if(isDef) return;
      activeFilters++;

      if(v >= st.min && v <= st.max){
        totalRatio += 1.0;
      } else {
        const span = Math.max(1, f.max - f.min);
        const diff = v < st.min ? (st.min - v) : (v - st.max);
        const penalty = Math.min(1, diff / (span * 0.25));
        const ratio = Math.max(0, 1 - penalty);
        totalRatio += ratio;
        if(ratio < 0.7) reasons.push(f.label);
      }
    } else if(f.type==='tri'){
      if(state[f.key]===0) return;
      activeFilters++;
      const want = state[f.key]===1?1:0;
      if(c[f.key]===want){
        totalRatio += 1.0;
      } else {
        totalRatio += 0.0;
        reasons.push(f.label);
      }
    } else if(f.type==='checks'){
      const st=state[f.key];
      if(st.size===f.opts.length) return;
      activeFilters++;
      if(st.has(c[f.key])){
        totalRatio += 1.0;
      } else {
        totalRatio += 0.0;
        reasons.push(f.label);
      }
    }
  }));

  const score = activeFilters===0 ? 100 : Math.round((totalRatio / activeFilters) * 100);
  const eligible = activeFilters===0 ? true : (score >= 70);
  return {score, passed: Math.round(totalRatio), activeFilters, eligible, reasons};
}

function colorFor(score, eligible){
  if(strictMode && !eligible) return '#64748b';
  if(score>=85) return '#16a34a';
  if(score>=75) return '#84cc16';
  if(score>=70) return '#eab308';
  return '#94a3b8';
}

/* ============================================================
   HARİTA MARKER RENDERİ (Dengeli 14px Şehir / 10px İlçe)
   ============================================================ */
const layerIl = L.layerGroup().addTo(map);
const layerIlce = L.layerGroup().addTo(map);

function renderCityMarkerHtml(c, res){
  const col = colorFor(res.score, res.eligible);
  const op = (!strictMode || res.eligible) ? 1 : 0;
  if (labelMode === 'full') {
    return `<div class="city-marker-cool" style="border-left-color:${col}; opacity:${op}; display:${res.eligible || !strictMode ? 'inline-flex':'none'}">${c.ad} <span class="cool-score" style="color:${col}">%${res.score}</span></div>`;
  }
  const size = Math.max(16, Math.min(34, Math.round(Math.log10((c.nufus||50000)/1000)*10)));
  return `<div class="city-marker" style="width:${size}px;height:${size}px;font-size:${Math.max(8,size/2.5)}px;background:${col};opacity:${op};display:${res.eligible || !strictMode ? 'flex':'none'}">${c.ad[0]}</div>`;
}

function renderIlceMarkerHtml(d, res){
  const col = colorFor(res.score, res.eligible);
  const op = (!strictMode || res.eligible) ? 0.95 : 0;
  if (labelMode === 'full') {
    return `<div class="ilce-marker-cool" style="opacity:${op}; display:${res.eligible || !strictMode ? 'inline-flex':'none'}"><span class="cool-dot" style="background:${col}"></span>${d.ad}</div>`;
  }
  return `<div class="city-marker ilce" style="width:10px;height:10px;background:${col};opacity:${op};font-size:7px;display:${res.eligible || !strictMode ? 'flex':'none'}">${d.ad[0]}</div>`;
}

function renderMap(){
  RAW.iller.forEach(c=>{
    const res = evalCity(c);
    const mk = L.marker([c.lat,c.lng],{
      icon: L.divIcon({className:'', html: renderCityMarkerHtml(c, res)})
    });
    markersIl[c.id] = mk;
    mk.addTo(layerIl);
    mk.bindTooltip(`${c.ad} (%${res.score})`, {direction:'top', offset:[0, -8]});
    mk.on('click',()=>{ openCity(c,'il'); });
  });
}

let ilceRendered = false;
function renderIlcelerLazy(){
  if(ilceRendered) return;
  ilceRendered = true;
  RAW.ilceler.forEach(d=>{
    const res = evalCity(d);
    const mk = L.marker([d.lat,d.lng],{
      icon: L.divIcon({className:'', html: renderIlceMarkerHtml(d, res)})
    });
    markersIlce[d.id] = mk;
    mk.bindTooltip(`${d.ad} (%${res.score})`, {direction:'top', offset:[0, -4]});
    mk.on('click',()=>{ openCity(d,'ilce'); });
  });
}

/* ============================================================
   VIEWPORT BOUNDS SÜZGEÇLİ VE ÇAKIŞMA GİDERİCİ KATMAN GÜNCELLEMESİ
   ============================================================ */
function updateLayers(){
  const z = map.getZoom();
  const note = document.getElementById('layerNote');
  let showIl, showIlce;

  if(layerMode==='auto'){
    showIl = true;
    showIlce = z >= 9.5;
    note.textContent = showIlce ? 'il + ilçe (ekrandakiler)' : 'il görünür (biraz daha yakınlaştır)';
  } else if(layerMode==='il'){
    showIl=true; showIlce=false; note.textContent='sadece il';
  } else {
    showIl=false; showIlce=true; note.textContent='sadece ilçe';
  }

  if(showIl){ if(!map.hasLayer(layerIl)) layerIl.addTo(map); } else { if(map.hasLayer(layerIl)) map.removeLayer(layerIl); }
  
  if(showIlce){
    renderIlcelerLazy();
    if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);

    const bounds = map.getBounds().pad(0.15);
    const ilById = {};
    RAW.iller.forEach(i=> ilById[i.id] = i);

    RAW.ilceler.forEach(d=>{
      const mk = markersIlce[d.id];
      if(!mk) return;
      
      let isDuplicateCenter = false;
      if (showIl) {
        const parentIl = ilById[d.il_id];
        if (parentIl) {
          const dName = d.ad.toLowerCase();
          const ilName = parentIl.ad.toLowerCase();
          if (dName === 'merkez' || dName === ilName || (ilName === 'kocaeli' && dName === 'izmit') || (ilName === 'muğla' && dName === 'menteşe')) {
            const distanceKm = distKm(d.lat, d.lng, parentIl.lat, parentIl.lng);
            if (distanceKm < 5.0) {
              isDuplicateCenter = true;
            }
          }
        }
      }

      const res = evalCity(d);
      const isEligibleOrNotStrict = res.eligible || !strictMode;
      const inView = bounds.contains([d.lat, d.lng]);

      if(inView && !isDuplicateCenter && isEligibleOrNotStrict){
        if(!layerIlce.hasLayer(mk)) layerIlce.addLayer(mk);
      } else {
        if(layerIlce.hasLayer(mk)) layerIlce.removeLayer(mk);
      }
    });
  } else {
    if(map.hasLayer(layerIlce)) map.removeLayer(layerIlce);
  }
}
map.on('zoomend moveend', ()=>{ updateLayers(); });

document.getElementById('layerToggle').addEventListener('click', function(e){
  const b = e.target.closest('button');
  if(!b) return;
  layerMode = b.dataset.layer;
  this.querySelectorAll('button').forEach(x=>x.classList.toggle('sel', x===b));
  updateLayers();
});

/* ============================================================
   POPUP
   ============================================================ */
function popupHtml(c, res, type){
  const col=colorFor(res.score,res.eligible);
  const ilAdi = type==='ilce' ? (RAW.iller.find(i=>i.id===c.il_id)?.ad || '') : c.ad;
  const baslik = type==='ilce' ? `${c.ad}` : c.ad;
  const altBaslik = type==='ilce' ? `${ilAdi} ili` : c.bolge;
  const live = c.canli;
  const liveBadge = live ? `<span class="fresh-badge ${live.age_h>6?'stale':''}">${iconSvg('droplet',11)} ${live.nem}% • AQI ${live.aqi} · ${live.age_h}sa önce</span>` : '';
  const isFav = favorites.has(`${type}_${c.id}`);

  const grid = [
    ['Nüfus', c.nufus? fmtNum(c.nufus,'bin') : '—', 'users'],
    ['Rakım', c.rakim!=null? c.rakim+' m' : '—', 'mountain'],
    ['Deniz', c.deniz? 'Evet' : 'Hayır', 'waves'],
    ['Dağlık', c.daglik!=null? c.daglik+'/10' : '—', 'mountain'],
    ['Yıllık sıc.', c.yillik_sicaklik!=null? c.yillik_sicaklik+' °C' : '—', 'thermometer'],
    ['Kış / Yaz', (c.kis_sicaklik!=null?c.kis_sicaklik:'?')+'° / '+(c.yaz_sicaklik!=null?c.yaz_sicaklik+'°':'?'), 'thermometer'],
    ['Yağış', c.yillik_yagis!=null? c.yillik_yagis+' mm' : '—', 'cloud-rain'],
    ['Güneş', c.gunes_suresi!=null? c.gunes_suresi+' sa/yıl' : '—', 'sun'],
    ['Kar', c.kar_yagisi!=null? c.kar_yagisi+' cm/yıl' : '—', 'cloud-rain'],
    ['Ulaşım', c.ulasim!=null? c.ulasim+'/10' : '—', 'navigation'],
    ['İnternet', c.internet!=null? c.internet+' Mbps' : '—', 'wifi'],
    ['Deprem', c.depremRiski!=null? c.depremRiski+'/5' : '—', 'activity'],
  ].map(r=>`<div><span class="k">${iconSvg(r[2],12)} ${r[0]}</span><b>${r[1]}</b></div>`).join('');

  return `<div class="pop">
    <h3>
      <span class="pop-title-left">${iconSvg('map-pin',15)} ${baslik}</span>
      <div class="pop-actions-top">
        <button class="pop-btn fav ${isFav?'active':''}" onclick="toggleFav(${c.id}, '${type}')" title="Favorilere Ekle/Çıkar">${isFav?'❤️':'🤍'}</button>
        <button class="pop-btn share" onclick="openShareModal(RAW.${type==='il'?'iller':'ilceler'}.find(x=>x.id===${c.id}), ${res.score})" title="Instagram Story Kartı Oluştur">📸</button>
      </div>
    </h3>
    <div class="region">${altBaslik}</div>
    <div class="scoretxt"><span>Uyum skoru</span><b style="color:${col}">%${res.score} ${res.eligible?'':'(elendi)'}</b></div>
    <div class="scorebar"><div class="scorefill" style="width:${res.score}%;background:${col}"></div></div>
    ${res.reasons.length?`<div style="font-size:10px;color:var(--muted)">Uymayan: ${res.reasons.join(', ')}</div>`:''}
    ${liveBadge}
    <div class="grid">${grid}</div>
  </div>`;
}

function openCity(c, type){
  const mk = type==='il' ? markersIl[c.id] : markersIlce[c.id];
  if(!mk) return;
  const res = evalCity(c);
  mk.unbindPopup();
  mk.bindPopup(popupHtml(c,res,type)).openPopup();
  refreshLive(c, type);
}

async function refreshLive(c, type){
  try {
    const res = await fetch(`api/refresh.php?type=${type}&id=${c.id}`);
    const d = await res.json();
    if(d.nem!=null){
      c.canli = { nem:d.nem, aqi:d.aqi, pm25:d.pm25, age_h: Math.round((Date.now()/1000 - d.ts)/3600) };
      c.nem = d.nem;
      c.aqi = d.aqi;
      update();
      const mk = type==='il' ? markersIl[c.id] : markersIlce[c.id];
      if(mk && mk.isPopupOpen()){
        const res2 = evalCity(c);
        mk.setPopupContent(popupHtml(c,res2,type));
      }
    }
  } catch(e){}
}

/* ============================================================
   ANA GÜNCELLEME
   ============================================================ */
function update(){
  let activeCount=0;
  FILTERS.forEach(g=>g.items.forEach(f=>{
    if(f.type==='range'){ const st=state[f.key]; if(!(st.min===f.min&&st.max===f.max)) activeCount++; }
    else if(f.type==='tri'){ if(state[f.key]!==0) activeCount++; }
    else if(f.type==='checks'){ if(state[f.key].size!==f.opts.length) activeCount++; }
  }));
  document.getElementById('cntActive').textContent=activeCount;

  let matchCount=0, bestCount=0;

  // iller
  RAW.iller.forEach(c=>{
    const res=evalCity(c);
    const mk=markersIl[c.id];
    if(!mk) return;
    mk.setIcon(L.divIcon({className:'', html: renderCityMarkerHtml(c, res)}));
    mk.setTooltipContent(`${c.ad} (%${res.score})`);
    if(res.eligible) matchCount++;
    if(res.eligible && res.score>=85) bestCount++;
  });

  // ilçeler
  const ilceVisible = layerMode==='ilce' || (layerMode==='auto' && map.getZoom()>=9.5);
  if(ilceVisible && ilceRendered){
    RAW.ilceler.forEach(d=>{
      const res=evalCity(d);
      const mk=markersIlce[d.id];
      if(!mk) return;
      mk.setIcon(L.divIcon({className:'', html: renderIlceMarkerHtml(d, res)}));
      mk.setTooltipContent(`${d.ad} (%${res.score})`);
      if(res.eligible) matchCount++;
    });
  }

  document.getElementById('cntMatch').textContent=matchCount;
  document.getElementById('cntBest').textContent=bestCount;

  updateLayers();
}

/* ============================================================
   CANLI İL VE İLÇE ARAMA AÇILIR MENÜSÜ
   ============================================================ */
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchResults = document.getElementById('searchResults');

function filterSearch(){
  const q = searchInput.value.trim().toLowerCase();
  if(q.length < 2) {
    searchResults.classList.remove('active');
    searchResults.innerHTML = '';
    return;
  }

  const matchedIlceler = RAW.ilceler.filter(d=> d.ad.toLowerCase().includes(q)).slice(0, 7);
  const matchedIller = RAW.iller.filter(c=> c.ad.toLowerCase().includes(q)).slice(0, 5);

  if(matchedIlceler.length === 0 && matchedIller.length === 0){
    searchResults.innerHTML = `<div class="search-item" style="color:var(--muted);justify-content:center;">Sonuç bulunamadı</div>`;
    searchResults.classList.add('active');
    return;
  }

  let html = '';

  matchedIlceler.forEach(d=>{
    const il = RAW.iller.find(i=> i.id === d.il_id);
    const res = evalCity(d);
    const col = colorFor(res.score, res.eligible);
    html += `<div class="search-item" data-type="ilce" data-id="${d.id}">
      <div>
        <b>📍 ${d.ad}</b>
        <div class="item-sub">${il ? il.ad+' ili' : ''}</div>
      </div>
      <b style="color:${col}">%${res.score}</b>
    </div>`;
  });

  matchedIller.forEach(c=>{
    const res = evalCity(c);
    const col = colorFor(res.score, res.eligible);
    html += `<div class="search-item" data-type="il" data-id="${c.id}">
      <div>
        <b>🏙️ ${c.ad} (İl)</b>
        <div class="item-sub">${c.bolge}</div>
      </div>
      <b style="color:${col}">%${res.score}</b>
    </div>`;
  });

  searchResults.innerHTML = html;
  searchResults.classList.add('active');

  searchResults.querySelectorAll('.search-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      const type = item.dataset.type;
      const id = +item.dataset.id;
      if(type==='ilce'){
        const d = RAW.ilceler.find(x=> x.id===id);
        if(d){
          if(layerMode === 'auto' && map.getZoom() < 10) map.setZoom(10);
          renderIlcelerLazy();
          if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
          map.flyTo([d.lat, d.lng], 10.5, {duration: 0.8});
          setTimeout(()=> openCity(d, 'ilce'), 600);
        }
      } else {
        const c = RAW.iller.find(x=> x.id===id);
        if(c){
          map.flyTo([c.lat, c.lng], 8, {duration: 0.8});
          setTimeout(()=> openCity(c, 'il'), 600);
        }
      }
      searchResults.classList.remove('active');
    });
  });
}

searchInput.addEventListener('input', filterSearch);
searchInput.addEventListener('focus', filterSearch);

document.addEventListener('click', (e)=>{
  if(!e.target.closest('.search-box')){
    searchResults.classList.remove('active');
  }
});

searchClear.addEventListener('click', ()=>{
  searchInput.value = '';
  searchResults.classList.remove('active');
});

/* ============================================================
   KONTROLLER & BAŞLATMA
   ============================================================ */
document.getElementById('btnReset').addEventListener('click',()=>{
  document.querySelectorAll('.chip-btn').forEach(x=>x.classList.remove('active'));
  buildFilters(); update();
});
document.getElementById('btnStrict').addEventListener('click',function(){
  strictMode=!strictMode;
  this.classList.toggle('active',strictMode);
  this.innerHTML = strictMode? `${iconSvg('check',15)} Sadece uygun` : `${iconSvg('layers',15)} Tümünü göster`;
  update();
});
document.getElementById('toggleSb').addEventListener('click',()=>{
  document.getElementById('sidebar').classList.toggle('show');
});

updateLayers();
loadData();

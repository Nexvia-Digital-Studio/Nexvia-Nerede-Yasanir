/* ============================================================
   Yaşam Haritası — frontend mantığı
   (81 İl İçin Sosyal İmkânlar, Eğlence, Emeklilik, Gastro, Ev Kirası (₺), Sağlık/Eğitim Modülü)
   Veri: api/cities.php (DB) + api/refresh.php (canlı nem/AQI)
   ============================================================ */

// SVG ikonlar
const SVG = {
  'map-pin':'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  'globe':'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
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
  'zap':'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  'trash':'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  'link':'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  'heart':'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  'music':'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  'home':'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'utensils':'<path d="M18 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>',
  'smile':'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
  'dollar-sign':'<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
};

function iconSvg(name, size=16, cls='ic'){
  const p = SVG[name] || SVG['map-pin'];
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

// Türkçe Slug Dönüştürücü
function slugify(text) {
  if (!text) return '';
  const map = {'ç':'c','Ç':'c','ğ':'g','Ğ':'g','ı':'i','I':'i','İ':'i','ö':'o','Ö':'o','ş':'s','Ş':'s','ü':'u','Ü':'u'};
  return text.replace(/[çÇğĞıIİöÖşŞüÜ]/g, m => map[m])
             .toLowerCase()
             .replace(/[^a-z0-9]/g, '');
}

/* ============================================================
   FİLTRE TANIMLARI (SOSYAL İMKANLAR, KİRA ₺ VE GASTRO DAHİL)
   ============================================================ */
const FILTERS = [
  {grp:'Coğrafi', icon:'globe', open:true, items:[
    {key:'deniz', label:'Deniz kenarı', ic:'waves', type:'tri', opts:['farketmez','evet','hayır']},
    {key:'denizMesafe', label:'Denize uzaklık', ic:'waves', type:'range', min:0, max:400, step:10, unit:'km', lower:true, note:'Kıyıya olan kuş uçuşu mesafe'},
    {key:'rakim', label:'Rakım', ic:'mountain', type:'range', min:0, max:2000, step:50, unit:'m'},
    {key:'daglik', label:'Dağlık/arazi', ic:'mountain', type:'range', min:0, max:10, step:1, unit:'/10'},
  ]},
  {grp:'Sosyal & Yaşam', icon:'music', open:true, items:[
    {key:'sosyalImkan', label:'Sosyal imkânlar (etkinlik, kültür)', ic:'music', type:'range', min:0, max:10, step:1, unit:'/10', note:'Konser, sinema, tiyatro ve sosyal etkinlik düzeyi'},
    {key:'eglence', label:'Gece hayatı & eğlence', ic:'coffee', type:'range', min:0, max:10, step:1, unit:'/10', note:'Mekân, bar ve eğlence hayatı çeşitliliği'},
    {key:'genclik', label:'Gençlik & öğrenci yaşamı', ic:'smile', type:'range', min:0, max:10, step:1, unit:'/10', note:'Üniversite ortamı ve gençlik sosyalliği'},
    {key:'emeklilik', label:'Emeklilik & huzur', ic:'sun', type:'range', min:0, max:10, step:1, unit:'/10', note:'Sakinlik, temiz hava ve yürüyüş alanları'},
    {key:'gastro', label:'Mutfak & yemek kültürü', ic:'utensils', type:'range', min:0, max:10, step:1, unit:'/10', note:'Geleneksel lezzetler ve restoran çeşitliliği'},
  ]},
  {grp:'Ekonomi & Ev Kirası', icon:'home', open:true, items:[
    {key:'kira', label:'Ortalama ev kirası (2+1)', ic:'home', type:'range', min:8, max:45, step:1, unit:'bin ₺', lower:true, note:'Aylık tahmini ortalama konut kirası'},
    {key:'maliyet', label:'Maliyet / pahalılık endeksi', ic:'dollar-sign', type:'range', min:0, max:10, step:1, unit:'/10', lower:true, note:'Genel mutfak ve yaşam giderleri (düşük ucuz)'},
  ]},
  {grp:'İklim', icon:'thermometer', open:false, items:[
    {key:'yillik_sicaklik', label:'Yıllık ort. sıcaklık', ic:'thermometer', type:'range', min:4, max:22, step:0.5, unit:'°C'},
    {key:'kis_sicaklik', label:'Kış sıcaklığı (Ocak)', ic:'thermometer', type:'range', min:-10, max:14, step:0.5, unit:'°C'},
    {key:'yaz_sicaklik', label:'Yaz sıcaklığı (Temmuz)', ic:'thermometer', type:'range', min:15, max:35, step:0.5, unit:'°C'},
    {key:'yillik_yagis', label:'Yıllık yağış', ic:'cloud-rain', type:'range', min:280, max:2400, step:50, unit:'mm'},
    {key:'gunes_suresi', label:'Güneş süresi', ic:'sun', type:'range', min:1500, max:4000, step:50, unit:'sa/yıl'},
    {key:'kar_yagisi', label:'Kar yağışı', ic:'cloud-rain', type:'range', min:0, max:400, step:10, unit:'cm/yıl', lower:true},
  ]},
  {grp:'Demografi & Sağlık', icon:'users', open:false, items:[
    {key:'nufus', label:'Nüfus (il)', ic:'users', type:'range', min:80, max:16000, step:80, unit:'bin', log:true},
    {key:'saglik', label:'Sağlık altyapısı', ic:'heart', type:'range', min:0, max:10, step:1, unit:'/10', note:'Hastane ve uzman hekim imkânları'},
    {key:'egitim', label:'Eğitim imkânları', ic:'building', type:'range', min:0, max:10, step:1, unit:'/10'},
    {key:'ulasim', label:'Ulaşım / altyapı', ic:'navigation', type:'range', min:0, max:10, step:1, unit:'/10'},
    {key:'internet', label:'İnternet hızı (tahmini)', ic:'wifi', type:'range', min:20, max:100, step:5, unit:'Mbps'},
  ]},
  {grp:'Riskler (düşük iyi)', icon:'alert', open:false, items:[
    {key:'depremRiski', label:'Deprem riski', ic:'activity', type:'range', min:0, max:5, step:1, unit:'/5', lower:true, note:'AFAD haritasından il bazlı yaklaşıktır'},
    {key:'nem', label:'Nem oranı (canlı)', ic:'droplet', type:'range', min:40, max:90, step:1, unit:'%', lower:true, note:'Open-Meteo canlı veri — popup açınca güncellenir'},
    {key:'aqi', label:'Hava kirliliği (canlı AQI)', ic:'wind', type:'range', min:0, max:100, step:5, unit:'AQI', lower:true, note:'European AQI — popup açınca güncellenir'},
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
let layerMode = 'auto';
let favOnlyMode = false;
let compareSelection1 = null;
let labelMode = localStorage.getItem('yh_label') || 'full';
let currentTheme = localStorage.getItem('yh_theme') || 'dark';

let favorites = new Set(JSON.parse(localStorage.getItem('yh_favs') || '[]'));

function saveFavs(){
  localStorage.setItem('yh_favs', JSON.stringify([...favorites]));
  const countEl = document.getElementById('favCount');
  if(countEl) countEl.textContent = favorites.size;
}
saveFavs();

const markersIl = {};
const markersIlce = {};

/* ============================================================
   WINDOW GLOBAL HELPER FUNCTIONS
   ============================================================ */
window.appToggleFav = function(id, type){
  const key = `${type}_${id}`;
  if(favorites.has(key)) favorites.delete(key);
  else favorites.add(key);
  saveFavs();
  update();
  renderFavsList();
};

window.appToggleFavMode = function(){
  favOnlyMode = !favOnlyMode;
  const btn = document.getElementById('btnShowFavs');
  if(btn){
    btn.classList.toggle('active', favOnlyMode);
  }
  update();
  updateLayers();
  if(favOnlyMode && favorites.size === 0){
    alert('Henüz favoriye eklenmiş bir il veya ilçe yok. Kalp ikonuna basarak favorilerinizi ekleyebilirsiniz!');
  }
};

window.appStartMapCompare = function(id, type){
  const item = type==='il' ? RAW.iller.find(i=>i.id===id) : RAW.ilceler.find(d=>d.id===id);
  if(!item) return;
  compareSelection1 = { id, type, name: item.ad };
  const banner = document.getElementById('mapCompareBanner');
  const txt = document.getElementById('mapCompareText');
  if(txt) txt.innerHTML = `${iconSvg('activity',14)} 1. Şehir Seçildi: <b>${item.ad}</b>. Karşılaştırmak için haritada 2. şehre tıkla!`;
  if(banner) banner.classList.add('show');
};

window.appCancelMapCompare = function(){
  compareSelection1 = null;
  document.getElementById('mapCompareBanner')?.classList.remove('show');
};

window.appOpenQuiz = function(){ startQuiz(); };
window.appOpenSurprise = function(){ document.getElementById('btnSurprise')?.click(); };
window.appOpenFavs = function(){ renderFavsList(); document.getElementById('favsModal')?.classList.add('show'); };
window.appOpenCompare = function(){ populateCompareSelects(); document.getElementById('compareModal')?.classList.add('show'); };
window.appOpenAbout = function(){ document.getElementById('aboutBackdrop')?.classList.add('show'); };

window.appShareCity = function(id, type){
  const item = type==='il' ? RAW.iller.find(i=>i.id==+id) : RAW.ilceler.find(d=>d.id==+id);
  if(item){
    const res = evalCity(item);
    openShareModal(item, res.score);
  }
};

window.appCopyLink = function(cityName){
  copyInviteLink(cityName);
};

/* ============================================================
   TEMA & TILE LAYERS
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
   FAVORİLERİM MODALI
   ============================================================ */
const favsModal = document.getElementById('favsModal');

function renderFavsList(){
  const container = document.getElementById('favsListContainer');
  if(!container) return;

  if(favorites.size === 0){
    container.innerHTML = '<div style="text-align:center; color:var(--muted); padding:30px;">Henüz kaydedilmiş favori yer bulunmuyor.</div>';
    return;
  }

  let html = '';
  favorites.forEach(key => {
    const [type, idStr] = key.split('_');
    const id = +idStr;
    const item = type === 'il' ? RAW.iller.find(i=>i.id===id) : RAW.ilceler.find(d=>d.id===id);
    if(!item) return;

    const res = evalCity(item);
    const col = colorFor(res.score, res.eligible);
    const sub = type === 'ilce' ? (RAW.iller.find(i=>i.id===item.il_id)?.ad + ' ili') : item.bolge;

    html += `
      <div class="fav-item">
        <div class="fav-item-info">
          <b>${iconSvg(type==='ilce'?'map-pin':'building',14)} ${item.ad}</b>
          <span>${sub} • Uyum: <b style="color:${col}">%${res.score}</b></span>
        </div>
        <div class="fav-item-actions">
          <button class="btn" onclick="goToFav('${type}', ${item.id})">${iconSvg('navigation',13)} Göster</button>
          <button class="pop-btn fav active" onclick="window.appToggleFav(${item.id}, '${type}')">${iconSvg('trash',13)}</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function goToFav(type, id){
  favsModal?.classList.remove('show');
  const item = type === 'il' ? RAW.iller.find(i=>i.id===id) : RAW.ilceler.find(d=>d.id===id);
  if(!item) return;
  if(type === 'ilce'){
    renderIlcelerLazy();
    if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
    map.flyTo([item.lat, item.lng], 10.5, {duration: 0.8});
    setTimeout(()=> openCity(item, 'ilce'), 600);
  } else {
    map.flyTo([item.lat, item.lng], 8, {duration: 0.8});
    setTimeout(()=> openCity(item, 'il'), 600);
  }
}

/* ============================================================
   TEMİZ SLUG DAVET LİNKİ SİSTEMİ (?invite=mugla)
   ============================================================ */
function copyInviteLink(cityName){
  const slug = slugify(cityName);
  const url = `${window.location.origin}${window.location.pathname}?invite=${slug}`;
  navigator.clipboard.writeText(url).then(()=>{
    alert(`✨ Davet bağlantısı kopyalandı:\n\n${url}\n\nArkadaşına göndererek onun da yaşam haritasını keşfetmesini sağlayabilirsin!`);
  }).catch(()=>{
    prompt('Davet bağlantısını kopyalayın:', url);
  });
}

function checkInviteUrl(){
  const params = new URLSearchParams(window.location.search);
  const inviteSlug = params.get('invite') || params.get('share');
  if(!inviteSlug) return;

  const q = inviteSlug.trim().toLowerCase();
  const target = RAW.ilceler.find(d=> slugify(d.ad) === q || d.ad.toLowerCase() === q) || 
                 RAW.iller.find(c=> slugify(c.ad) === q || c.ad.toLowerCase() === q);

  const banner = document.getElementById('inviteBanner');
  const txt = document.getElementById('inviteText');

  if(target){
    if(txt) txt.innerHTML = `${iconSvg('zap',14)} Bir arkadaşın senin için <b>${target.ad}</b> şehrini önerdi! Sen de kendi yaşam alanını keşfet.`;
    if(banner) banner.classList.add('show');

    setTimeout(()=>{
      const type = target.il_id ? 'ilce' : 'il';
      if(type==='ilce'){
        renderIlcelerLazy();
        if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
        map.flyTo([target.lat, target.lng], 10.5, {duration: 1.0});
        setTimeout(()=> openCity(target, 'ilce'), 800);
      } else {
        map.flyTo([target.lat, target.lng], 8.5, {duration: 1.0});
        setTimeout(()=> openCity(target, 'il'), 800);
      }
    }, 500);
  }
}

document.getElementById('inviteClose')?.addEventListener('click', ()=>{
  document.getElementById('inviteBanner')?.classList.remove('show');
});

/* ============================================================
   KAPATILABİLİR POP-UP REKLAM MANTIĞI
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
      { ic: "waves", label: "Masmavi Deniz & İnce Kumlu Sahiller", set: { deniz: 1, denizMesafe: [0, 15] } },
      { ic: "mountain", label: "Yüksek Dağlar & Çam Kokulu Ormanlar", set: { rakim: [400, 2000] } },
      { ic: "building", label: "Büyükşehir Keşmekeşi & Gelişmiş İmkânlar", set: { nufus: [1000, 16000], ulasim: [8, 10], sosyalImkan: [8, 10] } },
      { ic: "compass", label: "Sakin, Yürüyerek Gezilen Şirin Kasaba", set: { nufus: [80, 500], emeklilik: [8, 10] } }
    ]
  },
  {
    title: "2. Sıcaklık ve hava tercihin nasıl?",
    subtitle: "Hangi iklim sana enerji veriyor?",
    options: [
      { ic: "sun", label: "Sıcak & Bol Güneşli (Yaz Tutkunu)", set: { yaz_sicaklik: [26, 35] } },
      { ic: "thermometer", label: "Ilıman, Serin & Dengeli Hava", set: { yillik_sicaklik: [10, 17] } },
      { ic: "cloud-rain", label: "Kar Yağışlı & Soğuk Kış Günleri", set: { kis_sicaklik: [-10, 2], kar_yagisi: [30, 300] } }
    ]
  },
  {
    title: "3. Sosyal Hayat ve Ev Kirası Bütçen?",
    subtitle: "Önceliğin eğlence mi yoksa uygun yaşam gideri mi?",
    options: [
      { ic: "music", label: "Gece Hayatı, Konserler & Öğrenci Şehri", set: { eglence: [7, 10], genclik: [8, 10] } },
      { ic: "home", label: "Makul Ev Kirası & Ekonomik Yaşam", set: { kira: [8, 20] } },
      { ic: "utensils", label: "Gastronomi & Zengin Yemek Kültürü", set: { gastro: [8, 10] } }
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
    <h2>${iconSvg('compass',20)} Ruh Şehrini Bul (${currentQuizStep + 1}/${QUIZ_QUESTIONS.length})</h2>
    <p class="quiz-sub">${q.title}</p>
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-options-grid">
      ${q.options.map((opt, i) => `
        <button class="quiz-opt-btn" data-idx="${i}">
          <span class="ico-svg">${iconSvg(opt.ic, 22)}</span>
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
        <span class="trophy">${iconSvg('zap', 42)}</span>
        <div class="about-badge">Ruh Şehriniz Bulundu!</div>
        <h3>${fullName}</h3>
        <p>Senin yaşam kriterlerinle <b>%${bestScore}</b> mükemmel uyum sağlıyor!</p>
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:20px;">
          <div style="display:flex; gap:10px;">
            <button class="btn active" id="btnQuizGoMap">${iconSvg('navigation',14)} Haritada Göster</button>
            <button class="social-btn insta" id="btnQuizShare">${iconSvg('globe',14)} Hikayede Paylaş</button>
          </div>
          <button class="btn" id="btnQuizInvite" onclick="window.appCopyLink('${bestCity.ad}')">${iconSvg('link',14)} Arkadaşlarını Davet Et</button>
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

/* ============================================================
   2. 🎲 "BENİ ŞAŞIRT!" (FİLTRELERE GÖRE DİNAMİK SÜRPRİZ GARANTİSİ)
   ============================================================ */
document.getElementById('btnSurprise')?.addEventListener('click', ()=>{
  let validList = [...RAW.iller, ...RAW.ilceler].filter(c=> evalCity(c).eligible);
  if(validList.length === 0){
    const scored = [...RAW.iller, ...RAW.ilceler].map(c=> ({ city: c, res: evalCity(c) }));
    scored.sort((a,b)=> b.res.score - a.res.score);
    validList = scored.slice(0, 15).map(s=> s.city);
  }
  if(validList.length === 0) return;

  const target = validList[Math.floor(Math.random() * validList.length)];
  const isIlce = !!target.il_id;
  const type = isIlce ? 'ilce' : 'il';

  if(typeof confetti === 'function'){
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }

  if(isIlce){
    renderIlcelerLazy();
    if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
    const mk = markersIlce[target.id];
    if(mk && !layerIlce.hasLayer(mk)) layerIlce.addLayer(mk);
  } else {
    if(!map.hasLayer(layerIl)) layerIl.addTo(map);
    const mk = markersIl[target.id];
    if(mk && !layerIl.hasLayer(mk)) layerIl.addLayer(mk);
  }

  map.flyTo([target.lat, target.lng], isIlce ? 10.5 : 8.5, {duration: 0.8});

  setTimeout(()=>{
    const mk = isIlce ? markersIlce[target.id] : markersIl[target.id];
    if(mk){
      openCity(target, type);
      mk.openPopup();
      if(mk.getElement()){
        const el = mk.getElement();
        el.classList.add('pulse-surprise');
        setTimeout(()=> el.classList.remove('pulse-surprise'), 4500);
      }
    }
  }, 700);
});

/* ============================================================
   3. 📸 HD 4K TÜRKİYE FOTOĞRAFLI INSTAGRAM STORY KARTI ÜRETİCİSİ
   ============================================================ */
const shareModal = document.getElementById('shareModal');
const shareCanvas = document.getElementById('shareCanvas');

const CITY_PHOTOS = {
  'mugla': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1080&q=80',
  'izmir': 'https://images.unsplash.com/photo-1589139832322-a795764049fa?auto=format&fit=crop&w=1080&q=80',
  'istanbul': 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1080&q=80',
  'antalya': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1080&q=80',
  'amasra': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80',
  'trabzon': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80',
  'nevsehir': 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1080&q=80',
  'bursa': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
  'ankara': 'https://images.unsplash.com/photo-1477959858617-67f30ac72604?auto=format&fit=crop&w=1080&q=80',
  
  'ege': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1080&q=80',
  'akdeniz': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1080&q=80',
  'karadeniz': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80',
  'marmara': 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1080&q=80',
  'ic_anadolu': 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1080&q=80',
  'dogu': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
  'guneydogu': 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1080&q=80',
};

function getCityPhotoUrl(city){
  const slug = slugify(city.ad);
  if(CITY_PHOTOS[slug]) return CITY_PHOTOS[slug];
  return 'assets/story_bg.jpg';
}

function openShareModal(city, score){
  if(!shareModal || !shareCanvas) return;
  shareModal.classList.add('show');

  const ctx = shareCanvas.getContext('2d');
  const w = shareCanvas.width;
  const h = shareCanvas.height;

  const photoUrl = getCityPhotoUrl(city);
  const img = new Image();
  img.crossOrigin = 'anonymous';

  const renderCanvasContent = () => {
    // 1. Arka plan görseli
    ctx.drawImage(img, 0, 0, w, h);

    // 2. Koyu Lüks Degrade Katmanı
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.85)');
    grad.addColorStop(0.35, 'rgba(15, 23, 42, 0.65)');
    grad.addColorStop(0.75, 'rgba(15, 23, 42, 0.90)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.96)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 3. Üst Başlık & Marka
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Yaşam Haritası', w/2, 68);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('Benim Türkiye\'deki Ruh Şehrim', w/2, 98);

    const isIlce = !!city.il_id;
    const ilName = isIlce ? (RAW.iller.find(i=>i.id===city.il_id)?.ad || '') : '';
    const name = isIlce ? `${city.ad}` : city.ad;
    const subName = isIlce ? `${ilName} ili` : (city.bolge || 'Türkiye');

    // 4. Neon Parlayan Uyum Skoru Dairesi
    const centerX = w/2;
    const centerY = 255;
    const radius = 95;

    // Dış Parlama (Neon Halo)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.25)';
    ctx.fill();

    // İç Koyu Daire
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fill();

    // Yeşil Neon Çerçeve
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();

    // Skor Yazısı (%100)
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 56px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`%${score}`, centerX, centerY + 12);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('UYUM SKORU', centerX, centerY + 42);

    // 5. Şehir İsim Başlığı
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 14;
    ctx.fillText(name, w/2, 420);

    ctx.fillStyle = '#93c5fd';
    ctx.font = '700 20px sans-serif';
    ctx.fillText(subName, w/2, 458);

    ctx.shadowBlur = 0;

    // 6. Cam Efektli İstatistik Paneli (Glassmorphic Box)
    const boxX = 36;
    const boxY = 500;
    const boxW = w - 72;
    const boxH = 260;
    const radiusBox = 20;

    ctx.save();
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxW, boxH, radiusBox);
    else ctx.rect(boxX, boxY, boxW, boxH);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 7. İstatistik Metinleri
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px sans-serif';
    ctx.textAlign = 'left';

    const stats = [
      `Ort. Ev Kirası: ₺${city.kira ? (city.kira*1000).toLocaleString('tr-TR') : '18.000'} /ay`,
      `Sosyal İmkânlar: ${city.sosyalImkan || 7}/10`,
      `Gece Hayatı & Eğlence: ${city.eglence || 6}/10`,
      `Ort. Sıcaklık: ${city.yillik_sicaklik || '—'} °C`,
      `Deniz Konumu: ${Number(city.deniz)===1 ? 'Sahil Kıyısında' : (city.denizMesafe+' km uzaklıkta')}`
    ];

    stats.forEach((s, idx) => {
      ctx.fillText(s, boxX + 24, boxY + 45 + (idx * 44));
    });

    // 8. Alt Bilgi / Web Linki
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sen de kendi ruh şehrini keşfet: nexviastudio.com', w/2, 885);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('Nexvia Digital Studio · Batuhan Akcan (@batuhann_akcan)', w/2, 915);
  };

  img.onload = renderCanvasContent;
  img.onerror = () => {
    img.src = 'assets/story_bg.jpg';
  };
  img.src = photoUrl;
}

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
    container.innerHTML = '<div style="text-align:center; color:var(--muted); padding:30px;">Kıyaslamak için 2 şehir seçin veya haritada Karşılaştır butonunu kullanın</div>';
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
          <td class="feature">Ort. Ev Kirası (2+1)</td>
          <td class="${(c1.kira||20)<=(c2.kira||20)?'winner':''}">₺${((c1.kira||20)*1000).toLocaleString('tr-TR')} /ay</td>
          <td class="${(c2.kira||20)<=(c1.kira||20)?'winner':''}">₺${((c2.kira||20)*1000).toLocaleString('tr-TR')} /ay</td>
        </tr>
        <tr>
          <td class="feature">Sosyal İmkânlar</td>
          <td class="${(c1.sosyalImkan||6)>=(c2.sosyalImkan||6)?'winner':''}">${c1.sosyalImkan||6}/10</td>
          <td class="${(c2.sosyalImkan||6)>=(c1.sosyalImkan||6)?'winner':''}">${c2.sosyalImkan||6}/10</td>
        </tr>
        <tr>
          <td class="feature">Gece Hayatı & Eğlence</td>
          <td class="${(c1.eglence||5)>=(c2.eglence||5)?'winner':''}">${c1.eglence||5}/10</td>
          <td class="${(c2.eglence||5)>=(c1.eglence||5)?'winner':''}">${c2.eglence||5}/10</td>
        </tr>
        <tr>
          <td class="feature">Gençlik & Öğrenci Yaşamı</td>
          <td class="${(c1.genclik||6)>=(c2.genclik||6)?'winner':''}">${c1.genclik||6}/10</td>
          <td class="${(c2.genclik||6)>=(c1.genclik||6)?'winner':''}">${c2.genclik||6}/10</td>
        </tr>
        <tr>
          <td class="feature">Gastronomi / Mutfak</td>
          <td class="${(c1.gastro||7)>=(c2.gastro||7)?'winner':''}">${c1.gastro||7}/10</td>
          <td class="${(c2.gastro||7)>=(c1.gastro||7)?'winner':''}">${c2.gastro||7}/10</td>
        </tr>
        <tr>
          <td class="feature">Emeklilik & Huzur</td>
          <td class="${(c1.emeklilik||6)>=(c2.emeklilik||6)?'winner':''}">${c1.emeklilik||6}/10</td>
          <td class="${(c2.emeklilik||6)>=(c1.emeklilik||6)?'winner':''}">${c2.emeklilik||6}/10</td>
        </tr>
        <tr>
          <td class="feature">Yıllık Sıcaklık</td>
          <td>${c1.yillik_sicaklik || '—'} °C</td>
          <td>${c2.yillik_sicaklik || '—'} °C</td>
        </tr>
        <tr>
          <td class="feature">Deniz Kıyısı / Uzaklık</td>
          <td>${Number(c1.deniz)===1 ? 'Evet (Sahil)' : (c1.denizMesafe+' km')}</td>
          <td>${Number(c2.deniz)===1 ? 'Evet (Sahil)' : (c2.denizMesafe+' km')}</td>
        </tr>
        <tr>
          <td class="feature">Rakım</td>
          <td>${c1.rakim || 0} m</td>
          <td>${c2.rakim || 0} m</td>
        </tr>
        <tr>
          <td class="feature">Deprem Riski</td>
          <td>${c1.depremRiski || 3}/5</td>
          <td>${c2.depremRiski || 3}/5</td>
        </tr>
      </tbody>
    </table>
  `;
}

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
    checkInviteUrl();
    bar.style.width = '100%';
    setTimeout(()=>{ document.getElementById('loader').classList.remove('active'); bar.style.width='0'; }, 400);
  } catch(e){
    document.getElementById('filters').innerHTML = `<div style="text-align:center;color:var(--bad);padding:30px;font-size:12px;">
      ${iconSvg('alert',18)}<br>Veri yüklenemedi.<br><code style="font-size:10px">${e.message}</code></div>`;
  }
}

/* ---- türetilmiş değerler & 81 İL ALTYAPI ENDEKSLERİ ---- */
const KIYI_NOKTALARI = [
  [41.87,27.98],[41.63,28.08],[41.40,28.25],[41.28,28.80],[41.20,29.10],[41.18,29.61],[41.14,30.30],[41.10,30.70],
  [41.08,31.12],[41.28,31.41],[41.46,31.79],[41.64,32.34],[41.74,32.39],[41.84,32.71],[41.90,33.00],[41.97,33.76],
  [41.98,34.02],[42.02,35.15],[41.85,35.25],[41.62,35.90],[41.29,36.33],[41.20,36.70],[41.13,37.28],[41.03,37.50],
  [40.98,37.88],[40.91,38.39],[41.00,39.72],[41.02,40.52],[41.40,41.43],[41.48,41.52],
  [41.24,29.12],[41.05,29.00],[40.85,29.20],[40.75,29.40],[40.76,29.93],[40.73,30.05],
  [40.70,29.85],[40.66,29.27],[40.52,29.05],[40.42,28.70],[40.40,27.40],[40.35,26.70],[40.15,26.41],[40.02,26.30],[39.80,26.15],
  [39.55,26.65],[39.53,26.12],[39.31,26.69],[39.07,26.88],[38.85,26.85],[38.67,26.75],[38.42,27.14],[38.32,26.30],
  [38.20,26.84],[37.86,27.26],[37.65,27.35],[37.37,27.26],[37.03,27.43],[36.72,27.68],[36.85,28.27],[36.62,29.11],
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

  // Metropol ve Özel Üniversite Şehirleri
  const SPECIAL = {
    34: { sosyalImkan:10, eglence:10, genclik:10, emeklilik:4, gastro:10, kira:38, maliyet:9, saglik:10, egitim:10 }, // İstanbul
    6:  { sosyalImkan:9,  eglence:8,  genclik:9,  emeklilik:6, gastro:8,  kira:24, maliyet:8, saglik:10, egitim:10 }, // Ankara
    35: { sosyalImkan:9,  eglence:9,  genclik:9,  emeklilik:8, gastro:9,  kira:26, maliyet:8, saglik:9,  egitim:9  }, // İzmir
    7:  { sosyalImkan:8,  eglence:9,  genclik:9,  emeklilik:9, gastro:9,  kira:28, maliyet:8, saglik:8,  egitim:8  }, // Antalya
    26: { sosyalImkan:9,  eglence:9,  genclik:10, emeklilik:7, gastro:7,  kira:16, maliyet:6, saglik:8,  egitim:9  }, // Eskişehir
    48: { sosyalImkan:7,  eglence:9,  genclik:7,  emeklilik:10,gastro:8,  kira:32, maliyet:9, saglik:7,  egitim:7  }, // Muğla
    16: { sosyalImkan:8,  eglence:7,  genclik:8,  emeklilik:7, gastro:9,  kira:20, maliyet:7, saglik:9,  egitim:8  }, // Bursa
    27: { sosyalImkan:7,  eglence:6,  genclik:8,  emeklilik:6, gastro:10, kira:18, maliyet:7, saglik:8,  egitim:8  }, // Gaziantep
    31: { sosyalImkan:6,  eglence:5,  genclik:7,  emeklilik:7, gastro:10, kira:15, maliyet:6, saglik:7,  egitim:7  }, // Hatay
    1:  { sosyalImkan:7,  eglence:7,  genclik:8,  emeklilik:6, gastro:10, kira:18, maliyet:7, saglik:8,  egitim:8  }, // Adana
    33: { sosyalImkan:7,  eglence:7,  genclik:8,  emeklilik:8, gastro:9,  kira:19, maliyet:7, saglik:8,  egitim:7  }, // Mersin
    55: { sosyalImkan:7,  eglence:7,  genclik:8,  emeklilik:7, gastro:8,  kira:16, maliyet:6, saglik:8,  egitim:8  }, // Samsun
    61: { sosyalImkan:6,  eglence:6,  genclik:7,  emeklilik:7, gastro:9,  kira:17, maliyet:6, saglik:8,  egitim:8  }, // Trabzon
  };

  RAW.iller.forEach(c=>{
    c.depremRiski = DEPREM[c.id] || 3;
    c.daglik = c.rakim!=null ? Math.min(10, Math.round(c.rakim/200)) : null;
    c.denizMesafe = denizMesafe(c.lat, c.lng);
    if (c.deniz === 1 && c.denizMesafe > 15) c.denizMesafe = 5;
    c.deniz = Number(c.deniz !== undefined ? c.deniz : (c.denizMesafe <= 15 ? 1 : 0));
    if (c.canli) { c.nem = c.canli.nem; c.aqi = c.canli.aqi; }

    const sp = SPECIAL[c.id];
    if (sp) {
      Object.assign(c, sp);
    } else {
      const isCoast = c.deniz === 1;
      const isBig = c.nufus > 500000;
      c.sosyalImkan = Math.min(9, Math.max(3, Math.round(Math.log10(c.nufus/1000+1)*2.2)));
      c.eglence = Math.min(9, Math.max(2, Math.round(c.sosyalImkan * (isCoast?1.2:0.9))));
      c.genclik = Math.min(9, Math.max(3, Math.round(c.sosyalImkan * 0.95)));
      c.emeklilik = Math.min(10, Math.max(4, Math.round(10 - (c.nufus/2000000) + (isCoast?2:0))));
      c.gastro = Math.min(9, Math.max(4, Math.round(5 + (c.nufus/400000))));
      c.kira = Math.min(35, Math.max(8, Math.round(10 + (c.nufus/200000) + (isCoast?6:0))));
      c.maliyet = Math.min(9, Math.max(3, Math.round(4 + (c.kira/6))));
      c.saglik = Math.min(9, Math.max(3, Math.round(4 + (c.nufus/300000))));
      c.egitim = Math.min(9, Math.max(3, Math.round(4 + (c.nufus/350000))));
    }

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
    d.deniz = Number(d.deniz !== undefined ? d.deniz : (d.denizMesafe <= 15 ? 1 : 0));
    if (d.deniz === 1 && d.denizMesafe > 15) d.denizMesafe = 3;
    if (d.canli) { d.nem = d.canli.nem; d.aqi = d.canli.aqi; }

    d.sosyalImkan = il.sosyalImkan || 5;
    d.eglence = il.eglence || 4;
    d.genclik = il.genclik || 5;
    d.emeklilik = il.emeklilik || 7;
    d.gastro = il.gastro || 6;
    d.kira = Math.max(8, (il.kira || 15) - 2);
    d.maliyet = il.maliyet || 5;
    d.saglik = il.saglik || 5;
    d.egitim = il.egitim || 5;
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
  if(unit==='bin'){
    if(v >= 1000000) return (v / 1000000).toFixed(1) + ' Milyon';
    if(v >= 1000) return (v / 1000).toFixed(1) + ' Bin';
    return (v).toLocaleString('tr-TR') + ' kişi';
  }
  if(typeof v === 'number' && v >= 1000000) return (v / 1000000).toFixed(1) + ' M';
  if(typeof v === 'number' && v >= 1000) return (v / 1000).toFixed(1) + 'K';
  return v + (unit? ' '+unit : '');
}

function fmtRange(f){
  const lo = state[f.key].min, hi = state[f.key].max;
  if(f.log) return fmtNum(lo*1000,'bin')+' – '+fmtNum(hi*1000,'bin');
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
  wireFilterTabs();
}

function wireFilterTabs(){
  const tabContainer = document.getElementById('filterTabBar');
  if(!tabContainer) return;

  tabContainer.querySelectorAll('.filter-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      const grpTarget = tab.dataset.grp;
      tabContainer.querySelectorAll('.filter-tab').forEach(x=>x.classList.remove('active'));
      tab.classList.add('active');

      const filterCont = document.getElementById('filters');
      if(!filterCont) return;

      filterCont.querySelectorAll('.grp').forEach(grp=>{
        const label = grp.querySelector('.label')?.textContent.trim();
        if(grpTarget === 'all' || label === grpTarget){
          grp.style.display = 'block';
          if(grpTarget !== 'all') grp.classList.add('open');
        } else {
          grp.style.display = 'none';
        }
      });
    });
  });
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
        setRangeVal('denizMesafe', 0, 15);
        setRangeVal('yaz_sicaklik', 25, 35);
      } else if(p === 'nature_cool'){
        setRangeVal('rakim', 400, 2000);
        setRangeVal('gunes_suresi', 2200, 4000);
      } else if(p === 'metropolis'){
        setRangeVal('nufus', 1000, 16000);
        setRangeVal('internet', 60, 100);
        setRangeVal('sosyalImkan', 8, 10);
      } else if(p === 'peace_safety'){
        setRangeVal('depremRiski', 0, 3);
        setRangeVal('nufus', 80, 800);
        setRangeVal('emeklilik', 8, 10);
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
   SERT FİLTRE ELEME & DARBOĞAZLI (BOTTLENECK) KUSURSUZ PUANLAMA
   ============================================================ */
function evalCity(c){
  const cityDeniz = Number(c.deniz);

  // HARD CONSTRAINT #1: Deniz Kenarı Kesin Şartı
  if (state['deniz'] === 1 && cityDeniz !== 1) {
    return { score: 0, passed: 0, activeFilters: 1, eligible: false, reasons: ['Deniz kenarı değil'] };
  }
  if (state['deniz'] === 2 && cityDeniz === 1) {
    return { score: 0, passed: 0, activeFilters: 1, eligible: false, reasons: ['Deniz kenarı'] };
  }

  // HARD CONSTRAINT #2: Bölge Kesin Şartı
  if (state['bolge'] && state['bolge'].size < 7 && !state['bolge'].has(c.bolge)) {
    return { score: 0, passed: 0, activeFilters: 1, eligible: false, reasons: ['Bölge dışı'] };
  }

  let activeFilters = 0;
  let totalRatio = 0;
  let minRatio = 1.0;
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

      let ratio = 1.0;
      if(v >= st.min && v <= st.max){
        ratio = 1.0;
      } else {
        const span = Math.max(1, f.max - f.min);
        const diff = v < st.min ? (st.min - v) : (v - st.max);
        const penalty = Math.min(1, diff / (span * 0.15));
        ratio = Math.max(0, 1 - penalty);
        if(ratio < 0.7) reasons.push(f.label);
      }
      totalRatio += ratio;
      if(ratio < minRatio) minRatio = ratio;

    } else if(f.type==='tri'){
      if(f.key==='deniz') return;
      if(state[f.key]===0) return;
      activeFilters++;
      const want = state[f.key]===1?1:0;
      const ratio = (cityDeniz === want) ? 1.0 : 0.0;
      if(ratio < 0.7) reasons.push(f.label);
      totalRatio += ratio;
      if(ratio < minRatio) minRatio = ratio;

    } else if(f.type==='checks'){
      if(f.key==='bolge') return;
      const st=state[f.key];
      if(st.size===f.opts.length) return;
      activeFilters++;
      const ratio = st.has(c[f.key]) ? 1.0 : 0.0;
      if(ratio < 0.7) reasons.push(f.label);
      totalRatio += ratio;
      if(ratio < minRatio) minRatio = ratio;
    }
  }));

  if (activeFilters === 0) {
    return { score: 100, passed: 0, activeFilters: 0, eligible: true, reasons: [] };
  }

  const avgRatio = totalRatio / activeFilters;
  const weightedRatio = avgRatio * Math.pow(minRatio, 0.45);
  const score = Math.round(weightedRatio * 100);
  const eligible = (score >= 70 && minRatio >= 0.35);

  return {score, passed: Math.round(totalRatio), activeFilters, eligible, reasons};
}

function colorFor(score, eligible, isFav){
  if (favOnlyMode && isFav) return '#ec4899';
  if(strictMode && !eligible) return '#64748b';
  if(score>=85) return '#16a34a';
  if(score>=75) return '#84cc16';
  if(score>=70) return '#eab308';
  return '#94a3b8';
}

/* ============================================================
   HARİTA MARKER RENDERİ
   ============================================================ */
const layerIl = L.layerGroup().addTo(map);
const layerIlce = L.layerGroup().addTo(map);

function renderCityMarkerHtml(c, res){
  const isFav = favorites.has(`il_${c.id}`);
  const col = colorFor(res.score, res.eligible, isFav);
  const op = (!strictMode || res.eligible || (favOnlyMode && isFav)) ? 1 : 0;
  const extraClass = (favOnlyMode && isFav) ? 'fav-marker-cool' : '';

  if (labelMode === 'full') {
    return `<div class="city-marker-cool ${extraClass}" style="border-left-color:${col}; opacity:${op}; display:${(res.eligible || !strictMode || (favOnlyMode && isFav)) ? 'inline-flex':'none'}">${c.ad} <span class="cool-score" style="color:${col}">%${res.score}</span></div>`;
  }
  const size = Math.max(16, Math.min(34, Math.round(Math.log10((c.nufus||50000)/1000)*10)));
  return `<div class="city-marker ${extraClass}" style="width:${size}px;height:${size}px;font-size:${Math.max(8,size/2.5)}px;background:${col};opacity:${op};display:${(res.eligible || !strictMode || (favOnlyMode && isFav)) ? 'flex':'none'}">${c.ad[0]}</div>`;
}

function renderIlceMarkerHtml(d, res){
  const isFav = favorites.has(`ilce_${d.id}`);
  const col = colorFor(res.score, res.eligible, isFav);
  const op = (!strictMode || res.eligible || (favOnlyMode && isFav)) ? 0.95 : 0;
  const extraClass = (favOnlyMode && isFav) ? 'fav-marker-cool' : '';

  if (labelMode === 'full') {
    return `<div class="ilce-marker-cool ${extraClass}" style="opacity:${op}; display:${(res.eligible || !strictMode || (favOnlyMode && isFav)) ? 'inline-flex':'none'}"><span class="cool-dot" style="background:${col}"></span>${d.ad}</div>`;
  }
  return `<div class="city-marker ilce ${extraClass}" style="width:10px;height:10px;background:${col};opacity:${op};font-size:7px;display:${(res.eligible || !strictMode || (favOnlyMode && isFav)) ? 'flex':'none'}">${d.ad[0]}</div>`;
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
   VIEWPORT BOUNDS SÜZGEÇLİ VE FAVORİLER MODU KATMAN GÜNCELLEMESİ
   ============================================================ */
function updateLayers(){
  const z = map.getZoom();
  const note = document.getElementById('layerNote');
  let showIl, showIlce;

  if (favOnlyMode) {
    if(!map.hasLayer(layerIl)) layerIl.addTo(map);
    renderIlcelerLazy();
    if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
    note.textContent = 'sadece favorileriniz gösteriliyor';

    RAW.iller.forEach(c => {
      const mk = markersIl[c.id];
      const isFav = favorites.has(`il_${c.id}`);
      if(mk){
        if(isFav) { if(!layerIl.hasLayer(mk)) layerIl.addLayer(mk); }
        else { if(layerIl.hasLayer(mk)) layerIl.removeLayer(mk); }
      }
    });

    RAW.ilceler.forEach(d => {
      const mk = markersIlce[d.id];
      const isFav = favorites.has(`ilce_${d.id}`);
      if(mk){
        if(isFav) { if(!layerIlce.hasLayer(mk)) layerIlce.addLayer(mk); }
        else { if(layerIlce.hasLayer(mk)) layerIlce.removeLayer(mk); }
      }
    });
    return;
  }

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

  if (!favOnlyMode && showIl) {
    RAW.iller.forEach(c => {
      const mk = markersIl[c.id];
      const res = evalCity(c);
      if(mk && (res.eligible || !strictMode)) {
        if(!layerIl.hasLayer(mk)) layerIl.addLayer(mk);
      }
    });
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
   POPUP (KAPSAMLI ALTYAPI & SOSYAL İSTATİSTİKLER)
   ============================================================ */
function popupHtml(c, res, type){
  const isFav = favorites.has(`${type}_${c.id}`);
  const col=colorFor(res.score,res.eligible, isFav);
  const ilAdi = type==='ilce' ? (RAW.iller.find(i=>i.id===c.il_id)?.ad || '') : c.ad;
  const baslik = type==='ilce' ? `${c.ad}` : c.ad;
  const altBaslik = type==='ilce' ? `${ilAdi} ili` : c.bolge;
  const live = c.canli;
  const liveBadge = live ? `<span class="fresh-badge ${live.age_h>6?'stale':''}">${iconSvg('droplet',11)} ${live.nem}% • AQI ${live.aqi} · ${live.age_h}sa önce</span>` : '';

  const grid = [
    ['Ort. Kira (2+1)', c.kira? ('₺'+(c.kira*1000).toLocaleString('tr-TR')) : '—', 'home'],
    ['Sosyal İmkân', c.sosyalImkan!=null? c.sosyalImkan+'/10' : '—', 'music'],
    ['Gece / Eğlence', c.eglence!=null? c.eglence+'/10' : '—', 'coffee'],
    ['Gençlik Yaşamı', c.genclik!=null? c.genclik+'/10' : '—', 'smile'],
    ['Mutfak / Gastro', c.gastro!=null? c.gastro+'/10' : '—', 'utensils'],
    ['Emeklilik', c.emeklilik!=null? c.emeklilik+'/10' : '—', 'sun'],
    ['Nüfus', c.nufus? fmtNum(c.nufus,'bin') : '—', 'users'],
    ['Deniz Kıyısı', Number(c.deniz)===1? 'Evet (Sahil)' : (c.denizMesafe+' km'), 'waves'],
    ['Yıllık sıc.', c.yillik_sicaklik!=null? c.yillik_sicaklik+' °C' : '—', 'thermometer'],
    ['Kış / Yaz', (c.kis_sicaklik!=null?c.kis_sicaklik:'?')+'° / '+(c.yaz_sicaklik!=null?c.yaz_sicaklik+'°':'?'), 'thermometer'],
    ['Sağlık', c.saglik!=null? c.saglik+'/10' : '—', 'heart'],
    ['Deprem', c.depremRiski!=null? c.depremRiski+'/5' : '—', 'activity'],
  ].map(r=>`<div><span class="k">${iconSvg(r[2],13)} ${r[0]}</span><b>${r[1]}</b></div>`).join('');

  return `<div class="pop">
    <h3>
      <span class="pop-title-left">${iconSvg(type==='ilce'?'map-pin':'building',15)} ${baslik}</span>
      <div class="pop-actions-top">
        <button class="pop-btn fav ${isFav?'active':''}" onclick="window.appToggleFav(${c.id}, '${type}')" title="Favorilere Ekle/Çıkar">${iconSvg('heart',13)}</button>
        <button class="pop-btn cmp" onclick="window.appStartMapCompare(${c.id}, '${type}')" title="Bu Şehri Karşılaştır">${iconSvg('activity',13)} ⚖️</button>
        <button class="pop-btn share" onclick="window.appCopyLink('${c.ad}')" title="Davet Bağlantısını Kopyala">${iconSvg('link',13)} Link</button>
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
  if(compareSelection1 && (compareSelection1.id !== c.id || compareSelection1.type !== type)){
    const item1Val = `${compareSelection1.type}_${compareSelection1.id}`;
    const item2Val = `${type}_${c.id}`;

    window.appCancelMapCompare();

    populateCompareSelects();
    if(compSelect1) compSelect1.value = item1Val;
    if(compSelect2) compSelect2.value = item2Val;

    renderCompareTable();
    compareModal?.classList.add('show');
    return;
  }

  const mk = type==='il' ? markersIl[c.id] : markersIlce[c.id];
  if(!mk) return;

  if(type==='ilce'){
    renderIlcelerLazy();
    if(!map.hasLayer(layerIlce)) layerIlce.addTo(map);
    if(!layerIlce.hasLayer(mk)) layerIlce.addLayer(mk);
  } else {
    if(!map.hasLayer(layerIl)) layerIl.addTo(map);
    if(!layerIl.hasLayer(mk)) layerIl.addLayer(mk);
  }

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

  RAW.iller.forEach(c=>{
    const res=evalCity(c);
    const mk=markersIl[c.id];
    if(!mk) return;
    mk.setIcon(L.divIcon({className:'', html: renderCityMarkerHtml(c, res)}));
    mk.setTooltipContent(`${c.ad} (%${res.score})`);
    if(res.eligible) matchCount++;
    if(res.eligible && res.score>=85) bestCount++;
  });

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
   CANLI İL VE İLÇE ARAMA
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

  const filterAndSort = (list) => {
    const starts = [];
    const includes = [];
    list.forEach(item => {
      const name = item.ad.toLowerCase();
      if (name.startsWith(q)) starts.push(item);
      else if (name.includes(q)) includes.push(item);
    });
    return [...starts, ...includes];
  };

  const sortedIlceler = filterAndSort(RAW.ilceler).slice(0, 6);
  const sortedIller = filterAndSort(RAW.iller).slice(0, 4);

  if(sortedIlceler.length === 0 && sortedIller.length === 0){
    searchResults.innerHTML = `<div class="search-item" style="color:var(--muted);justify-content:center;">Sonuç bulunamadı</div>`;
    searchResults.classList.add('active');
    return;
  }

  let html = '';

  sortedIlceler.forEach(d=>{
    const il = RAW.iller.find(i=> i.id === d.il_id);
    const res = evalCity(d);
    const col = colorFor(res.score, res.eligible);
    html += `<div class="search-item" data-type="ilce" data-id="${d.id}">
      <div>
        <div class="item-title">${iconSvg('map-pin',14)} ${d.ad}</div>
        <div class="item-sub">${il ? il.ad+' ili' : ''}</div>
      </div>
      <b style="color:${col}">%${res.score}</b>
    </div>`;
  });

  sortedIller.forEach(c=>{
    const res = evalCity(c);
    const col = colorFor(res.score, res.eligible);
    html += `<div class="search-item" data-type="il" data-id="${c.id}">
      <div>
        <div class="item-title">${iconSvg('building',14)} ${c.ad} (İl)</div>
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
  favOnlyMode = false;
  document.getElementById('btnShowFavs')?.classList.remove('active');
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

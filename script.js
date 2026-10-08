const products = [
  {"id":"term-0-6","stage":"Product 01","age":"0–6 Months","name":"Term Infant Formula","short":"Infant formula for use in the absence of breast milk, supporting proper growth and development from birth to 6 months.","description":"A term infant formula positioned for babies from 0–6 months when breast milk is unavailable. The source website describes it as intended to provide proper growth and development during this early stage.","image":"","features":["0–6 months","Term infant formula","Growth & development support"],"color":"#e8f4f8"},
  {"id":"follow-6-12","stage":"Product 02","age":"6–12 Months","name":"Term Follow-up Formula","short":"Follow-up formula for infants 6–12 months, designed to support immunity and strength during the next stage of growth.","description":"A term follow-up formula for the 6–12 month stage. The source website describes the product as supporting immunity and strength as the infant progresses through this stage.","image":"","features":["6–12 months","Follow-up formula","Immunity & strength support"],"color":"#fff0e6"},
  {"id":"follow-12-24","stage":"Product 03","age":"12–24 Months","name":"Follow-up Formula","short":"Follow-up nutrition for children 12–24 months, focused on overall development.","description":"A follow-up formula for children from 12–24 months. The source website describes it as supporting overall development during the toddler stage.","image":"","features":["12–24 months","Follow-up formula","Overall development support"],"color":"#e6f6f5"},
  {"id":"gi-specialised","stage":"Product 04","age":"0–24 Months","name":"Specialised GI Formula","short":"Specialised formula for gastrointestinal and diarrhoea-related conditions in infants from 0–24 months.","description":"A specialised infant formula intended for gastrointestinal and diarrhoea-related conditions. The source website lists the applicable age range as 0–24 months.","image":"","features":["0–24 months","Specialised formula","GI & diarrhoea support"],"color":"#edf7f5"},
  {"id":"low-birth-weight","stage":"Product 05","age":"Preterm / Low Birth Weight","name":"Low Birth Weight Infant Formula","short":"Specialised nutrition for low-birth-weight and preterm infants, supporting faster growth of developing organs.","description":"A low birth weight infant formula described by the source website for preterm infants, with the stated purpose of supporting faster growth of developing organs.","image":"","features":["Low birth weight","Preterm infants","Growth support"],"color":"#f1f5fb"},
  
  {"id":"aai-lact-400","stage":"AAi-lact","age":"400 gm pack","name":"AAi-lact","packSize":"400 gm","short":"AAi-lact product pack in the 400 gm size.","description":"AAi-lact product pack, 400 gm. Refer to the product packaging for ingredients, preparation instructions, and approved use information.","features":["AAi-lact","400 gm pack"],"color":"#e6f6f2","artwork":true},
  {"id":"aai-lact-200","stage":"AAi-lact","age":"200 gm pack","name":"AAi-lact","packSize":"200 gm","short":"AAi-lact product pack in the 200 gm size.","description":"AAi-lact product pack, 200 gm. Refer to the product packaging for ingredients, preparation instructions, and approved use information.","features":["AAi-lact","200 gm pack"],"color":"#fff0e6","artwork":true}
];
const grid = document.getElementById('productGrid');

function renderProducts(){
  grid.innerHTML = products.map(p => `
    <article class="product-card" role="button" tabindex="0" onclick="openProduct('${p.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProduct('${p.id}')}">
      <div class="product-top" style="--cardbg:${p.color}">
        <span class="stage">${p.stage} · ${p.age}</span>
        <span class="arrow">↗</span>
        ${p.artwork ? `<div class="pack-art" aria-hidden="true"><span>AAi-lact</span><small>${escapeHtml(p.packSize)}</small></div>` : `<img src="${p.image}" alt="${escapeHtml(p.name)}" onerror="this.style.display='none'">`}
      </div>
      <div class="product-body">
        <h3>${escapeHtml(p.name)}</h3>
        <div class="age">${escapeHtml(p.age)}</div>
        <p>${escapeHtml(p.short)}</p>
        <div class="chips">${p.features.map(f=>`<span class="chip">${escapeHtml(f)}</span>`).join('')}</div>
        ${p.packSize ? `<div class="weight-row"><span class="weight-label">Pack size:</span><span class="weight">${escapeHtml(p.packSize)}</span></div>` : ''}
      </div>
    </article>`).join('');
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function openProduct(id){
  showProduct(id);
  history.pushState({product:id},'',`#product/${id}`);
  window.scrollTo({top:0,behavior:'smooth'});
}
function showProduct(id){
  const p=products.find(x=>x.id===id);
  if(!p)return false;
  document.querySelector('.home').classList.add('hidden');
  document.getElementById('detail').classList.add('active');
  const detailImage=document.getElementById('detailImage');
  const detailPackArt=document.getElementById('detailPackArt');
  detailImage.hidden=Boolean(p.artwork);
  detailPackArt.hidden=!p.artwork;
  if(p.artwork){
    detailPackArt.innerHTML=`<span>AAi-lact</span><small>${escapeHtml(p.packSize)}</small>`;
  } else {
    detailImage.src=p.image;
    detailImage.alt=p.name;
  }
  document.getElementById('detailStage').textContent=p.stage;
  document.getElementById('detailAge').textContent=p.age;
  document.getElementById('detailName').textContent=p.name;
  document.getElementById('detailDescription').textContent=p.description;
  document.getElementById('detailFeatures').innerHTML=p.features.map(f=>`<li>✓ &nbsp;${escapeHtml(f)}</li>`).join('');
  const weightBox=document.querySelector('.detail-weight-box');
  weightBox.hidden=!p.packSize;
  document.getElementById('detailWeights').innerHTML=p.packSize ? `<span class="detail-weight">${escapeHtml(p.packSize)}</span>` : '';
  return true;
}
function goHome(){
  document.getElementById('detail').classList.remove('active');
  document.querySelector('.home').classList.remove('hidden');
  history.pushState({},'', '#home');
  window.scrollTo({top:0,behavior:'smooth'});
}
function route(){
  const match=location.hash.match(/^#product\/(.+)$/);
  if(match){
    if(!showProduct(match[1])){
      document.getElementById('detail').classList.remove('active');
      document.querySelector('.home').classList.remove('hidden');
    }
  } else {
    document.getElementById('detail').classList.remove('active');
    document.querySelector('.home').classList.remove('hidden');
  }
}
window.addEventListener('popstate',route);
window.addEventListener('hashchange',route);
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.navlinks').classList.remove('mobile-open')));
document.getElementById('year').textContent=new Date().getFullYear();
renderProducts(); route();

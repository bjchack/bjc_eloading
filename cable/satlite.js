let satlitePromos = [];
const satliteLogo = 'icons/satlite.png';

// Load Satellite promos
function loadSatlite() {
  const providersDiv = document.getElementById('providers');
  
  providersDiv.innerHTML = `
    <h3 style="text-align:center; margin-bottom:15px;">Satellite Promos</h3>
    <div style="margin-bottom:15px;">
      <input id="searchSatlite" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterSatlitePromos()">
    </div>
    <div id="promoCards" style="display:grid; grid-template-columns:1fr; gap:10px;">Loading promos...</div>
    <button onclick="location.reload()" 
      style="margin-top:15px; padding:8px 12px; border:none; border-radius:6px; background:#444; color:white; cursor:pointer;">
      ⬅ Back
    </button>
  `;

  fetch("eload/json/satlite.json")
    .then(res => res.json())
    .then(data => {
      satlitePromos = data;
      displaySatlitePromos(satlitePromos);
    })
    .catch(err => {
      const promoDiv = document.getElementById('promoCards');
      promoDiv.innerHTML = "Failed to load promos";
      console.error("Satlite JSON ERROR:", err);
    });
}

// Display helper
function displaySatlitePromos(promos){
  const promoDiv = document.getElementById('promoCards');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '10px';
    card.style.background = '#1e1e1e';
    card.style.borderRadius = '8px';
    card.style.textAlign = 'center';
    card.style.boxShadow = '0 0 6px black';

    card.innerHTML = `
      <img src="${satliteLogo}" alt="${p.code}" style="width:50px; height:50px; object-fit:contain; margin-bottom:8px;">
      <div style="font-weight:bold; margin-bottom:4px;">${p.code}</div>
      <div style="font-size:14px; color:#ccc; margin-bottom:4px;">${p.desc}</div>
      <div style="color:#00ff9d; font-weight:bold; margin-bottom:4px;">P${p.price}</div>
      <div style="font-size:13px; color:#ccc; margin-bottom:8px;">Duration: ${p.days}</div>
      <button class="send-btn" onclick="openSatliteModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" 
        style="padding:6px 12px; border:none; border-radius:4px; background:#ff9800; color:black; cursor:pointer;">
        Select
      </button>
    `;
    promoDiv.appendChild(card);
  });
}

// Filter/search function
function filterSatlitePromos(){
  const query = document.getElementById('searchSatlite').value.toLowerCase();
  const filtered = satlitePromos.filter(p => 
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displaySatlitePromos(filtered);
}

// Open modal function specific sa Satellite
function openSatliteModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = '8724'; // example gateway
  document.getElementById('promoModal').style.display = 'flex';
}
let cignalPromos = [];
const cignalLogo = 'icons/cignal.png';

// Load Cignal promos
function loadCignal() {
  const providersDiv = document.getElementById('providers');

  providersDiv.innerHTML = `
    <h3 style="text-align:center; margin-bottom:15px;">Cignal Promos</h3>

    <div style="margin-bottom:15px;">
      <input id="searchCignal" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterCignalPromos()">
    </div>

    <div id="promoCards" style="display:grid; grid-template-columns:1fr; gap:10px;">Loading promos...</div>

    <button onclick="location.reload()" 
      style="margin-top:15px; padding:8px 12px; border:none; border-radius:6px; background:#444; color:white; cursor:pointer;">
      ⬅ Back
    </button>
  `;

  // fetch JSON using fetch()
  fetch("eload/json/cignal.json")
    .then(res => res.json())
    .then(data => {
      cignalPromos = data;
      displayCignalPromos(cignalPromos);
    })
    .catch(err => {
      const promoDiv = document.getElementById('promoCards');
      promoDiv.innerHTML = "Failed to load promos";
      console.error("Cignal JSON ERROR:", err);
    });
}

// Display helper
function displayCignalPromos(promos){
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
      <img src="${cignalLogo}" alt="${p.code}" style="width:50px; height:50px; object-fit:contain; margin-bottom:8px;">
      <div style="font-weight:bold; margin-bottom:4px;">${p.code}</div>
      <div style="font-size:14px; color:#ccc; margin-bottom:4px;">${p.desc}</div>
      <div style="color:#00ff9d; font-weight:bold; margin-bottom:4px;">P${p.price}</div>
      <div style="font-size:13px; color:#ccc; margin-bottom:8px;">Duration: ${p.days}</div>
      <button class="send-btn" onclick="openCignalModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" 
        style="padding:6px 12px; border:none; border-radius:4px; background:#ff9800; color:black; cursor:pointer;">
        Select
      </button>
    `;
    promoDiv.appendChild(card);
  });
}

// Filter/search
function filterCignalPromos(){
  const query = document.getElementById('searchCignal').value.toLowerCase();
  const filtered = cignalPromos.filter(p => 
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displayCignalPromos(filtered);
}

// Open modal function (Cignal specific)
function openCignalModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = '8724'; // Cignal gateway
  document.getElementById('promoModal').style.display = 'flex';
}
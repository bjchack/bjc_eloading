// globeathome.js

let globeAtHomePromos = [];

// Load Globe At Home promos + manual load
function loadGlobeAtHome() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>Globe At Home Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="globeAtHomeAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualGlobeAtHomeLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchGlobeAtHome" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterGlobeAtHomePromos()">
    </div>

    <div id="globeAtHomePromos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('globeAtHomePromos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/globeathome.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    globeAtHomePromos = JSON.parse(xhr.responseText);
    displayGlobeAtHomePromos(globeAtHomePromos);

  }

};

xhr.send(null);
}

// Display promos helper
function displayGlobeAtHomePromos(promos) {
  const promoDiv = document.getElementById('globeAtHomePromos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/globehome.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>

      <button onclick="openGlobeAtHomeModal('${p.code}', 'N/A', '${p.days}', '${p.desc}')" class="send-btn">
        Select
      </button>
    `;

    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterGlobeAtHomePromos() {
  const query = document.getElementById('searchGlobeAtHome').value.toLowerCase();

  const filtered = globeAtHomePromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  displayGlobeAtHomePromos(filtered);
}

// manual regular load
function manualGlobeAtHomeLoad() {
  const amount = document.getElementById("globeAtHomeAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openGlobeAtHomeModal(amount, 'N/A', "0", "Regular Load");
}

// Globe At Home modal function
function openGlobeAtHomeModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: ${price === 'N/A' ? 'Check Gateway' : 'P' + price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';

  document.getElementById('promoModal').style.display = 'flex';
}
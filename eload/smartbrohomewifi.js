// smartbrohomewifi.js

let smartHomeWifiPromos = [];

// Load Smart Home Wifi promos + manual load
function loadSmartHomeWifi() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>Smart Home Wifi Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="smartHomeAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualSmartHomeLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchSmartHome" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterSmartHomePromos()">
    </div>

    <div id="smartHomePromos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('smartHomePromos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/smartbrohomewifi.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    smartHomePromos = JSON.parse(xhr.responseText);
    displaySmartHomePromos(smartHomePromos);

  }

};

xhr.send(null);
}

// Display promos helper
function displaySmartHomePromos(promos) {
  const promoDiv = document.getElementById('smartHomePromos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/smart.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>

      <button onclick="openSmartHomeModal('${p.code}', 'N/A', '${p.days}', '${p.desc}')" class="send-btn">
        Select
      </button>
    `;

    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterSmartHomePromos() {
  const query = document.getElementById('searchSmartHome').value.toLowerCase();

  const filtered = smartHomeWifiPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  displaySmartHomePromos(filtered);
}

// Manual regular load
function manualSmartHomeLoad() {
  const amount = document.getElementById("smartHomeAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openSmartHomeModal(amount, 'N/A', "0", "Regular Load");
}

// Smart Home Wifi modal function
function openSmartHomeModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: ${price === 'N/A' ? 'Check Gateway' : 'P' + price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';

  document.getElementById('promoModal').style.display = 'flex';
}
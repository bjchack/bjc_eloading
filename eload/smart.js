// smart.js

let smartPromos = [];

// Load Smart promos + manual load
function loadSmart() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>Smart Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="smartAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualSmartLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchSmart" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterSmartPromos()">
    </div>

    <div id="promos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/smart.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    promos = JSON.parse(xhr.responseText);
    displaySmartPromos(promos);

  }

};

xhr.send(null);
}

// Display promos helper
function displaySmartPromos(promos) {
  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="icons/smart.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openSmartModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;
    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterSmartPromos() {
  const query = document.getElementById('searchSmart').value.toLowerCase();
  const filtered = smartPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displaySmartPromos(filtered);
}

// manual regular load
function manualSmartLoad() {
  const amount = document.getElementById("smartAmount").value;
  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }
  openSmartModal(amount, amount, "0", "Regular Load");
}

// Smart modal function
function openSmartModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';
  document.getElementById('promoModal').style.display = 'flex';
}
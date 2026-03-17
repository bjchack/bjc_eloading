// smartbro.js

let smartbroPromos = [];

// Load SmartBro promos + manual load
function loadSmartBro() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>SmartBro Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="smartbroAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualSmartBroLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchSmartbro" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterSmartbroPromos()">
    </div>

    <div id="smartbroPromos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('smartbroPromos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/smartbro.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    smartbroPromos = JSON.parse(xhr.responseText);
    displaySmartbroPromos(smartbroPromos);

  }

};

xhr.send(null);
}


// Display promos helper
function displaySmartbroPromos(promos) {
  const promoDiv = document.getElementById('smartbroPromos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    // Since your JSON has no price, we just leave price empty or use "Manual Load"
    card.innerHTML = `
      <img src="icons/smart.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>

      <button onclick="openSmartbroModal('${p.code}', 'N/A', '${p.days}', '${p.desc}')" class="send-btn">
        Select
      </button>
    `;

    promoDiv.appendChild(card);
  });
}


// Filter promos by search input
function filterSmartbroPromos() {
  const query = document.getElementById('searchSmartbro').value.toLowerCase();

  const filtered = smartbroPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  displaySmartbroPromos(filtered);
}


// manual regular load
function manualSmartBroLoad() {
  const amount = document.getElementById("smartbroAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openSmartbroModal(amount, 'N/A', "0", "Regular Load");
}


// SmartBro modal function
function openSmartbroModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: ${price === 'N/A' ? 'Check Gateway' : 'P' + price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';

  document.getElementById('promoModal').style.display = 'flex';
}
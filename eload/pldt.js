// pldt.js

let pldtPromos = [];

// Load PLDT promos + manual load
function loadPLDT() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>PLDT Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="pldtAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualPLDTLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchPLDT" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterPLDTPromos()">
    </div>

    <div id="pldtPromos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('pldtPromos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/pldt.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    pldtPromos = JSON.parse(xhr.responseText);
    displayPLDTPromos(pldtPromos);

  }

};

xhr.send(null);
}

// Display promos helper
function displayPLDTPromos(promos) {
  const promoDiv = document.getElementById('pldtPromos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/pldt.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>

      <button onclick="openPLDTModal('${p.code}', 'N/A', '${p.days}', '${p.desc}')" class="send-btn">
        Select
      </button>
    `;

    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterPLDTPromos() {
  const query = document.getElementById('searchPLDT').value.toLowerCase();

  const filtered = pldtPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  displayPLDTPromos(filtered);
}

// manual regular load
function manualPLDTLoad() {
  const amount = document.getElementById("pldtAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openPLDTModal(amount, 'N/A', "0", "Regular Load");
}

// PLDT modal function
function openPLDTModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: ${price === 'N/A' ? 'Check Gateway' : 'P' + price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';

  document.getElementById('promoModal').style.display = 'flex';
}
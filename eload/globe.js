// globe.js

let globePromos = [];

// Load Globe promos + manual load
function loadGlobe() {

  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>Globe</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="globeAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualGlobeLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchGlobe" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterGlobePromos()">
    </div>

    <div id="promos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "Loading promos...";

  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

  // Fetch promos from JSON
xhr.open("GET", "eload/json/globe.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    promos = JSON.parse(xhr.responseText);
    displayGlobePromos(promos);

  }

};

xhr.send(null);
}

// Display promos helper function
function displayGlobePromos(promos) {
  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/globe.png" alt="Globe" style="width:40px">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openGlobeModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;

    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterGlobePromos() {
  const query = document.getElementById('searchGlobe').value.toLowerCase();
  const filtered = globePromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displayGlobePromos(filtered);
}

// manual regular load
function manualGlobeLoad() {
  const amount = document.getElementById("globeAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openGlobeModal(amount, amount, "0", "Regular Load");
}

// Globe modal function
function openGlobeModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8080';
  document.getElementById('promoModal').style.display = 'flex';
}

// close modal
function closeModal(){
  document.getElementById('promoModal').style.display = 'none';
}

// send sms
function sendPromo(){
  const promo = document.getElementById("modalPromo").innerText;
  const gateway = "8080";
  window.location.href = `sms:${gateway}?body=${promo}`;
}
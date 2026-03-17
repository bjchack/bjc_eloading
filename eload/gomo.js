// gomo.js

let gomoPromos = [];

// Load GOMO promos + manual load
function loadGOMO() {

  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>GOMO</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="gomoAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualGomoLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchGomo" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterGomoPromos()">
    </div>

    <div id="promos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/gomo.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    promos = JSON.parse(xhr.responseText);
    displayGomoPromos(promos);

  }

};

xhr.send(null);
}

// Display promos helper function
function displayGomoPromos(promos) {
  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/gomo.png" alt="GOMO" style="width:40px">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openGomoModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;

    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterGomoPromos() {
  const query = document.getElementById('searchGomo').value.toLowerCase();
  const filtered = gomoPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displayGomoPromos(filtered);
}

// manual regular load
function manualGomoLoad() {
  const amount = document.getElementById("gomoAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openGomoModal(amount, amount, "0", "Regular Load");
}

// GOMO modal function
function openGomoModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8085';
  document.getElementById('promoModal').style.display = 'flex';
}

// close modal
function closeModal(){
  document.getElementById('promoModal').style.display = 'none';
}

// send sms
function sendPromo(){
  const promo = document.getElementById("modalPromo").innerText;
  const gateway = "8724";
  window.location.href = `sms:${gateway}?body=${promo}`;
}
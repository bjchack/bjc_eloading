let ditoPromos = [];

// Load DITO promos + manual load
function loadDITO() {

  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>DITO</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="ditoAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualDitoLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

<div style="margin-bottom:15px;">
  <input 
    id="searchPromo"
    type="text"
    placeholder="🔍 Search promo..."
    style="width:100%;padding:10px;border-radius:6px;border:none;"
    onkeyup="filterPromos()">
</div>

    <div id="promos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "Loading promos...";

// Fetch promos from JSON
const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/dito.json", true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    ditoPromos = JSON.parse(xhr.responseText);
    displayDitoPromos(ditoPromos);
  }
};

xhr.send(null);

}

// display promos helper
function displayDitoPromos(promos) {

  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/dito.png" alt="DITO" style="width:40px">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openDitoModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;

    promoDiv.appendChild(card);

  });

}

// search/filter function
function filterDitoPromos() {

  const query = document.getElementById('searchDito').value.toLowerCase();

  const filtered = ditoPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  displayDitoPromos(filtered);

}

// manual regular load
function manualDitoLoad() {

  const amount = document.getElementById("ditoAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openDitoModal(amount, amount, "0", "Regular Load");

}

// DITO modal function
function openDitoModal(code, price, days, desc){

  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';

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
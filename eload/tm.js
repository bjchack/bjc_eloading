// tm.js

let tmPromos = [];

// Load TM promos + manual load
function loadTM() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>TM Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="tmAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualTMLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchTM" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterTMPromos()">
    </div>

    <div id="promos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');

  // Load promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/tm.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    tmPromos = JSON.parse(xhr.responseText);
 displayTMPromos(tmPromos);

  }

};

xhr.send(null);
}

// Display TM promos helper
function displayTMPromos(promos) {
  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="icons/tm.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openTMModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;
    promoDiv.appendChild(card);
  });
}

// Filter TM promos by search input
function filterTMPromos() {
  const query = document.getElementById('searchTM').value.toLowerCase();
  const filtered = tmPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displayTMPromos(filtered);
}

// manual regular load
function manualTMLoad() {
  const amount = document.getElementById("tmAmount").value;
  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }
  openTMModal(amount, amount, "0", "Regular Load");
}

// TM modal function
function openTMModal(code, price, days, desc) {
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = '8724';
  document.getElementById('promoModal').style.display = 'flex';
}
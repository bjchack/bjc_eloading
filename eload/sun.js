// sun.js

let sunPromos = [];

// Load SUN promos + manual load
function loadSUN() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>SUN Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="sunAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualSunLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchSUN" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterSUNPromos()">
    </div>

    <div id="promos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');

  // fetch sun.json
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/sun.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    sunPromos = JSON.parse(xhr.responseText);
displaySUNPromos(sunPromos);

  }

};

xhr.send(null);
}

// Display SUN promos helper
function displaySUNPromos(promos) {
  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="icons/sun.png" alt="${p.code}" style="width:40px">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openSunModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;
    promoDiv.appendChild(card);
  });
}

// Filter SUN promos by search input
function filterSUNPromos() {
  const query = document.getElementById('searchSUN').value.toLowerCase();
  const filtered = sunPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );
  displaySUNPromos(filtered);
}

// manual regular load
function manualSunLoad() {
  const amount = document.getElementById("sunAmount").value;
  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }
  openSunModal(amount, amount, "0", "Regular Load");
}

// SUN modal function
function openSunModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = '8724';
  document.getElementById('promoModal').style.display = 'flex';
}
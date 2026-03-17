// globefiber.js

let globeFiberPromos = [];

// Load Globe Fiber promos + manual load
function loadGlobeFiber() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>Globe Fiber Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="globeFiberAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualGlobeFiberLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchGlobeFiber" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterGlobeFiberPromos()">
    </div>

    <div id="globeFiberPromos">Loading promos...</div>

    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('globeFiberPromos');
  promoDiv.innerHTML = "Loading promos...";

  // Fetch promos from JSON
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/globefiber.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    globeFiberPromos = JSON.parse(xhr.responseText);
    displayGlobeFiberPromos(globeFiberPromos);

  }

};

xhr.send(null);
}

// Display promos helper
function displayGlobeFiberPromos(promos) {
  const promoDiv = document.getElementById('globeFiberPromos');
  promoDiv.innerHTML = "";

  promos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="icons/globe.png" alt="${p.code}" style="width:40px;">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>

      <button onclick="openGlobeFiberModal('${p.code}', 'N/A', '${p.days}', '${p.desc}')" class="send-btn">
        Select
      </button>
    `;

    promoDiv.appendChild(card);
  });
}

// Filter promos by search input
function filterGlobeFiberPromos() {
  const query = document.getElementById('searchGlobeFiber').value.toLowerCase();

  const filtered = globeFiberPromos.filter(p =>
    p.code.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  displayGlobeFiberPromos(filtered);
}

// manual regular load
function manualGlobeFiberLoad() {
  const amount = document.getElementById("globeFiberAmount").value;

  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }

  openGlobeFiberModal(amount, 'N/A', "0", "Regular Load");
}

// Globe Fiber modal function
function openGlobeFiberModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: ${price === 'N/A' ? 'Check Gateway' : 'P' + price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';

  document.getElementById('promoModal').style.display = 'flex';
}
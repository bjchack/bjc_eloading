let tntPromos = [];

// Load TNT promos + manual load
function loadTNT() {
  const providerDiv = document.getElementById('providers');

  providerDiv.innerHTML = `
    <h3>TNT Promos</h3>

    <div style="background:#222;padding:10px;border-radius:6px;margin-bottom:15px;">
      <h4>Regular Load</h4>
      <input id="tntAmount" type="number" placeholder="Enter Load Amount" style="width:100%;padding:8px;margin-top:5px">
      <button onclick="manualTNTLoad()" class="send-btn" style="margin-top:8px;width:100%">Send Load</button>
    </div>

    <div style="margin-bottom:15px;">
      <input id="searchPromo" type="text" placeholder="Search promo..." style="width:100%;padding:8px" onkeyup="filterTNTPromos()">
    </div>

    <div id="promos">Loading promos...</div>
    <button onclick="location.reload()">⬅ Back</button>
  `;

  const promoDiv = document.getElementById('promos');

  // fetch tnt.json
  const xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");

xhr.open("GET", "eload/json/tnt.json", true);

xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

    tntPromos = JSON.parse(xhr.responseText);
    displayTNTPromos(tntPromos);

  }

};

xhr.send(null);
}

// display promos helper
function displayTNTPromos(promos) {
  const promoDiv = document.getElementById('promos');
  promoDiv.innerHTML = "";

  // skip first promo if it is manual load placeholder
  promos.slice(1).forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="icons/tnt.png" alt="${p.code}" style="width:40px">
      <strong>${p.code}</strong>
      <p>${p.desc}</p>
      <p>Duration: ${p.days}</p>
      <p>Price: P${p.price}</p>
      <button onclick="openTNTModal('${p.code}', ${p.price}, '${p.days}', '${p.desc}')" class="send-btn">Select</button>
    `;
    promoDiv.appendChild(card);
  });
}

// search/filter function
function filterTNTPromos() {
  const query = document.getElementById('searchPromo').value.toLowerCase();
  const filtered = tntPromos.filter(p => 
    p.code.toLowerCase().includes(query) || 
    p.desc.toLowerCase().includes(query)
  );
  displayTNTPromos(filtered);
}

// manual regular load
function manualTNTLoad(){
  const amount = document.getElementById("tntAmount").value;
  if(!amount || amount <= 0){
    alert("Enter valid amount");
    return;
  }
  // manual load modal
  openTNTModal(amount, amount, "0", "Regular Load");
}

// TNT modal function
function openTNTModal(code, price, days, desc){
  document.getElementById('modalPromo').innerText = code;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = `Price: P${price}`;
  document.getElementById('modalDuration').innerText = `Duration: ${days}`;
  document.getElementById('modalGateway').innerText = 'Gateway: 8724';
  document.getElementById('promoModal').style.display = 'flex';
}
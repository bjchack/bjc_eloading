// meralco.js
const container = document.getElementById('utilityContent');

// Array ng promos (isang logo lang)
const meralcoPromos = [
  {code: 'ILAW1000'},
  {code: 'ILAW110'},
  {code: 'ILAW220'},
  {code: 'ILAW330'},
  {code: 'ILAW550'},
  {code: 'ILAW1100'}
];

const logo = 'icons/meralco.png'; // isang logo lang

// Clear previous content & generate HTML dynamically
container.innerHTML = `
  <h3>Meralco Product Codes</h3>
  <div id="promoButtons" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; margin-bottom:20px;"></div>

  <div id="manualPromo" style="margin-top:30px;">
    <h4>Manual Promo Codes</h4>
    <ul>
      ${meralcoPromos.map(p => `<li>${p.code}</li>`).join('')}
    </ul>
  </div>

  <div id="popup" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; 
    background:rgba(0,0,0,0.8); justify-content:center; align-items:center; z-index:1000;">
    <div style="background:#1e1e1e; padding:20px; border-radius:8px; text-align:center; width:300px;">
      <h4 id="popupTitle" style="margin-bottom:10px;"></h4>
      <input id="serviceIdInput" type="text" placeholder="Enter Meralco Service ID" 
        style="width:90%; padding:8px; border-radius:4px; border:none; margin-bottom:10px;">
      <br>
      <button onclick="sendSMS()" style="padding:6px 12px; border:none; border-radius:4px; background:#ff9800; color:black; cursor:pointer;">
        Enter
      </button>
      <br><br>
      <button onclick="closePopup()" style="padding:4px 10px; border:none; border-radius:4px; background:#444; color:white; cursor:pointer;">
        Cancel
      </button>
    </div>
  </div>
`;

// Generate promo buttons dynamically
const promoButtonsDiv = document.getElementById('promoButtons');
meralcoPromos.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.background = '#222';
  card.style.padding = '10px';
  card.style.borderRadius = '8px';
  card.style.textAlign = 'center';
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <img src="${logo}" style="width:40px; height:40px; margin-bottom:6px;">
    <div style="color:#fff; font-weight:bold;">${p.code}</div>
  `;
  card.onclick = () => openServiceId(p.code);
  promoButtonsDiv.appendChild(card);
});

// Functions
function openServiceId(promoCode) {
  document.getElementById('popup').style.display = 'flex';
  document.getElementById('popupTitle').innerText = `Promo: ${promoCode}`;
  document.getElementById('serviceIdInput').value = '';
  document.getElementById('serviceIdInput').focus();
  window.currentPromo = promoCode;
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function sendSMS() {
  const serviceId = document.getElementById('serviceIdInput').value.trim();
  if(serviceId === '') {
    alert('Please enter your Meralco Service ID.');
    return;
  }
  const smsBody = `${window.currentPromo} ${serviceId}`;
  window.location.href = `sms:8724?body=${encodeURIComponent(smsBody)}`;
  closePopup();
}
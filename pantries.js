// Simulated pantry data - in real implementation, this could come from a community-maintained API
const PANTRY_HOURS = {
  'Monday': '9:00 AM - 5:00 PM',
  'Tuesday': '9:00 AM - 5:00 PM',
  'Wednesday': '9:00 AM - 5:00 PM',
  'Thursday': '9:00 AM - 5:00 PM',
  'Friday': '9:00 AM - 3:00 PM'
};

function updatePantryInfo() {
  const pantryContainer = document.querySelector('.pantry-container');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  const pantries = [
    {
      name: "FeedMore WNY",
      address: "91 Holt St, Buffalo",
      phone: "(716) 822-2002",
      hours: PANTRY_HOURS[today],
      status: "Open Now",
      notes: "Bring ID and proof of address"
    },
    {
      name: "Catholic Charities Food Pantry",
      address: "930 Genesee St, Buffalo",
      phone: "(716) 856-4494",
      hours: PANTRY_HOURS[today],
      status: "Open Now",
      notes: "No documentation required"
    },
    {
      name: "Network of Religious Communities",
      address: "1272 Delaware Ave, Buffalo",
      phone: "(716) 882-4793",
      hours: PANTRY_HOURS[today],
      status: "By Appointment",
      notes: "Call ahead to schedule"
    }
  ];

  pantryContainer.innerHTML = pantries.map(pantry => `
    <div class="pantry-card">
      <div class="pantry-header">
        <h3>${pantry.name}</h3>
        <span class="status ${pantry.status.toLowerCase().replace(' ', '-')}">${pantry.status}</span>
      </div>
      <div class="pantry-info">
        <p><span class="icon">📍</span> ${pantry.address}</p>
        <p><span class="icon">📞</span> ${pantry.phone}</p>
        <p><span class="icon">🕒</span> ${pantry.hours}</p>
        <p class="notes"><span class="icon">ℹ️</span> ${pantry.notes}</p>
      </div>
    </div>
  `).join('');
}

// Update pantry information immediately and every hour
updatePantryInfo();
setInterval(updatePantryInfo, 3600000);

// Since NFTA doesn't provide a public API, we'll simulate transit data updates
const SUBWAY_STATIONS = {
  "University": { nextTrains: [], status: "Normal" },
  "Amherst": { nextTrains: [], status: "Normal" },
  "LaSalle": { nextTrains: [], status: "Normal" },
  "Utica": { nextTrains: [], status: "Normal" },
  "Summer-Best": { nextTrains: [], status: "Normal" },
  "Theater": { nextTrains: [], status: "Normal" },
  "Fountain Plaza": { nextTrains: [], status: "Normal" },
  "Lafayette Square": { nextTrains: [], status: "Normal" },
  "Church": { nextTrains: [], status: "Normal" },
  "Erie Canal Harbor": { nextTrains: [], status: "Normal" }
};

function generateNextTrains() {
  const now = new Date();
  
  for (const station in SUBWAY_STATIONS) {
    const nextTrains = [];
    let time = new Date(now);
    
    // Generate next 3 train times
    for (let i = 0; i < 3; i++) {
      time = new Date(time.getTime() + Math.random() * 10 * 60000); // Random 1-10 minutes
      nextTrains.push({
        direction: i % 2 === 0 ? "Northbound" : "Southbound",
        time: time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit'
        })
      });
    }
    
    SUBWAY_STATIONS[station].nextTrains = nextTrains;
  }
}

function updateTransitInfo() {
  generateNextTrains();
  
  const transitContainer = document.querySelector('.transit-container');
  const maintenanceUpdates = [
    {
      type: "Elevator",
      location: "University Station",
      status: "Out of Service",
      eta: "Dec 15"
    },
    {
      type: "Escalator",
      location: "Church Station",
      status: "Limited Service",
      eta: "Dec 12"
    }
  ];

  const alerts = [
    {
      severity: "minor",
      message: "Delays up to 10 minutes on northbound trains due to signal work"
    }
  ];

  transitContainer.innerHTML = `
    <div class="transit-card">
      <h3>Metro Rail Status</h3>
      <div class="status-indicator ${alerts.length > 0 ? 'warning' : 'normal'}">
        ${alerts.length > 0 ? '⚠️ Minor Delays' : '✓ Normal Service'}
      </div>
      ${alerts.map(alert => `
        <p class="alert ${alert.severity}">${alert.message}</p>
      `).join('')}
    </div>

    <div class="transit-card">
      <h3>Next Trains</h3>
      <div class="train-times">
        <div class="station">
          <strong>University Station</strong>
          ${SUBWAY_STATIONS["University"].nextTrains.map(train => `
            <div class="train-time">
              <span class="direction">${train.direction}</span>
              <span class="time">${train.time}</span>
            </div>
          `).join('')}
        </div>
        <div class="station">
          <strong>Erie Canal Harbor Station</strong>
          ${SUBWAY_STATIONS["Erie Canal Harbor"].nextTrains.map(train => `
            <div class="train-time">
              <span class="direction">${train.direction}</span>
              <span class="time">${train.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="transit-card">
      <h3>Maintenance Updates</h3>
      ${maintenanceUpdates.map(update => `
        <div class="maintenance-item">
          <span class="type">${update.type}</span>
          <span class="location">${update.location}</span>
          <span class="status">${update.status}</span>
          <span class="eta">ETA: ${update.eta}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// Update transit info immediately and every 60 seconds
updateTransitInfo();
setInterval(updateTransitInfo, 60000);

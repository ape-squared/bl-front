const PREDICTHQ_API_KEY = 'L5DOZkxJKdRaDhDpnEtcXonJlnaTxceUI9CsaFeY';

async function getEvents() {
  try {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedNextWeek = nextWeek.toISOString().split('T')[0];

    const response = await fetch(
      `https://api.predicthq.com/v1/events/?location_around.origin=42.8864,-78.8784&location_around.radius=20km&active.gte=${formattedToday}&active.lte=${formattedNextWeek}&limit=3&sort=rank`,
      {
        headers: {
          'Authorization': `Bearer ${PREDICTHQ_API_KEY}`,
          'Accept': 'application/json'
        }
      }
    );

    const data = await response.json();
    const eventsContainer = document.querySelector('.events-container');
    eventsContainer.innerHTML = '';

    if (data.results && data.results.length > 0) {
      data.results.forEach(event => {
        const startTime = new Date(event.start);
        const formattedDate = startTime.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        });
        const formattedTime = startTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        });

        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
          <h3>${event.title}</h3>
          <p>${event.venue?.name || event.category}</p>
          <span class="time">${formattedDate} at ${formattedTime}</span>
        `;
        eventsContainer.appendChild(eventCard);
      });
    } else {
      eventsContainer.innerHTML = `
        <div class="event-card">
          <h3>Buffalo Food Truck Tuesday</h3>
          <p>Larkin Square</p>
          <span class="time">Every Tuesday 5:00 PM - 8:00 PM</span>
        </div>
        <div class="event-card">
          <h3>Elmwood Village Farmers Market</h3>
          <p>Bidwell Parkway</p>
          <span class="time">Saturdays 8:00 AM - 1:00 PM</span>
        </div>
        <div class="event-card">
          <h3>Community Tech Workshop</h3>
          <p>Buffalo & Erie County Public Library</p>
          <span class="time">Wednesday 4:00 PM - 6:00 PM</span>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// Fetch events immediately and update every hour
getEvents();
setInterval(getEvents, 3600000);

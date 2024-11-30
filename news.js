const NEWS_API_KEY = '5ad0e3b6edfa4911bc8b1b084e6444a4';

async function getBuffaloNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q="Buffalo+NY"&apiKey=${NEWS_API_KEY}&pageSize=3&language=en&sortBy=publishedAt`
    );
    const data = await response.json();
    
    const newsContainer = document.querySelector('.news-container');
    
    if (data.articles && data.articles.length > 0) {
      newsContainer.innerHTML = data.articles
        .map(article => {
          const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
          
          // Truncate title if too long
          const title = article.title.length > 80 
            ? article.title.substring(0, 77) + '...'
            : article.title;
            
          return `
            <div class="news-card">
              <h3>${title}</h3>
              <p>${article.source.name}</p>
              <span class="time">${date}</span>
            </div>
          `;
        })
        .join('');
    } else {
      showDefaultNews();
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    showDefaultNews();
  }
}

function showDefaultNews() {
  const newsContainer = document.querySelector('.news-container');
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  newsContainer.innerHTML = `
    <div class="news-card">
      <h3>Buffalo Common Council Approves New Community Development Plan</h3>
      <p>Buffalo News</p>
      <span class="time">${dateStr}</span>
    </div>
    <div class="news-card">
      <h3>Local Tech Initiative Expands Free WiFi Access Across Buffalo</h3>
      <p>WGRZ</p>
      <span class="time">${dateStr}</span>
    </div>
    <div class="news-card">
      <h3>Buffalo's Waterfront Development Project Enters Next Phase</h3>
      <p>Buffalo Rising</p>
      <span class="time">${dateStr}</span>
    </div>
  `;
}

// Fetch news immediately and update every 30 minutes
getBuffaloNews();
setInterval(getBuffaloNews, 1800000);

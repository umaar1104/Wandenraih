const API_KEY = import.meta.env.VITE_NASA_API_KEY;


function fetchNasaData(isRandom = false) {
    document.querySelector("#app").innerHTML = '<img src="public/circle-notch-solid.png" alt="Loading..." class="loading-gif" id="loading-gif"/>';
    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (isRandom) {
        url += `&count=1`;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let currentData = isRandom ? data[0] : data;

        let media;
        if (currentData.media_type === "image") {
            media = `<img src="${currentData.url}" alt="${currentData.title}"/>`;
        } else if (currentData.media_type === "video" || currentData.url.includes("youtube")) {
            media = `<iframe src="${currentData.url}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            media = `<video src="${currentData.url}" controls></video>`;
        }
        document.querySelector("#app").innerHTML = `
            <h1>${currentData.title}</h1>
            ${media}
            <p>${currentData.explanation}</p>
        `;
    })
    .catch(err => {
        document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
    });
}
fetchNasaData(false);
document.addEventListener('DOMContentLoaded', () => {
    const randomBtn = document.getElementById('random-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', () => fetchNasaData(true));
    }
});
function updateClock() {
  const now = new Date();

  // 1. Vaqtni foydalanuvchining vaqt mintaqasi (timezone) bo'yicha olish
  const timeOptions = { 
    timeZone: 'Asia/Tashkent', // O'zingizning mintaqangizni yozishingiz mumkin (masalan: 'UTC', 'America/New_York')
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  };
  const timeString = now.toLocaleTimeString('en-US', timeOptions);
  document.getElementById('live-time').innerText = timeString;

  // 2. Sanani chiroyli formatda chiqarish
  const dateOptions = { 
    timeZone: 'Asia/Tashkent', 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateString = now.toLocaleDateString('en-US', dateOptions);
  document.getElementById('live-date').innerText = dateString;
}
setInterval(updateClock, 1000);
updateClock(); 

 
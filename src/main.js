const API_KEY = import.meta.env.VITE_NASA_API_KEY;
import loadingImg from './assets/circle-notch-solid.png';
document.querySelector("#app").innerHTML = `<img src="${loadingImg}" alt="Loading..." class="loading-gif" id="loading-gif" />`;
function fetchNasaData(isRandom = false) {
    document.querySelector("#app").innerHTML = `<img src="${loadingImg}" alt="Loading..." class="loading-gif" id="loading-gif" />`;
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


 
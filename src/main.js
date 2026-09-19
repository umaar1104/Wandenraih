const API_KEY = import.meta.env.VITE_NASA_API_KEY;
import LoadingImg from './assets/circle-notch-solid.png';
let date = new Date();
let kun = String(date.getDate()).padStart(2, '0');
let month = String(date.getMonth() + 1).padStart(2, '0');
let year =date.getFullYear();
const formDate = `${kun}.${month}.${year}`;
let date2 = new Date();
let hour = date2.getHours();
let min = date2.getMinutes();
document.querySelector("#date").innerHTML = `<p style="font-size: 3rem;">${formDate} <br>${hour}:${min}</p>`;
document.querySelector("#app").innerHTML = `<img src ="${LoadingImg}" alt="Loading..." class="loading-gif" id="loading-gif" />`;
function fetchNasaData(isRandom = false) { 
    document.querySelector("#app").innerHTML = `<img src ="${LoadingImg}" alt="Loading..." class="loading-gif" id="loading-gif" />`;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (isRandom = true){
        url += '&count=1';
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let currentData;
               if (isRandom === true) {
                currentData = data[0];
            } else {
                currentData = data;
            }
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
const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
    fetchNasaData(true);
});
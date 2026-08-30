const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const date = document.querySelector("#datepicker").value;
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
document.querySelector("#app").innerHTML = '<p>loading...</p>'
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).then(response => response.json()).then(data => {
    let media;
    if (data.media_type === "image") {
        media = `<img style="width: 300px; height: 200px;" src="${data.url}"/>`;
    } else if(data.media_type === data.url.includes("youtube")){
        media = `<iframe width="560" height="315" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    }
     else {
        media = `<video src="${data.url}" controls></video>`;
    }
    document.querySelector("#app").innerHTML = document.querySelector("#app").innerHTML = `
    <h1>${data.title}</h1>
    ${media}
    <p>${data.explanation}</p>
`;
})
.catch(err => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
});

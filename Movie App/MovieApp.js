const apiKey = "YOUR_OMDB_API_KEY"; 
const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieResult = document.getElementById("movieResult");

searchBtn.addEventListener("click", () => {
  const title = movieInput.value.trim();
  if (title === "") {
    movieResult.innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }
  fetchMovie(title);
});

movieInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

function fetchMovie(title) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        movieResult.innerHTML = `<p>${data.Error}</p>`;
        return;
      }
      movieResult.innerHTML = `
        <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200"}" alt="${data.Title}">
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
      `;
    })
    .catch(err => {
      movieResult.innerHTML = `<p>Error fetching data.</p>`;
    });
}

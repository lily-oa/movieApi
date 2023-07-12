
const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');
const resultT = document.querySelector(".tmdb-result");

function movieResult(source, poster, name, year) {
  const resultItem = document.createElement("div");
  const movieTitle = document.createElement("h4");
  const releaseYear = document.createElement("p");
  const img = document.createElement("img");

  movieTitle.innerHTML = name;
  releaseYear.innerHTML = year;
  img.src = poster;

  resultItem.appendChild(img);
  resultItem.appendChild(movieTitle);
  resultItem.appendChild(releaseYear);

  if(source === "tmdb"){
    resultT.appendChild(resultItem);
  }else{
    return;
  }
}

function search(e){
  e.preventDefault();
  resultT.innerHTML = '';
  const searchTitle = input.value;
  makeTRequest(searchTitle);
  input.value = '';
}

// for TMDb
const apiKeyT = 'f2b95936763ff16180e0ff9345bc9694';
const urlT = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKeyT + '&query=';
function makeTRequest(searchTitle){
  xhr = new XMLHttpRequest();
  
  xhr.onload = function (){
    const response = JSON.parse(this.responseText).results;
    console.log(response);
    response.map(function(item) {
      movieResult(
        "tmdb", 
        "https://image.tmdb.org/t/p/w300/" + item.poster_path, 
        item.title, 
        item.release_date
      );
    });
  };
  xhr.open('GET', urlT + searchTitle, true);
  xhr.send();
}

form.addEventListener('submit', search);
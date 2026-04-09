import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import Navbar from "./components/Navbar";
import "./App.css";

const API_KEY = "e95418b7";
const API_URL = "https://www.omdbapi.com/";
const DEFAULT_MOVIE = "marvel";

export default function App() {

const [searchText, setSearchText] = useState("");
const [movieList, setMovieList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [errorText, setErrorText] = useState("");

const [selectedMovie, setSelectedMovie] = useState(null);
const [modalLoading, setModalLoading] = useState(false);

async function loadMovies(text) {

setIsLoading(true);
setErrorText("");

try {

  const response = await fetch(API_URL + "?apikey=" + API_KEY + "&s=" + encodeURIComponent(text) + "&type=movie");

  const data = await response.json();

  if (data.Response === "True") {
    setMovieList(data.Search);
  } else {
    setMovieList([]);
    setErrorText(data.Error || "No movies found");
  }

} catch {

  setMovieList([]);
  setErrorText("Network error");

}

setIsLoading(false);

}

useEffect(function () {
loadMovies(DEFAULT_MOVIE);
}, []);

function handleSearch(e) {

e.preventDefault();

const text = searchText.trim();

if (text !== "") {
  loadMovies(text);
}

}

async function openMovie(id) {

setModalLoading(true);
setSelectedMovie({});
try {
  const response = await fetch(API_URL + "?apikey=" + API_KEY + "&i=" + id + "&plot=full");
  const data = await response.json();
  setSelectedMovie(data);

} catch {
  setSelectedMovie(null);
}
setModalLoading(false);
}

function closeModal() {
setSelectedMovie(null);
}

return (

<div className="app">

  <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch}/>

  <main className="main-content">

    {isLoading && (

      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>

    )}

    {!isLoading && errorText && (

      <div className="error-state">
        <p>{errorText}</p>
      </div>

    )}

    {!isLoading && !errorText && (

      <div className="movie-grid">

        {movieList.map(function(movie) {

          return (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={openMovie}
            />
          )

        })}

      </div>

    )}

  </main>


  {selectedMovie && (

    <MovieModal
      movie={selectedMovie}
      loading={modalLoading}
      onClose={closeModal}
    />

  )}

</div>


);

}

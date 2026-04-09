import React from "react";

const PLACEHOLDER = "https://placehold.co/300x445/1e2433/94a3b8?text=No+Poster";

export default function MovieCard(props) {

const movie = props.movie;
const onClick = props.onClick;

let poster = movie.Poster;

if (!poster || poster === "N/A") {
poster = PLACEHOLDER;
}

function handleClick() {
onClick(movie.imdbID);
}

function imageError(e) {
e.target.src = PLACEHOLDER;
}

return (


<div className="movie-card" onClick={handleClick}>

  <div className="card-poster-wrap">

    <img className="card-poster"
      src={poster}
      alt={movie.Title}
      onError={imageError}
    />

    <div className="card-overlay">
      <span className="card-view-btn">View Details</span>
    </div>

  </div>

  <div className="card-info">

    <h3 className="card-title">{movie.Title}</h3>

    <div className="card-meta">
      <span>{movie.Year}</span>
      <span>{movie.Type}</span>
    </div>

  </div>

</div>


);

}

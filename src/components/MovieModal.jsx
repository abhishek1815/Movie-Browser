import { useEffect } from "react";

const PLACEHOLDER = "https://placehold.co/300x445/1e2433/94a3b8?text=No+Poster";

  export default function MovieModal(props){

  const movie = props.movie;
  const loading = props.loading;
  const onClose = props.onClose;

  useEffect(function(){


    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKey);

    return function () {
      document.removeEventListener("keydown", handleKey);
    };

    }, [onClose]);

    let poster = movie.Poster;

    if (!poster || poster === "N/A") {
    poster = PLACEHOLDER;
    }

    return (


    <div className="modal-backdrop" onClick={(e)=>{
      if(e.target === e.currentTarget){
      onClose();
    }
  }}>

  <div className="modal-glass">

    <button className="modal-close" onClick={onClose}>✕</button>

      {loading ? (
        <div className="modal-loader">
          <div className="spinner"></div>
          <p>Loading movie...</p>
        </div>
      ) : ( <div className="modal-body">

            <div className="modal-left">

             <img className="modal-poster"
               src={poster}
               alt={movie.Title}
             />

          </div>

          <div className="modal-right">

            <h2 className="modal-title">{movie.Title}</h2>

            <p className="modal-meta-line">
              {movie.Year} • {movie.Runtime} • {movie.Rated}
            </p>

            <p className="modal-plot">{movie.Plot}</p>

            <div className="modal-details">

              <p><b>Director:</b> {movie.Director}</p>
              <p><b>Actors:</b> {movie.Actors}</p>
              <p><b>Language:</b> {movie.Language}</p>
              <p><b>Country:</b> {movie.Country}</p>
              <p><b>Awards:</b> {movie.Awards}</p>

            </div>

          </div>

        </div>

      )}

    </div>

  </div>


  );

}

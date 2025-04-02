import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.primaryImage} alt={movie.primaryTitle} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.primaryTitle}</h3>
            <p>Year : {movie.releaseDate?.split("-")[0]}</p>
            <p>Rating : {movie.averageRating}</p>

            <p>Genres: {movie.genres.map((genre, index) => (
                <span key={genre.id || index}>
                    {genre}{index < movie.genres.length - 1 ? ', ' : ''}
                </span>
            ))}</p>
        </div>
    </div>
}

export default MovieCard
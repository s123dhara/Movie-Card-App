import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const moviesPerPage = 10; // Number of movies to display per page

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const allMovies = await getPopularMovies();

        // Calculate total pages based on the number of movies returned
        const total = Math.ceil(allMovies.length / moviesPerPage);
        setTotalPages(total);

        // Slice the movies array for the current page
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const paginatedMovies = allMovies.slice(startIndex, endIndex);

        setMovies(paginatedMovies);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, [currentPage]); // Re-run when the page changes

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      // Fetch all search results
      const allSearchResults = await searchMovies(searchQuery);

      // Calculate total pages
      const total = Math.ceil(allSearchResults.length / moviesPerPage);
      setTotalPages(total);

      // Reset to page 1 when performing a new search
      setCurrentPage(1);

      // Get movies for the first page
      const paginatedResults = allSearchResults.slice(0, moviesPerPage);
      setMovies(paginatedResults);

      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when changing pages

    // We don't need to fetch data here since useEffect will handle it
    // when currentPage changes
  };

  // Create pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    // Add previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo; Prev
      </button>
    );

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    // console.log(`Startpage =  ${startPage}`)
    let endPage = Math.min(totalPages, startPage + 4);
    // console.log(`endpage =  ${endPage}`)

    // Adjust if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
      // console.log(`Adjusted startpage =  ${startPage}`)
    }

    // First page if not in range
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
        >
          1
        </button>
      );

      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
        >
          {totalPages}
        </button>
      );
    }

    // Add next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next &raquo;
      </button>
    );

    return buttons;
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id || movie._id} />
              ))
            ) : (
              <div className="no-results">No movies found</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
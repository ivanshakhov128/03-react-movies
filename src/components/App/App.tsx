import "./App.module.css";
import { useState } from "react";
import { fetchMovies } from "../../services/MovieService";
import type { Movie } from "../../types/movie";
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(query);

      if (!results || results.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(results);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <Toaster position="top-right" />

      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;

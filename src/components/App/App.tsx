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
  // Стан фільмів
  const [movies, setMovies] = useState<Movie[]>([]);
  // Стан індикатора завантаження
  const [loading, setLoading] = useState(false);
  // Стан помилки
  const [error, setError] = useState(false);
  // Стан вибраного фільму для модалки
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Обробник пошуку
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    // очищаємо попередні дані
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

  // Вибір фільму
  const handleSelect = (movie: Movie) => setSelectedMovie(movie);
  // Закриття модалки
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      {/* Пошукова форма */}
      <SearchBar onSubmit={handleSearch} />

      {/* Сповіщення */}
      <Toaster position="top-right" />

      {/* Індикатор завантаження */}
      {loading && <Loader />}

      {/* Повідомлення про помилку */}
      {error && <ErrorMessage />}

      {/* Галерея фільмів (тільки коли не loading і не error) */}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {/* Модальне вікно фільму */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;

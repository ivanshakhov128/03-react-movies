import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

interface MovieResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: { query },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const response: AxiosResponse<MovieResponse> = await axios.get<MovieResponse>(
    BASE_URL,
    config
  );

  return response.data.results;
};

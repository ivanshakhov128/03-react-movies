import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWM1YWY1MTRlMGUxZDFjNTBkOTcxODY0NzJhM2Q2MSIsIm5iZiI6MTc2MjQ0MDgwOC45MjgsInN1YiI6IjY5MGNiNjY4YjM5YjY3ZWUyYzA3MTYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zswr9Od9-KOPAkpme_U4iYxYVfh8m-hBSplfAxvr4BE";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: { query },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const response = await axios.get(BASE_URL, config);
  return response.data.results;
};

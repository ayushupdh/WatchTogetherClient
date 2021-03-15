import React, { useEffect, useState } from "react";

import { server } from "../api/server";

export const useGetMovies = () => {
  const [movies, setMovies] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await server.get("/movies/getNRandom", {
          params: {
            qty: 20,
            genres: ["Drama", "Action"],
          },
        });
        const movies = response.data;
        setMovies(movies);
        setError(null);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);
  return { movies, error };
};

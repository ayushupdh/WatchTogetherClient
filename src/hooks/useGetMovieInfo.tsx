import React, { useEffect, useState } from "react";

import { server } from "../api/server";

export const useGetMovieInfo = (movieId: string) => {
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await server.get(`/movies/${movieId}`);
        const movie = response.data;
        setMovieInfo(movie);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [movieId]);
  return { movieInfo, error };
};

const API_KEY = "9c9934e5f1d2067a566e93eede75e49e";
const BASE_URL = "https://api.themoviedb.org/3/";

export const moviesApi = {
  nowPlaying: () =>
    fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  popular: () =>
    fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    const [_, keyword] = queryKey;
    return fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${keyword}`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  onTheAir: () =>
    fetch(`${BASE_URL}tv/on_the_air?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  popular: () =>
    fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}`).then((res) => res.json()),
  topRated: () =>
    fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    const [_, keyword] = queryKey;
    return fetch(
      `${BASE_URL}search/tv?api_key=${API_KEY}&query=${keyword}`
    ).then((res) => res.json());
  },
};

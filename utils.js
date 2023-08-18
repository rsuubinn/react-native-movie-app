export const makeImagePath = (url, width = "w500") =>
  `https://image.tmdb.org/t/p/${width}${url}`;

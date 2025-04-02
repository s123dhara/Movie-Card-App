// const API_KEY = "";
// const BASE_URL = "https://api.themoviedb.org/3";

// export const getPopularMovies = async () => {
//   const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
//   const data = await response.json();
//   return data.results;
// };

// export const searchMovies = async (query) => {
//   const response = await fetch(
//     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
//       query
//     )}`
//   );
//   const data = await response.json();
//   return data.results;
// };
const API_KEY = "7d9045f2c8mshcaa60d226195714p1070e9jsn7343d219f649";
// const BASE_URL = "https://imdb236.p.rapidapi.com/imdb/lowest-rated-moviesv";
const BASE_URL = "https://imdb236.p.rapidapi.com/imdb";

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': API_KEY, // Add your API key here
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

export const getPopularMovies = async () => {
  // const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  // const data = await response.json();
  // return data.results;

  return [];
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/autocomplete?query=${encodeURIComponent(
        query
      )}`,
      options
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  // return data.results;
};

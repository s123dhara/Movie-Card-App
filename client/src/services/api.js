const API_KEY = "7d9045f2c8mshcaa60d226195714p1070e9jsn7343d219f649";
const BASE_URL = "https://imdb236.p.rapidapi.com/imdb";

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': API_KEY, // Add your API key here
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

export const getPopularMovies = async () => {
  try {
    // const response = await fetch(
    //   `${BASE_URL}/most-popular-movies`,
    //   options
    // );

    const response = await fetch(`http://localhost:8000/get-popular-movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const searchMovies = async (query) => {
  try {

    const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();    

    // return [];
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

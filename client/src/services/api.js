const BASE_URL = "https://movie-card-6mi09f3p8-s123dharas-projects.vercel.app";

export const getPopularMovies = async () => {
  try {
    // const response = await fetch(
    //   `${BASE_URL}/most-popular-movies`,
    //   options
    // );

    const response = await fetch(`${BASE_URL}/get-popular-movies`);

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

    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);

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

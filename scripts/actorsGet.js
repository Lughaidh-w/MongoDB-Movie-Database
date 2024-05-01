const path = require('path');
const axios = require('axios');

require('dotenv').config({ path: path.join(process.cwd(), '.env') });
const apiKey = process.env.API_KEY

// const movie = "Lawrence of Arabia"
// const year = "1962"


async function actorsGet(movie, year) {
  console.log("In function")
  console.log(movie, year)
  const url = 'http://www.omdbapi.com/';

  try {
    const response = await axios.get(url, {
      params: {
        apikey: apiKey,
        t: movie,
        y: year
      }
    });

    // Check if the response contains data
    if (response.data) {
      // Extract actors' information
      const actors = response.data.Actors.split(',').map(actor => actor.trim());
      console.log(actors)
      return actors;
      
    // none of these are used yet
    //   // get director
    //   const director = response.data.Director.toString();

    //   // get imdb id
    // imdb id can be got at initial scraping for better matches
    //   const imdbID = response.data.imdbID.toString();

    //   // get poster url
    //   const posterURL = response.data.Poster.toString();

    } else {
        throw new Error('No movie info found');
    }
    } catch (error) {
    throw new Error('Error fetching movie info:', error);
    }
};


module.exports = actorsGet;
const mongoose = require('mongoose');
const actorsGet = require('./actorsGet');

mongoose.connect('mongodb://127.0.0.1:27017/imdb-data')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define the schema
const movieSchema = new mongoose.Schema({
  index: String,
  title: String,
  actors: [String],
  details: {
    year: String,
    rating: String,
    votes: String
  }
});

// method to populate actors
movieSchema.methods.addActorsFromAPI = async function(movie, year) {
  try {
    // Call the actorsGet function to fetch actors from the API
    const actors = await actorsGet(movie, year);

    // Update the movie schema with the fetched actors
    this.actors.push(...actors);
    await this.save();

    console.log('Actors added to movie:', this.title);
  } catch (error) {
    console.error(error);
  }
};

// Define the model
const top250imdb = mongoose.model('Movie', movieSchema, 'top250imdb');

// // Find all movies
// top250imdb.find({}).then(movies => {
//   console.log('All movies:', movies);
// }).catch(error => {
//   console.error("Error connecting to MongoDB:", error);
// });

top250imdb.findOne({"title":"The Shawshank Redemption"})
  .then(movie => {
    console.log(movie.title)
    console.log(movie.details.year)
    movie.addActorsFromAPI(movie.title, movie.details.year)
  })

top250imdb.findOne({"title":"The Shawshank Redemption"})
  .then(movie => {
    console.log(movie);
  })
const mongoose = require('mongoose');


// mongoose.connect("")

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
  details: {
    year: String,
    rating: String,
    votes: String
  }
});

// Define the model
const top250imdb = mongoose.model('Movie', movieSchema, 'top250imdb');

mongoose.connect('mongodb://127.0.0.1:27017/imdb-data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  // Find all movies from the 'top250movies' collection
  return top250imdb.find({}, null);
}).then(movies => {
  console.log('All movies:', movies);
});
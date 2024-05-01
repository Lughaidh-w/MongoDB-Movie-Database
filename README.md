# Movie Database Creation

This project creatres movie data with web scraping in Python.
The movie data is added to a single JSON file, containing the top 250 rated movies.


A MongoDB database is created in a container using Node.JS.
The file is parsed and each JSON object is added as a document as below:
```
{
  _id: ObjectId('6630f3341c8b63efaa7b2da9'),
  index: 'top_250: 1',
  title: 'The Shawshank Redemption',
  details: { year: '1994', rating: '9.3', votes: '2.9M' }
}
```
A Schema is then made with Mongoose, which uses a method to add a list of actors from an [API](http://www.omdbapi.com/).
This alters the Documents as below:

```
{
  _id: ObjectId('6632430c397b27ea257b2da9'),
  index: 'top_250: 1',
  title: 'The Shawshank Redemption',
  details: { year: '1994', rating: '9.3', votes: '2.9M' },
  __v: 1,
  actors: [ 'Tim Robbins', 'Morgan Freeman', 'Bob Gunton' ]
}
```


# Movie Database

This project creatres movie data with web scraping in Python.
The movie data is added to a single JSON file.


MongoDB is used in a container, and a database created with Node.JS.
The file is parsed and each JSON object is added as a document as below:
```
{
  _id: ObjectId('6630f3341c8b63efaa7b2da9'),
  index: 'top_250: 1',
  title: 'The Shawshank Redemption',
  details: { year: '1994', rating: '9.3', votes: '2.9M' }
}
```

Data is then transformed with node.js (mongoose) and loaded back into MongoDB.



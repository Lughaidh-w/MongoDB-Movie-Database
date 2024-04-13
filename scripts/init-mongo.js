// right now doesn't check if file is json or not

const fs = require('fs');
const path = require('path');

const dataPath = "/home/mongodb/input"


const mongodbDocument = {
  jsonList : [],

  newDocuments: function(collectionName, collPath, dbObject){

      this.jsonList = fs.readdirSync(collPath);

      console.log("jsonList")
      console.log(this.jsonList)



      this.jsonList.forEach(document => { 
        this.documentPath = collPath + "/" + document;
        console.log("document path")
        console.log(this.documentPath)

        this.fileContents = fs.readFileSync(this.documentPath, 'utf8');
        this.jsonData = JSON.parse(this.fileContents);
        dbObject.getCollection(collectionName).insertOne(this.jsonData)
      }) 
  }
}
// collection
const mongodbCollection = {
  dbPath : "",
  collectionList: [],

  newCollection: function(databaseName, dbObject){
      //this.dbPath = databaseName;
      this.dbPath = dataPath + "/" + databaseName;

      // list all collections
      this.collectionList = fs.readdirSync(this.dbPath);

      // creates a collection for each directory
      // should add error statement here
        this.collectionList.forEach(collection => {  // need to add a check that they are json files
        this.collPath = this.dbPath + "/" + collection; 
        console.log("Collections path");
        console.log(this.collPath);
        //dbObject.createCollection(collection)
        dbObject.createCollection(collection);
        console.log("db:", dbObject);

        

        //collectionObject = db.collection(collection)
        const addMongodbDocument = Object.create(mongodbDocument);
        addMongodbDocument.newDocuments(collection, this.collPath, dbObject);
      })

  }
}


// for now only using one database:
// imdb-data
const listDatabases = {
    dirList : [],

    searchDatabases: function(databases){
        this.dirList=databases
        this.dirList.forEach(database => {
            // create database
            const dbObject = db.getSiblingDB(database);
            const newMongodbCollection = Object.create(mongodbCollection);
            newMongodbCollection.newCollection(database, dbObject);
        })
    }
}

const databases = fs.readdirSync(dataPath);
console.log("Databases")
console.log(databases)

const newListDatabases = Object.create(listDatabases);
newListDatabases.searchDatabases(databases);
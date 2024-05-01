// right now doesn't check if file is json or not
console.log("Script start")

// disable reporting
disableTelemetry()

const fs = require('fs');
const path = require('path');

const dataPath = "/home/mongodb/input"


const collectionDocumentParser = {
  collectionFileList : [],

  recordCollections: function(collectionFiles){
    this.collectionFileList=collectionFiles;
    console.log("collectionFileList:")
    console.log(this.collectionFileList)

    this.collectionFileList.forEach(collection => {
      const collectionName = collection.replace('.json', '');
      dbObject = db.getSiblingDB(databaseName);
      dbObject.createCollection(collectionName);
      this.collectionFile = dataPath + "/" + databaseName + "/" + collection;



      this.fileContents = fs.readFileSync(this.collectionFile, 'utf8');
      this.jsonData = JSON.parse(this.fileContents);

      if (Array.isArray(this.jsonData)) {
        // Iterate over each object in the array and insert it as a document
        this.jsonData.forEach(obj => {
            dbObject.getCollection(collectionName).insertOne(obj);
        });
      } else {
          // If the JSON data is not an array, insert the entire data as a single document
          dbObject.getCollection(collectionName).insertOne(this.jsonData);
      }

    });

  }



}


// only using one database for initial load
console.log("Creating Database")
const databaseName = "imdb-data"
const dbObject = db.getSiblingDB(databaseName);
//dbObject.createCollection("test_collection_for_creation_check");

// can add user for database here
// db.createUser(
//   {
//       user: "<user for database which shall be created>",
//       pwd: "<password of user>",
//       roles: [
//           {
//               role: "readWrite",
//               db: "<database to create>"
//           }
//       ]
//   }
// );




// Any file will be a collection
const databaseFolder = dataPath + "/" + databaseName

const collectionFiles = fs.readdirSync(databaseFolder);

const newCollectionDocumentParser = Object.create(collectionDocumentParser);
newCollectionDocumentParser.recordCollections(collectionFiles)

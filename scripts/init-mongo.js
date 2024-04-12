require('dotenv').config();
const axios = require('axios');

const api_key = process.env.JB_API
const url = process.env.JB_URL

// create mongo database
//db = db.getSiblingDB("imdb-lists");

//db.createCollection("top-250");

// search collections
//const collections ={};

let url_ = url + "/c"


function fetchCollections(url_, api_key) {
    const collections = {};
  
    return axios.get(url_, {
      headers: {
        'X-Master-Key': api_key
      }
    })
    .then(response => {
      response.data.forEach(item => {
        const collectionName = item.collectionMeta.name;
        const recordID = item.record;
        if (!collections[collectionName]) {
          collections[collectionName] = [recordID];
        } else {
          collections[collectionName].push(recordID);
        }
      });
      return collections;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// to do: handle case of more than 10 bins
// if 10 bins are returned add them and check for next 10
// api returns 10 at a time and uses id of bin to start the next 10
function fetchBinsForCollection(recordIDs, api_key) {
    const binIDs = []; 
    let url_ = url + `/c/${recordIDs}/bins`;

    return axios.get(url_, {
        headers: {
          'X-Master-Key': api_key
        }
      })
      .then(response => {
        response.data.forEach(item => {
            binIDs.push(item.record);
        });
        console.log(binIDs)
        return binIDs;
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }







async function main() {
    try {
      const collections = await fetchCollections(url_, api_key);
      for (const [collectionName, recordIDs] of Object.entries(collections)) {
        // creating database here
        // db = db.getSiblingDB(key);

        const binIDs = await fetchBinsForCollection(recordIDs, api_key);

     





      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


main()

const col_ = {
    "imdb": "dawdr34r322"
    //"other_collection": "adwef23fwr"
  };




  
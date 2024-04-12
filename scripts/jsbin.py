import requests
import os

import read_env
read_env.load_env_vars()

api_key = os.environ.get("JB_API")
url= os.environ.get("JB_URL")
x_access_full = os.environ.get("X_ACCESS_Full")


def make_request(url, header, method, data=None):
    method = getattr(requests, method.lower())
    req = method(url, json=data, headers=header)
    print(req.text)
    return req.text



# make an empty collection
def make_collection(name):
    url_ = url + "/c"
    headers = {
        'X-Collection-Name': name,
        'X-Master-Key': api_key
    }
    data = {}
    make_request(url_, headers, "POST", data=data)

# list collections
def list_collections():
    url_ = url + "/c"
    headers = {
        'X-Master-Key': api_key       
    }
    make_request(url_, headers, "GET")

# upload json 
def upload_json(json_file, name, collection):
    # put check in here for file size
    url_ = url + "/b"
    headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': api_key,
    #'X-Access-Key' : x_access_full,
    "X-Bin-Name" : name,
    "X-Collection-Id" : collection
    }
    make_request(url_, headers, "POST", data=json_file)


import json
json_path = "../input/top250imdb.json"

# Open the JSON file
with open(json_path, "r") as file:
    # Parse the JSON data
    data = json.load(file)

### upload json ###
### need to do:
### insert title and find id
#upload_json(data, "imdb-top-250", "66196418ad19ca34f858e64a")

#list_collections()


def read_json():
    pass
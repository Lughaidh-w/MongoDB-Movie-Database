import requests
import json
from bs4 import BeautifulSoup
import re

json_path = "../input/top250imdb.json"
data = []


def write_data(movie_list):
    with open(json_path, "a+") as json_file:
        json.dump(movie_list, json_file, indent=4)
    print("Data written to JSON file.")




# IMDb Top 250 page
url = "https://www.imdb.com/chart/top/"
list_name = "top_250"

header = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"}

response = requests.get(url, headers=header)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, "lxml")
    list_str = list(soup.stripped_strings)
    pattern = re.compile(r'^(\d+(\.\d+)?)\.\s.*$')

    for index, value in enumerate(list_str):
        if pattern.match(value):
            #print(value, list_str[index+1], list_str[index+4], list_str[index+6])
            number, title = value.split('. ', 1)

            movie_data = {
                "_id": f"{list_name}: {number}",
                "title": title,    
                "details": {
                    "year": list_str[index+1],
                    "rating": list_str[index+4],
                    "votes": list_str[index+6]
                }
            }
            data.append(movie_data)

    # run the function
    write_data(data)



else:
    print("Error:", response.status_code)





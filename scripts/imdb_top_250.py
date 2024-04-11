import requests
import json
from bs4 import BeautifulSoup
import re

# URL of the IMDb Top 250 page
url = "https://www.imdb.com/chart/top/"

header = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"}

response = requests.get(url, headers=header)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, "lxml")
    list_str = list(soup.stripped_strings)
    pattern = re.compile(r'^(\d+(\.\d+)?)\.\s.*$')

    for index, value in enumerate(list_str):
        if pattern.match(value):
            print(value, list_str[index+1], list_str[index+4], list_str[index+6])



else:
    print("Error:", response.status_code)

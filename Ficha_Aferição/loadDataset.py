import json
import requests

def loadDataset(jsonFile, url_api):
    with open(jsonFile, 'r') as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError:
            return
    
    for pessoa in data:
        try:
            response = requests.post(url_api, json=pessoa)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Connection error: {e}")

def main():
    jsonFile = './datasets/dataset.json'
    url_api = 'http://localhost:3000/pessoas'
    loadDataset(jsonFile, url_api)

if __name__ == "__main__":
    main()
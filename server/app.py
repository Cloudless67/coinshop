from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api")
def event_data():
    f = open("EventData.csv", 'r', encoding="utf-8-sig")
    name = f.readline().split('\n')[0]
    startDate, endDate = f.readline().split('\n')[0].split(',')
    res = {
        "name": name,
        "startDate": startDate,
        "endDate": endDate
    }
    f.close()
    return res


@app.route("/api/coins")
def event_coins_data():
    f = open("CoinsData.csv", 'r', encoding="utf-8-sig")

    def build_object(coin):
        return {
            "id": int(coin[0]),
            "name": coin[1],
            "worldScope": coin[2] == "TRUE"
        }
    res = jsonify([build_object(line.split('\n')[0].split(','))
                  for line in f.readlines()])
    f.close()
    return res


@app.route("/api/items")
def coinshop_items_data():
    f = open("ItemsData.csv", 'r', encoding="utf-8-sig")

    def build_object(item):
        return {
            "name": item[0],
            "coin": int(item[1]),
            "price": int(item[2]),
            "qty": int(item[3]),
            "worldShare": item[4] == "TRUE",
            "storageUsage": item[5]
        }
    res = jsonify([build_object(line.split('\n')[0].split(','))
                  for line in f.readlines()])
    f.close()
    return res

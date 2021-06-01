from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api")
def event_data():
    f = open('ItemsData.csv', 'r', encoding='utf8')

    def build_object(item):
        return {
            "name": item[0],
            "coin": int(item[1]),
            "price": int(item[2]),
            "qty": int(item[3]),
            "worldShare": True if item[4] == "TRUE" else False,
            "storageUsage": item[5]
        }
    res = jsonify([build_object(line.split('\n')[0].split(','))
                  for line in f.readlines()])
    f.close()
    return res

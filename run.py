from flask import Flask, request, jsonify, render_template
import requests
import json

app = Flask(__name__)
api_key = "34943098462755445d31e41f9fa7a8db"

@app.route("/")
@app.route("/beranda")
def Beranda():
    return render_template("beranda.html", title="Flask Keren")

@app.route("/covid-19")
def Covid19():
    return render_template("covid19.html", title="Visualisasi kasus covid 19 di indonesia")

@app.route("/data/covid-19")
def GetDataCovid19():
    dataCovid = requests.request("GET", "https://data.covid19.go.id/public/api/update.json")
    return dataCovid.json()

@app.route("/form/ongkos-kirim")
def FormOngkir():
    response = requests.request("GET", "https://api.rajaongkir.com/starter/city", headers={"key" : api_key})
    response = response.json()
    return render_template("form/ongkos-kirim.html", title="Analisis Ongkos Kirim", availableCity=response["rajaongkir"]["results"])

@app.route("/result/ongkos-kirim", methods=["POST"])
def ResultOngkir():
    dataPost = request.form.to_dict()
    city = dict()
    
    city["origin"] = dataPost["origin"].split("%")[1]
    city["destination"] = dataPost["destination"].split("%")[1]

    dataPost["origin"] = dataPost["origin"].split("%")[0]
    dataPost["destination"] = dataPost["destination"].split("%")[0]
    
    return render_template("result/ongkos-kirim.html", title="Analisis Ongkos Kirim", dataPost=dataPost, city=city)

@app.route("/data/ongkos-kirim", methods=["POST"])
def GetDataOngkir():
    dataPost = request.form.to_dict()
    available_courier = ["tiki", "jne", "pos"]
    result = dict()
    result["cost"] = list()
    result["service"] = list()
    for courier in available_courier:
        dataPost["courier"] = courier
        response = requests.request(
            "POST", 
            "https://api.rajaongkir.com/starter/cost",
            headers={"key" : api_key},
            data=dataPost
        )
        response = response.json()
        for item in response["rajaongkir"]["results"][0]["costs"]:
            result["cost"].append(item["cost"][0]["value"])
            result["service"].append(f"{courier.lower()} {item['service'].lower()}")
    return jsonify(result)       
if __name__ == "__main__":
    app.run(port=6007, debug=True)
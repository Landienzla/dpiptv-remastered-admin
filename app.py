from flask import Flask, request
from flask.globals import request
from flask.helpers import make_response
from flask.json import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
import bson

import pymongo
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://landienzla:5513@cluster0.irgw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
CORS(app)
mongo = PyMongo(app)
db = mongo.db


@app.route('/')
def home_page():
    return "<h1>Hello From Flask</h1>"


@app.route('/users')
def users():
    users = []
    users_fromdb = mongo.db.users.find()
    for i in users_fromdb:
        users.append(i)
    res = make_response(json.dumps(users, default=str))
    res.mimetype = 'application/json'
    # f"{json.dumps(users, default=str)}"
    return res


@app.route('/login', methods=['POST'])
def user_login():
    requestData = json.loads(request.data)
    # print(requestData)
    # user = {"email": request.data["email"],
    #         "password": request.data["password"]}
    username = requestData["username"]
    password = requestData["password"]
    user = db.users.find_one({"username": username})
    if password == user["password"]:
        res = make_response(json.dumps(user['_id'], default=str))
        res.mimetype = 'application/json'
        print(res.data)
        return res, 200
    else:
        return "False", 404


@app.route('/users/<id>')
def userInfo(id):
    user = db.users.find_one({"_id": bson.ObjectId(oid=str(id))})
    # res = make_response(json.dumps(user, default=str))
    # res.mimetype = 'application/json'
    print(user)
    return user["username"],200


@app.route('/products/add', methods=["POST", ])
def add_product():
    requestData = json.loads(request.data)
    product = {"duration": requestData["duration"],
            "cost": requestData["cost"],
            "buynowLink": requestData["buynowLink"],
            "btcLink": requestData["btclink"]}
    # print(request.data)
    db.products.insert_one(product)
    return "Product Added Successfuly", 200
@app.route('/products')
def product_list():
    products = []
    productsDB = mongo.db.products.find()
    for i in productsDB:
        products.append(i)
    res = make_response(json.dumps(products, default=str))
    res.mimetype = 'application/json'
    # f"{json.dumps(users, default=str)}"
    return res
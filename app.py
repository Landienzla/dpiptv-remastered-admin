from dns.message import Message
from flask import Flask, request
from flask.globals import request
from flask.helpers import make_response
from flask.json import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_mail import Mail, Message
import json
import bson
import copy
import pymongo
import datetime
from pymongo.message import update


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://landienzla:5513@cluster0.irgw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
CORS(app)
mongo = PyMongo(app)
db = mongo.db


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'landienzla@gmail.com'
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


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
        # print(res.data)
        return res, 200
    else:
        return "False", 404


@app.route('/users/<id>')
def userInfo(id):
    user = db.users.find_one({"_id": bson.ObjectId(oid=str(id))})
    # res = make_response(json.dumps(user, default=str))
    # res.mimetype = 'application/json'
    # print(user)
    return user["username"], 200


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


@app.route('/products/add', methods=["POST", ])
def add_product():
    requestData = json.loads(request.data)
    product = {"duration": requestData["duration"],
               "cost": requestData["cost"],
               "buynowLink": requestData["buynowLink"],
               "btcLink": requestData["btclink"],
               "productCategory": requestData["productCategory"]}
    # print(request.data)
    db.products.insert_one(product)
    return "Product Added Successfuly", 200


@app.route('/products/<id>', methods=["PUT", ])
def update_product(id):
    requestData = json.loads(request.data)
    for key in requestData.copy():
        if requestData[key] == '' or requestData[key] == " ":
            requestData[key] = None
            requestData.pop(key, None)
    for key in requestData.copy():
        db.products.update({"_id": bson.ObjectId(oid=str(id))}, {'$set': {
            key: requestData[key]
        }})
    # for key, value in requestData.items():
    #     db.products.save({"_id": bson.ObjectId(oid=str(id))}, {'$set': {
    #         key: requestData[key]
    #     }})
    return "Product Updated Successfully", 200


@app.route('/support/requests')
def support_requests():
    requests = []
    requestsDB = db.supportRequests.find()
    for i in requestsDB:
        requests.append(i)
    res = make_response(json.dumps(requests, default=str))
    res.mimetype = 'application/json'
    return res


@app.route('/support/request', methods=["POST"])
def request_support():
    requestData = json.loads(request.data)
    supportRequest = {
        "Name": requestData["Name"],
        "Email": requestData["Email"],
        "Reason": requestData["Reason"],
        "Message": requestData["Message"],
        "createdAt": datetime.datetime.now(),
        "Status": "Waiting"
    }
    db.supportRequests.insert_one(supportRequest)
    return "request support", 200


@app.route('/support/request/<id>/solve', methods=["POST"])
def solve_support(id):
    requestData = json.loads(request.data)
    requestOwner = db.supportRequests.find_one(
        {"_id": bson.ObjectId(oid=str(id))})
    db.supportRequests.update({"_id": bson.ObjectId(oid=str(id))}, {'$set': {
        "Status": "Solved",
        "updatedAt": datetime.datetime.now(),
        "MessagefromAdmin": requestData["Message"],
    }})
    msg = Message("Your Problem Solved By DPIPTV",
                  sender="DPIPTV",
                  recipients=[requestOwner["Email"]])
    msg.body = f'Hi {requestOwner["Name"]} {requestData["Message"]}'
    mail.send(msg)
    return 'Problem Solved'


@app.route('/testlink/get', methods=["POST"])
def get_testlink():
    requestData = json.loads(request.data)
    testlinkData = {
        "Name": requestData["Name"],
        "Email": requestData["Email"],
        "Device": requestData["Device"],
        "MAC": requestData["MAC"],
        "createdAt": datetime.datetime.now()
    }
    db.testlinks.insert_one(testlinkData)
    return "Successfull", 200


@app.route("/installations")
def installations():
    installations = []
    installationsDB = db.installations.find()
    for i in installationsDB:
        installations.append(i)
    res = make_response(json.dumps(installations, default=str))
    res.mimetype = 'application/json'
    return res


@app.route('/installation/add', methods=["POST"])
def add_installation():
    requestData = json.loads(request.data)
    installationData = {
        "Name": requestData["Name"],
        "videoLink": requestData["videoLink"],
        "imageLink": requestData["imageLink"],
        "createdAt": datetime.datetime.now()
    }
    db.installations.insert_one(installationData)
    return "Successfull", 200


@app.route('/installations/<id>/update', methods=["PUT"])
def update_installation(id):
    requestData = json.loads(request.data)
    for key in requestData.copy():
        if requestData[key] == '' or requestData[key] == " ":
            requestData[key] = None
            requestData.pop(key, None)
    for key in requestData.copy():
        db.installations.update({"_id": bson.ObjectId(oid=str(id))}, {'$set': {
            key: requestData[key]
        }})
    # for key, value in requestData.items():
    #     db.products.save({"_id": bson.ObjectId(oid=str(id))}, {'$set': {
    #         key: requestData[key]
    #     }})
    return "Data Updated Successfully", 200


@app.route('/installations/<id>/delete', methods=["DELETE"])
def delete_installation(id):
    db.installations.delete_one({"_id": bson.ObjectId(oid=str(id))})
    return "Deleted", 200

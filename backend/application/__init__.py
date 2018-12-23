
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from flask import Flask
from pymongo import MongoClient
import json
from config import BaseConfig
from flask_socketio import SocketIO


app = Flask(__name__)
socketio = SocketIO(app)
client = MongoClient("mongodb://localhost:27017/")
mydb = client["uia_db"]
users = mydb["users"]
CORS(app, supports_credentials=True)
app.config.from_object(BaseConfig)
import server

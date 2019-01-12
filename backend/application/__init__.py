
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
mydb = client["publisher_db"]
users = mydb["users"]
UPLOAD_FOLDER = './upload'
CORS(app, supports_credentials=True)
app.config.from_object(BaseConfig)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
from routes import *
import server
app.register_blueprint(routes)


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
CORS(app, supports_credentials=True)
app.config.from_object(BaseConfig)
from routes import *
app.register_blueprint(routes)

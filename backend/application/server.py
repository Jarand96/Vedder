
from flask import Flask
from flask import jsonify, request, g
from flask_cors import CORS
from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from .utils.auth import generate_token, verify_token, requires_auth, email_is_valid
import json
from . import app, client, mydb, users
from .utils.tools import create_uploading_folder
from .utils.db_handler import get_user_with_email_and_password,insert_user_to_db, User

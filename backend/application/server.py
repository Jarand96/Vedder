
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

@app.route("/login", methods=['POST'])
def Login():
    try:
        incoming = request.get_json()
        print(incoming)
        if email_is_valid(incoming["email"]) is False:
            return jsonify(error=True), 400
        user = get_user_with_email_and_password(incoming["email"].lower().strip(), incoming["password"])
        if user:
            user = User(
                _id = str(user['_id']),
                email = user['email'],
            )
            return jsonify(generate_token(user))
        else:
            return jsonify(error=True,
            errorMessage=
            "That user do not exist. Are you certain of your existance?"), 404
    except:
        return jsonify(error=True), 500

@app.route("/is_token_valid", methods=["POST"])
def is_token_valid():
    try:
        incoming = request.get_json()
        is_valid = verify_token(incoming["token"])
        if is_valid:
            return jsonify(token_is_valid=True)
        else:
            return jsonify(token_is_valid=False), 403
    except:
        return jsonify(error=True), 404

@app.route('/register', methods=['POST'])
def create_user():
    try:
        print("getting request data.")
        incoming = request.get_json()
        #Sanitizes input before db-lookup - avoid db injections.
        print("Got request data. checking if email is valid..")
        if email_is_valid(incoming["email"]) is False:
            return jsonify(error=True), 404

        print("Valid email. Checkig if user is aalready in db.")
        if user_already_in_db(incoming['email']):
            return jsonify(message="email already exists"), 400
        print("User not in db. Checking if input is valid")
        if valid_register_input(incoming) is False:
            return jsonify(message="Input not valid"), 400

        user = insert_user_to_db(incoming)

        if user:
            return jsonify(generate_token(user)), 201
        else:
            return jsonify(error=True), 404
    #If any of the actions above fail, this stops the server from crashing.
    except:
        return jsonify(error=True), 500



#@app.route("/user", methods=['POST'])
#@requires_auth

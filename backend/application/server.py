
from flask import Flask
from flask import jsonify, request, g
from flask_cors import CORS
from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from .utils.auth import generate_token, verify_token, requires_auth, email_is_valid
import json
from . import app, client, mydb, users

class User():
    def __init__(self, _id, email):
        self.email = email
        self.active = True
        self._id = _id

def get_user_with_email_and_password(email,password):
    user = users.find_one({"email": email.lower()})
    if user and check_password_hash(user['password'], password):
        return user
    else:
        return None

@app.route("/Login", methods=['POST'])
def Login():
    try:
        incoming = request.get_json()
        if email_is_valid(incoming["email"]) is False:
            return jsonify(error=True), 404
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
        print
        return jsonify(error=True), 404

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
        incoming = request.get_json()
        email = incoming['email']

        #Sanitizes input before db-lookup
        if email_is_valid(incoming["email"]) is False:
            return jsonify(error=True), 404

        user = users.find_one({"email": email.lower()})
        if user:
            print("user already in db")
            return jsonify(message="email already exists"), 409

        hashed_password = generate_password_hash(incoming["password"], method='sha256')
        inserted_id = users.insert_one({
        'email':email.lower(),
        'password': hashed_password,
        'firstname': incoming['firstname'],
        'lastname': incoming['lastname']
        })
        user = User(
            _id = inserted_id,
            email = email,
        )
        if inserted_id:
            return jsonify(generate_token(user)), 201
        else:
            return jsonify(error=True), 404
    #If any of the actions above fail, this stops the server from crashing.
    except:
        return jsonify(error=True), 404

@requires_auth
@app.route("/user", methods=['GET'])
def get_user():
    try:
        email = g.current_user["email"]
        user = users.find_one({"email": email})
        return jsonify({
        'firstname' : user['firstname'],
        'lastname' : user['lastname']}), 200
    except:
        return jsonify(error=True), 404

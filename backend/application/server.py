
from flask import Flask
from flask import jsonify, request, g
from flask_cors import CORS
from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from .utils.auth import generate_token, verify_token, requires_auth, username_is_valid
import json
from . import app, client, mydb, users


def get_user_with_username_and_password(username,password):
    user = users.find_one({"username": username.lower()})
    if user and check_password_hash(user['password'], password):
        return user
    else:
        return None


@app.route("/Login", methods=['POST'])
def Login():
    try:
        incoming = request.get_json()
        if username_is_valid(incoming["username"]) is False:
            return jsonify(error=True), 404
        user = get_user_with_username_and_password(
        incoming["username"].lower().strip(), incoming["password"])
        if user:
            user = User(
                _id = str(user['_id']),
                username = user['username'],
            )
            return jsonify(generate_token(user))
        else:
            return jsonify(error=True), 404
    except:
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

from .. import app, client, mydb, users
from ..utils.auth import generate_token, verify_token, requires_auth, email_is_valid
from flask import jsonify, request, g
import json

@app.route("/user", methods=['GET'])
@requires_auth
def get_user():
    try:
        email = g.current_user["email"]
        #What if user cannot be found.
        user = users.find_one({"email": email})
        return jsonify({
        'firstname' : user['firstname'],
        'lastname' : user['lastname']}), 200
    except:
        return jsonify(error=True), 404

@app.route("/user", methods=['POST'])
@requires_auth
def update_user():
    try:
        email = g.current_user["email"]
        incoming = request.get_json()
        #What if user cannot be found.
        user = users.find_one({"email": email})
        user["firstname"] = incoming["firstname"]
        user["lastname"] = incoming["lastname"]
        users.save(user)
        return jsonify({
        'firstname' : user['firstname'],
        'lastname' : user['lastname']}), 200
    except:
        return jsonify(error=True), 404

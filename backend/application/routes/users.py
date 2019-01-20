from ..utils.auth import generate_token, verify_token, requires_auth, email_is_valid
from ..utils.db_handler import get_user_with_email, update_user
from ..utils.tools import fileUpload
from .. import app
from flask import jsonify, request, g
import json

@app.route("/user", methods=['GET'])
@requires_auth
def get_user():
    try:
        email = g.current_user["email"]
        #What if user cannot be found.
        user = get_user_with_email(email)
        if user:
            return jsonify({
            'firstname' : user['firstname'],
            'lastname' : user['lastname']}), 200
        else:
            return jsonify(error=True), 404
    except:
        return jsonify(error=True), 404

@app.route("/user", methods=['POST'])
@requires_auth
def update_user():
    try:
        email = g.current_user["email"]
        incoming = request.get_json()
        if request.files['file']:
            print("A file has been submitted.")
            file = request.files['file']
            print("Entering fileUpload function..")
            fileUpload(email,file)
        print(incoming)
        user = update_user(email, incoming)
        if user:
            return jsonify({
            'firstname' : user['firstname'],
            'lastname' : user['lastname']}), 200
        return jsonify(error=True), 404

    except:
        return jsonify(error=True), 500

"""sefsef"""

from flask import jsonify, request, g
from ..utils.auth import requires_auth
from ..utils.db_handler import get_user_with_email, update_user, update_user_profile_picture
from ..utils.tools import fileUpload
from .. import app

@app.route("/user", methods=['GET'])
@requires_auth
def get_user():
    """sefsef"""
    try:
        email = g.current_user["email"]
        #What if user cannot be found.
        user = get_user_with_email(email)
        if user:
            return jsonify({
                'firstname' : user['firstname'],
                'lastname' : user['lastname']}), 200
        return jsonify(error=True), 404
    except:
        return jsonify(error=True), 404

@app.route("/user", methods=['POST'])
@requires_auth
def post_user():
    """awdawd"""
    try:
        email = g.current_user["email"]
        incoming = request.get_json()
        user = update_user(email, incoming)
        if user:
            return jsonify({
                'firstname' : user['firstname'],
                'lastname' : user['lastname']}), 200
        return jsonify(error=True), 404

    except:
        return jsonify(error=True), 500

@app.route("/upload_profile_picture", methods=['POST'])
@requires_auth
def upload_user_profile_picture():
    """sefsef"""
    try:
        email = g.current_user["email"]
        if request.files['file'] is False:
            return jsonify(error=True), 502
        print("A file has been submitted.")
        file_from_req = request.files['file']
        filepath = fileUpload(file_from_req)
        user = update_user_profile_picture(email, filepath)
        if user:
            return jsonify({
                'filepath' : filepath}), 200
        return jsonify(error=True), 404

    except ValueError as err:
        return jsonify(error="Request did not receive the expected value: " + err), 500

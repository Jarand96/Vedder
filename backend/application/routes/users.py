"""sefsef"""

from flask import jsonify, request, g
from ..utils.auth import requires_auth
from ..utils.db_handler import get_user_with_email, insert_user_to_db
from ..utils.db_handler import update_user, get_user_with_id, get_posts_from_user
from ..utils.db_handler import update_user_profile_picture
from ..utils.tools import fileUpload, enrich_posts
from .. import app

@app.route("/user", methods=['GET'])
@requires_auth
def get_user():
    """sefsef"""
    try:
        _id = g.current_user["_id"]
        user = get_user_with_id(_id)
        print(user)
        users_posts = get_posts_from_user(_id)
        print(users_posts)
        users_posts_new = enrich_posts(users_posts)
        user['posts'] = users_posts_new
        if user:
            return jsonify(user), 200
        return jsonify(error=True), 404
    except:
        return jsonify(error=True), 404

@app.route("/user/<_id>", methods=['GET'])
@requires_auth
def get_profile_info(_id):
    """sefsef"""
    try:
        user = get_user_with_id(_id)
        users_posts = get_posts_from_user(_id)
        users_posts_new = enrich_posts(users_posts)
        user['posts'] = users_posts_new
        if user:
            return jsonify(user), 200
        return jsonify(error="User not found"), 404
    except:
        return jsonify(error=True), 404


@app.route("/user", methods=['POST'])
@requires_auth
def post_user():
    """awdawd"""
    try:
        email = g.current_user["email"]
        incoming = request.get_json()
        print(incoming)
        user = update_user(email, incoming)
        if user:
            return jsonify({
                'firstname' : incoming['firstname'],
                'lastname' : incoming['lastname'],
                'filename' : user['profile_pic']}), 200
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
        print(file_from_req)
        filepath, filename = fileUpload(file_from_req)
        print("This is the filepath: ", filepath)
        user = update_user_profile_picture(email, filename)
        if user:
            return jsonify({
                'filepath' : filepath,
                'filename' : filename
                }), 200
        return jsonify(error=True), 404

    except ValueError as err:
        return jsonify(error="Request did not receive the expected value: " + err), 500

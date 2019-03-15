from flask import jsonify, request, g
from ..utils.auth import requires_auth
from ..utils.tools import fileUpload
from .. import app

@app.route('/post', methods=['GET'])
@requires_auth
def get_posts():
    posts = [{
        'text' : "I dag har vi kost oss i finværet..",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "sefsefsef.png"}],
        'comments' : [],
        'public' : True,
        'user_id' : 'jarand@jarand@.no'
    }, {
        'text' : "Arsenal kamp om bare minutter her nå",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "arsenal.png"}],
        'comments' : [],
        'public' : True,
        'user_id' : 'jarand@jarand@.no'
    }, {
        'text' : "Et lite barn kom til verden i natt.",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "baby.jpeg"}],
        'comments' : [],
        'public' : True,
        'user_id' : 'jarand@jarand@.no'
    }, {
        'text' : "Et lite barn kom til verden i natt.",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "baby.jpeg"}],
        'comments' : [],
        'public' : True,
        'user_id' : 'jarand@jarand@.no'
    }]
    return posts, 200


@app.route('/post', methods=['POST'])
@requires_auth
def post_posts():
    """sefsef"""
    try:
        email = g.current_user["email"]
        #print("The current user is: " + email)
        #print(request.files)
        #print(request.form)
        post = {
            'images' : []
        }
        if request.files['file_0'] is False:
            return jsonify(error=True), 502
        for file in request.files:
            print(request.files[file])
            filepath, filename = fileUpload(request.files[file])
            post['images'].append({
                'filepath' : filepath,
                'filename' : filename
            })

        print("A file has been submitted.")
        file_from_req = request.files['file_0']
        print(file_from_req)
        print(request.form)
        return jsonify(message='success'), 200

    except ValueError as err:
        return jsonify(error="Request did not receive the expected value: " + err), 500

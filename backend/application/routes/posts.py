from flask import jsonify, request, g
from .. import app

@app.route('/post', methods=['GET'])
def get_posts():
    """sefsef"""
    posts = [{},{},{},{}]
    return posts, 200


@app.route('/post', methods=['POST'])
def post_posts():
    """sefsef"""
    posts = [{
        'text' : "I dag har vi kost oss i finværet..",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "sefsefsef.png"}]
    }, {
        'text' : "Arsenal kamp om bare minutter her nå",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "arsenal.png"}]
    }, {
        'text' : "Et lite barn kom til verden i natt.",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "baby.jpeg"}]
    }, {
        'text' : "Et lite barn kom til verden i natt.",
        'created' : "2019-03-07 17:25:47",
        'images' : [{'filename': "baby.jpeg"}]
    }]
    return posts, 200

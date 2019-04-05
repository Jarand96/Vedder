import os
import uuid
from werkzeug.utils import secure_filename
from .db_handler import get_user_with_id
from .. import app


#Saves a file to server with unique filename. Returns destination-path
def fileUpload(file):
    try:
        target = app.config['UPLOAD_FOLDER']
        if not os.path.isdir(target):
            os.mkdir(target)
            print("Created a directory")
        filename = str(uuid.uuid4())
        filepath = "/".join([target, filename])
        #If file already exis, give it another name
        file.save(filepath)
        return filepath, filename
    except:
        return None

def enrich_posts(posts):
    for post in posts:
        user = get_user_with_id(post['user_id'])
        user['_id'] = str(user['_id'])
        post['creator'] = user
    return posts

def valid_register_input(data):
    return True

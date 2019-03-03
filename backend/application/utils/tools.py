import os
import uuid
from werkzeug.utils import secure_filename
from .. import app


#Saves a file to server with unique filename. Returns destination-path
def fileUpload(file):
    try:
        print("Entered fileUpload function..Setting target folder.")
        target = app.config['UPLOAD_FOLDER']
        print("Target folder is: " + target)
        if not os.path.isdir(target):
            print("It is not a dir.")
            os.mkdir(target)
            print("Created a directory")
        print("Creating unique filename")
        filename = str(uuid.uuid4())
        print("The filename is: ", filename)
        destination="/".join([target, filename])
        print("this is the final filepath: ", destination)
        #If file already exis, give it another name
        file.save(destination)
        return destination
    except:
        return None


def valid_register_input(data):
    return True

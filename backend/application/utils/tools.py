import os
from werkzeug.utils import secure_filename
from .. import app


#Saves a file to server with unique filename. Returns destination-path
def fileUpload(email, file):
    try:
        print("Entered fileUpload function..Setting target folder.")
        target=os.path.join(app.config['UPLOAD_FOLDER'],'test_docs')
        print("Target folder is: " + target)
        if not os.path.isdir(target):
            print("It is not a dir.")
            os.mkdir(target)
            print("Created a directory")
        filename = str(uuid.uuid4())
        destination="/".join([target, filename])
        #If file already exis, give it another name
        file.save(destination)
        return destination
    except:
        return None


def valid_register_input(data):
    return True

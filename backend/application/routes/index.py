from flask import send_from_directory
from .. import app

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    print("hello")
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

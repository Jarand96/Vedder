from functools import wraps
import re
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request
from .. import app, client, mydb, users

FOURTY_EIGHT_H = 172800

def generate_token(user, expiration=FOURTY_EIGHT_H):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'id': str(user._id),
        'username': user.username,
    }).decode('utf-8')
    return token

def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
        #Avoid db injections by removing special characters from username.
        if username_is_valid(data["username"]) is False:
            return None
        user = users.find_one({"username": data["username"]})
        if user:
            return data
    except (BadSignature, SignatureExpired):
        return None

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return jsonify(message="Authentication is required to access this resource"), 401
    return decorated

def username_is_valid(username):
    sanitized_username = re.sub('[^A-Za-z0-9 ]+', '', username)
    if sanitized_username.lower()==username.lower() and len(username)<40 and len(username)>2:
        return True
    return False

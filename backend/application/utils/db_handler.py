from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

client = MongoClient("mongodb://localhost:27017/")
mydb = client["publisher_db"]
users = mydb["users"]

class User():
    def __init__(self, _id, email):
        self.email = email
        self.active = True
        self._id = _id


def get_user_with_email_and_password(email,password):
    print("in dbhandler, connecting do db.")
    user = users.find_one({"email": email.lower()})
    print(user)
    if user and check_password_hash(user['password'], password):
        print("User found! Returning...")
        return user
    else:
        return None

def user_already_in_db(email):
    user = users.find_one({"email": email.lower()})
    if user:
        return True

#Return a user object. return false if insertion not possible
def insert_user_to_db(user):
    hashed_password = generate_password_hash(incoming["password"], method='sha256')
    inserted_id = users.insert_one({
    'email': incoming['email'].lower(),
    'password' : hashed_password,
    'firstname' : incoming['firstname'],
    'lastname' : incoming['lastname']
    })
    if inserted_id:
        user = User(
            _id = inserted_id,
            email = email,
        )
        return user
    return None

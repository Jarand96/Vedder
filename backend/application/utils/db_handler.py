from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

client = MongoClient("mongodb://localhost:27017/")
mydb = client["publisher_db"]
users = mydb["users"]

def get_user_with_email_and_password(email, password):
    """insert docstring"""
    print("in dbhandler, connecting do db.")
    user = users.find_one({"email": email.lower()})
    print(user)
    if user and check_password_hash(user['password'], password):
        print("User found! Returning...")
        return user
    return None

def user_already_in_db(email):
    """zef"""
    print("Entered DB_Handler..Checking if user is in db")
    user = users.find_one({"email": email.lower()})
    if user:
        return True
    return False

#Return a user object. return false if insertion not possible
def insert_user_to_db(incoming):
    """inserts a newa user into mongodb"""
    print("Entered db_handler. Hashing password.")
    hashed_password = generate_password_hash(incoming["password"], method='sha256')
    print("inserting user to db.")
    inserted_id = users.insert_one({
        'email': incoming['email'].lower(),
        'password' : hashed_password,
        'firstname' : incoming['firstname'],
        'lastname' : incoming['lastname'],
        'profile_pic' : 'default.png'
    })
    if inserted_id:
        user = {
            "_id": inserted_id,
            "email": incoming['email'].lower(),
        }
        return user
    return None


def get_user_with_email(email):
    """zef"""
    print("in dbhandler, connecting do db.")
    user = users.find_one({"email": email.lower()})
    if user:
        return user
    return None

#Returns the updated user json-object.
def update_user(email, incoming):
    """sef"""
    user = users.find_one({"email": email})
    if user:
        user["firstname"] = incoming["firstname"]
        user["lastname"] = incoming["lastname"]
        users.save(user)
        return user
    return None

def update_user_profile_picture(email, filename):
    """zef"""
    user = users.find_one({"email": email})
    if user:
        user["profile_pic"] = filename
        users.save(user)
        return user
    return None

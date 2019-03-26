from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017/")
mydb = client["publisher_db"]
users = mydb["users"]
posts = mydb["posts"]

def get_user_with_email_and_password(email, password):
    """insert docstring"""
    user = users.find_one({"email": email.lower()})
    print(user)
    if user and check_password_hash(user['password'], password):
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
    """inserts a new user into mongodb"""
    hashed_password = generate_password_hash(incoming["password"], method='sha256')
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


def insert_post_to_db(post):
    """inserts a new post into database"""
    inserted_id = posts.insert_one(post)
    if inserted_id:
        return inserted_id
    return None

def like_post(post_id, email):
    """inserts a new post into database"""
    post = posts.find_one({"_id": ObjectId(post_id)})
    if email in post['liked_by']:
        post['liked_by'].remove(email)
        posts.save(post)
        return post
    post['liked_by'].append(email)
    posts.save(post)
    if post:
        return post
    return None

def get_user_with_email(email):
    """zef"""
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

def find_related_posts(email):
    """This function should return posts that are related to the user passed in"""
    cursor = posts.find({})
    all_posts = []
    for post in cursor:
        post['_id'] = str(post['_id'])
        all_posts.append(post)
    if all_posts:
        return all_posts
    return None

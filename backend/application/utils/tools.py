import os

def create_uploading_folder(email):
    #Start by stripping email from special characters
    stripped_mail = ''.join(e for e in email if e.isalnum())
    print(stripped_mail)
    my_file = "./uploads"+stripped_mail
    print(my_file)
    #Proceed by checking if a folder already exists for the user
    if my_file.exists():
        print("The FOLDER exists!")
        return True
    print("Folder does not exist.")


def valid_register_input(data):
    return True

import firebase_admin
from firebase_admin import credentials

firebase_config = {
  "apiKey": "AIzaSyCkW0dKGKVOr9Cp3anGEgyCYoAjfMPgr4A",
  "authDomain": "cryptochat-fae4d.firebaseapp.com",
  "databaseURL": "https://cryptochat-fae4d-default-rtdb.europe-west1.firebasedatabase.app/",
  "projectId": "cryptochat-fae4d",
  "storageBucket": "cryptochat-fae4d.appspot.com",
  "messagingSenderId": "806610307339",
  "appId": "1:806610307339:web:ffcdc5fff493f2f2f3fa0e",
  "measurementId": "G-Z7GWYFZQL8"

}

def initialize_firebase():
    cred = credentials.Certificate("path/to/serviceAccountKey.json")
    firebase_app = firebase_admin.initialize_app(cred, {
        'databaseURL': firebase_config['databaseURL']
    })
    return firebase_app

firebase_app = initialize_firebase()





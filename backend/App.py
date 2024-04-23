from flask import Flask
import pyrebase
from app.firebase_config import config
from app.routes import *


# Initialisation de Flask
app = Flask(__name__)

# Initialisation de Firebase
firebase = pyrebase.initialize_app(config)
db = firebase.database()

# Définition des routes
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/add_data', methods=['POST'])
def add_data_route():
    return add_data(db)

@app.route('/get_data', methods=['GET'])
def get_data_route():
    return get_data(db)

@app.route('/update_data', methods=['POST'])
def update_data_route():
    return update_data(db)

@app.route('/delete_data', methods=['DELETE'])
def delete_data_route():
    return delete_data(db)


if __name__ == "__main__":
    app.run()
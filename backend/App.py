import datetime
from app.models import Chat, Message, User
import pyrebase
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
from app.firebase_config import config
from app.routes import *

# Initialisation de Flask
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# Initialisation de Firebase
firebase = pyrebase.initialize_app(config)
db = firebase.database()

# Définition des routes
@app.route("/", methods=['GET'])
@cross_origin()
def stream():
    return jsonify(datetime.datetime.now())

@app.route("/message/get/<int:id>", methods=['GET'])
@cross_origin()
def get_message_route(id):
    return get_message(id)

@app.route("/message/post", methods=['POST'])
@cross_origin()
def post_message_route():
    return post_message(request)

@app.route("/chat/all", methods=['GET'])
@cross_origin()
def get_all_chats():
    return get_database()

@app.route("/chat/post", methods=['POST'])
@cross_origin()
def post_chat_route():
    return post_chat()

@app.route("/chat/<int:id>", methods=['GET'])
@cross_origin()
def get_chat_route(id):
    return get_chat(id)

@app.route("/chat/<int:id>/messages", methods=['GET'])
@cross_origin()
def get_chat_messages_route(id):
    return get_chat_messages(id)

@app.route("/chat/<int:id>/members", methods=['GET'])
@cross_origin()
def get_chat_members_route(id):
    return get_chat_members(id)


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
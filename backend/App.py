import datetime
from app.models import Chat, Message, User
import pyrebase
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
from app.database import database


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=['GET'])
@cross_origin()
def stream():
    return jsonify(datetime.datetime.now())

@app.route("/message/get/<int:id>", methods=['GET'])
@cross_origin()
def getMessage(id : int):
    if (id < database[0].Messages.__len__()):
        message =  database[0].Messages[id]
    else:
        message = Message()
    message_dict = message.toDict()
    return jsonify(message_dict)

@app.route("/message/post", methods=['POST'])
@cross_origin()
def postMessage():
    r_Id = request.json.get('Id')
    r_Sender = User(request.json.get('Sender').get('Username'),request.json.get('Sender').get('Password'))
    r_Content = request.json.get('Content')
    data = Message(r_Id,r_Sender,r_Content)
    database[0].addMessage(data)
    return jsonify(database[0].Messages.__len__())

@app.route("/chat/all", methods=['GET'])
@cross_origin()
def getDatabase():
    chats = []
    for chat in database:
        chats.append(chat.toDict())
    return chats

@app.route("/chat/post", methods=['POST'])
@cross_origin()
def postChat():
    r_Id = request.json.get('Id')
    r_Name = request.json.get('Name')
    r_Password = request.json.get('Password')
    r_Creator = User(request.json.get('Creator').get('Username'),request.json.get('Creator').get('Password'))
    data = Chat(r_Id,r_Name,r_Password, r_Creator,[], [r_Creator])
    database.append(data)
    return jsonify(database.__len__())

@app.route("/chat/<int:id>", methods=['GET'])
@cross_origin()
def getChat(id):
    chat : Chat
    if (id < database.__len__()):
        chat = database[id]
    else:
        chat = Chat()
    return jsonify(chat.toDict())

@app.route("/chat/<int:id>/messages", methods=['GET'])
@cross_origin()
def getChatMessages(id):
    messages : list
    if (id < database.__len__()):
        messages = database[id].getMessages()
    else:
        messages = []
    return jsonify(messages)

@app.route("/chat/<int:id>/members", methods=['GET'])
@cross_origin()
def getChatMembers(id):
    chat : list
    if (id < database.__len__()):
        chat = database[id].getMembers()
    else:
        chat = []
    return jsonify(chat)
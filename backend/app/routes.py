from flask import request, jsonify

from app.database import database
from app.models import Chat, Message, User

def add_data(db):
    data = request.json
    results = db.child("node").push(data)
    return jsonify(results), 201

def get_data(db):
    data = db.child("node").get()
    return jsonify(data.val()), 200

def update_data(db):
    data = request.json
    if 'id' not in data:
        return jsonify({"error": "ID is required"}), 400
    item_id = data['id']
    results = db.child("node").child(item_id).update(data)
    return jsonify(results), 200

def delete_data(db):
    item_id = request.args.get('id')
    if not item_id:
        return jsonify({"error": "ID is required for deletion"}), 400
    db.child("node").child(item_id).remove()
    return jsonify({"success": "Data deleted"}), 200


def get_chat(id):
    chat : Chat
    if (id < database.__len__()):
        chat = database[id]
    else:
        chat = Chat()
    return jsonify(chat.toDict())

def get_chat_members(id):
    chat : list
    if (id < database.__len__()):
        chat = database[id].getMembers()
    else:
        chat = []
    return jsonify(chat)

def get_chat_messages(id):
    messages : list
    if (id < database.__len__()):
        messages = database[id].getMessages()
    else:
        messages = []
    return jsonify(messages)

def post_chat():
    r_Id = request.json.get('Id')
    r_Name = request.json.get('Name')
    r_Password = request.json.get('Password')
    r_Creator = User(request.json.get('Creator').get('Username'),request.json.get('Creator').get('Password'))
    data = Chat(r_Id,r_Name,r_Password, r_Creator,[], [r_Creator])
    database.append(data)
    return jsonify(database.__len__())


def get_database():
    chats = []
    for chat in database:
        chats.append(chat.toDict())
    return chats


def post_message(rq):
    r_Id = rq.json.get('Id')
    r_Sender = User(rq.json.get('Sender').get('Username'),rq.json.get('Sender').get('Password'))
    r_Content = rq.json.get('Content')
    data = Message(r_Id,r_Sender,r_Content)
    database[0].addMessage(data)
    return jsonify(database[0].Messages.__len__())


def get_message(id : int):
    if (id < database[0].Messages.__len__()):
        message =  database[0].Messages[id]
    else:
        message = Message()
    message_dict = message.toDict()
    return jsonify(message_dict)
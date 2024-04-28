import datetime
from flask import Flask, Blueprint, app, current_app, jsonify, request, g
from flask_cors import CORS, cross_origin
from firebase_admin import auth as firebase_auth
from firebase_admin import auth, exceptions

from app.models.user import User
from app.models.message import Message
from app.models.chat import Chat
from app.services.firebase_service import ChatService 
from app.services.crypto_service import CryptoService
from app.firebase_config import firebase_app

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')
CORS(chat_blueprint)
chat_service = ChatService(firebase_app)  
crypto_service = CryptoService()



users = [
    {'id': '1', 'username': 'JohnDoe', 'password': 'pass123', 'email': 'john@example.com'},
]


def get_user_data_from_id(user_id):
    try:
        user_record = auth.get_user(user_id, app=firebase_app)
        return {
            'id': user_record.uid,
            'username': user_record.display_name,  # 
            'email': user_record.email
        }
    except exceptions.NotFound:
        current_app.logger.error(f"User with UID {user_id} not found in Firebase")
        return None
    except Exception as e:
        current_app.logger.error(f"An error occurred while fetching user data: {str(e)}")
        return None


def load_user_from_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Authorization token is required'}), 403
    token = auth_header.split(' ')[1]
    try:
        decoded_token = firebase_auth.verify_id_token(token, app=firebase_app)
        g.user = decoded_token
    except Exception as e:
        return jsonify({'error': 'Invalid token: ' + str(e)}), 401



### Vérifié
@chat_blueprint.route('create', methods=['POST'])
@cross_origin()
def create_chat():
    response = load_user_from_token()
    if response is not None:
        return response
    r_Id = ""
    r_Name = request.json['Name']
    r_Password = request.json['Password']
    r_Creator = User(request.json['Creator'].get('Username'),request.json['Creator'].get('Email'))
    data = Chat(r_Id,r_Name,r_Password, r_Creator,[], [r_Creator])
    if chat_service.add_chat(data):
        return jsonify({"success": True, "chat_id": str(data.Id)}), 201
    else:
        return jsonify({"error": "Échec de l'ajout du chat"}), 500



@chat_blueprint.route('<chat_id>/read', methods=['GET'])
@cross_origin()
def get_chat(chat_id):
    response = load_user_from_token()
    if response is not None:
        return response
    chat : Chat = chat_service.get_chat(chat_id)
    chat['Messages'] = []
    return jsonify(chat)

### Vérifié
@chat_blueprint.route('<chat_id>/messages/read', methods=['GET'])
@cross_origin()
def get_message(chat_id):
    response = load_user_from_token()
    if response is not None:
        return response
    messages = chat_service.get_messages(chat_id)
    decrypted_messages = []
    for message in messages:
        try:
            decrypted_content = crypto_service.decrypt(message['Content'])
            decrypted_message = {
                "Sender": message['Sender'],
                "Content": decrypted_content
            }
            decrypted_messages.append(decrypted_message)
        except Exception as e:
            current_app.logger.error(f"Error decrypting message: {str(e)}")
            decrypted_messages.append({"error": "Error decrypting message"})
    return jsonify(decrypted_messages), 200

### Vérifié
@chat_blueprint.route('<chat_id>/messages/create/', methods=['POST'])
@cross_origin()
def add_message(chat_id):
    # Charger l'utilisateur à partir du token
    response = load_user_from_token()
    if response:
        return response
    data = request.json
    if 'Content' not in data:
        return jsonify({'error': 'Message content is required'}), 400

    user_data = get_user_data_from_id(g.user['uid'])
    if not user_data:
        return jsonify({'error': 'User not found'}), 404
    user = User(Username=user_data['email'], Email=user_data['email'])
    encrypted_content = crypto_service.encrypt(data['Content'])
    print(encrypted_content)
    
    new_message = Message(Id="",Sender=user, Content=encrypted_content)
    message_id = chat_service.add_message(chat_id, new_message)
    if message_id:
        return jsonify({"success": True, "message_id": str(message_id)}), 201
    else:
        return jsonify({"error": "Failed to add message"}), 500
    
    


@chat_blueprint.route("/all", methods=['GET'])
@cross_origin()
def get_all_chats():
    return chat_service.get_chats()

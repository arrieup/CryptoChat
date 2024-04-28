from app.models.message import Message
from flask import Blueprint, app, current_app, jsonify, request, g
from firebase_admin import auth as firebase_auth
from app.services.firebase_service import ChatService 
from app.firebase_config import firebase_app
from app.models.user import User
from firebase_admin import auth, exceptions
from app.services.crypto_service import CryptoService

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')
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


@chat_blueprint.route('/create', methods=['POST'])
def create_chat():
    response = load_user_from_token()
    if response is not None:
        return response
    
    data = request.json
    if 'name' in data and 'password' in data:
        from app.models.chat import Chat
        new_chat = Chat(name=data['name'], password=data['password'], creator=g.user['uid'])
        if chat_service.add_chat(new_chat):
            return jsonify({"success": True, "chat_id": str(new_chat.id)}), 201
        else:
            return jsonify({"error": "Échec de l'ajout du chat"}), 500

@chat_blueprint.route('/add_message/<chat_id>', methods=['POST'])
def add_message(chat_id):
    # Charger l'utilisateur à partir du token
    response = load_user_from_token()
    if response:
        return response

    data = request.json
    if 'content' not in data:
        return jsonify({'error': 'Message content is required'}), 400

    user_data = get_user_data_from_id(g.user['uid'])
    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    user = User(username=user_data['username'], email=user_data['email'])
    encrypted_content = crypto_service.encrypt(data['content'])
    
    new_message = Message(sender=user, content=encrypted_content)
    message_id = chat_service.add_message(chat_id, new_message)
    if message_id:
        return jsonify({"success": True, "message_id": str(message_id)}), 201
    else:
        return jsonify({"error": "Failed to add message"}), 500
    
    
@chat_blueprint.route('/get_messages/<chat_id>', methods=['GET'])
def get_messages(chat_id):
    messages = chat_service.get_messages(chat_id)
    decrypted_messages = [{"sender": message.sender.to_dict(), "content": crypto_service.decrypt(message.content)} for message in messages]
    return jsonify(decrypted_messages), 200


from email import message
import pyrebase
from firebase_admin import auth, db

class AuthService:
    def __init__(self, firebase_config):
        self.firebase = pyrebase.initialize_app(firebase_config)
        self.auth = self.firebase.auth()

    def create_user_with_email_and_password(self, email, password):
        user = self.auth.create_user_with_email_and_password(email, password)
        firebase_admin_user = auth.create_user(email=email)
        return user

    def sign_in_with_email_and_password(self, email, password):
        user = self.auth.sign_in_with_email_and_password(email, password)
        return user

    def verify_id_token(self, token):
        # Vérification du token avec Firebase Admin
        decoded_token = auth.verify_id_token(token)
        return decoded_token

class ChatService:
    def __init__(self, firebase_app):
        self.firebase_app = firebase_app

    def get_chats(self):
        # Retrieve messages from a specific chat
        ref = db.reference(f'chats/', app=self.firebase_app)
        chats = ref.get()

        # Convert messages to a list of dictionaries
        chat_list = []
        if chats:
            for chat_id, chat_data in chats.items():
                chat_list.append(chat_data)
        return chat_list

    def get_chat(self, id : str):
        # Retrieve messages from a specific chat
        ref = db.reference(f'chats/'+id, app=self.firebase_app)
        chats = ref.get()
        return (chats)
        # Convert messages to a list of dictionaries
        chat_list = []
        if chats:
            for chat_id, chat_data in chats.items():
                chat_list.append(chat_data)
        return chat_list

    def add_chat(self, chat):
        # Ajout du chat à la Realtime Database
        ref = db.reference('chats', app=self.firebase_app)
        chat_id = ref.push().key
        chat.Id = chat_id
        ref.child(chat_id).set(chat.to_dict())
        return chat_id

    def add_message(self, chat_id, message):
        # Ajout d'un message à un chat spécifique
        ref = db.reference(f'chats/{chat_id}/Messages', app=self.firebase_app)
        message_id = ref.push().key
        ref.child(message_id).set(message.to_dict())
        return message_id
    
    def get_messages(self, chat_id):
        # Retrieve messages from a specific chat
        ref = db.reference(f'chats/{chat_id}/Messages', app=self.firebase_app)
        messages = ref.get()

        # Convert messages to a list of dictionaries
        message_list = []
        if messages:
            for message_id, message_data in messages.items():
                message_list.append(message_data)
        return message_list

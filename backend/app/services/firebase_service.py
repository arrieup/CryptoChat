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

    def add_chat(self, chat):
        # Ajout du chat à la Realtime Database
        ref = db.reference('chats', app=self.firebase_app)
        chat_id = ref.push().key
        ref.child(chat_id).set(chat.to_dict())
        return chat_id

    def add_message(self, chat_id, message):
        # Ajout d'un message à un chat spécifique
        ref = db.reference(f'chats/{chat_id}/messages', app=self.firebase_app)
        message_id = ref.push().key
        ref.child(message_id).set(message.to_dict())
        return message_id

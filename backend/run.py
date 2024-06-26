from flask import Flask
from app.routes.user_routes import user_blueprint
from app.routes.chat_routes import chat_blueprint
from app.services.firebase_service import AuthService, ChatService
import app.firebase_config as firebase_config_module
import env

def create_app():
    app = Flask(__name__)

    # Initialisation des services
    firebase_config = firebase_config_module.firebase_config
    auth_service = AuthService(firebase_config)
    firebase_app = firebase_config_module.firebase_app
    chat_service = ChatService(firebase_app)

    # Enregistrement des Blueprints
    app.register_blueprint(user_blueprint)
    app.register_blueprint(chat_blueprint)

    print("Firebase app initialized with config:", firebase_app.options)


    return app

if __name__ == '__main__':
    app = create_app()
    app.run() 

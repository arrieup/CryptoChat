from flask import Blueprint, request, jsonify
from app.services.firebase_service import AuthService  
import app.firebase_config as firebase_config_module 

user_blueprint = Blueprint('user', __name__, url_prefix='/user')
auth_service = AuthService(firebase_config_module.firebase_config)

@user_blueprint.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    try:
        user = auth_service.create_user_with_email_and_password(email, password)
        return jsonify({"message": "User created successfully", "user": user}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@user_blueprint.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    try:
        user = auth_service.sign_in_with_email_and_password(email, password)
        return jsonify({"message": "User logged in successfully", "user": user}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

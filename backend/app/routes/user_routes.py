from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from app.services.firebase_service import AuthService  
import app.firebase_config as firebase_config_module 

user_blueprint = Blueprint('user', __name__, url_prefix='/user')
CORS(user_blueprint)

auth_service = AuthService(firebase_config_module.firebase_config)



@user_blueprint.route('/register', methods=['POST'])
@cross_origin()
def register():
    email = request.json['Email']
    password = request.json['Password']
    try:
        user = auth_service.create_user_with_email_and_password(email, password)
        return jsonify({"message": "User created successfully", "user": user}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@user_blueprint.route('/login', methods=['POST'])
@cross_origin()
def login():
    email = request.json['Email']
    password = request.json['Password']
    try:
        user = auth_service.sign_in_with_email_and_password(email, password)
        return jsonify({"message": "User logged in successfully", "user": user}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

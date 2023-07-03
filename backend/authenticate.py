from flask import Blueprint, jsonify, request, make_response
from database import db, db_init
import json
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity,
                                set_access_cookies, set_refresh_cookies, create_refresh_token, unset_jwt_cookies)
from flask_cors import CORS
auth = Blueprint('auth', __name__)

bcrypt = Bcrypt()

database = db_init()

CORS(auth, supports_credentials=True,  origins=[
     'https://10.16.1.91:3000', 'https://localhost:3000'])


# class Users(db.Model):
#     id = db.Column('id', db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     email = db.Column(db.String(100))
#     password = db.Column(db.String(200))

#     def __init__(self, name, email, password):
#         self.name = name
#         self.email = email
#         self.password = password


@auth.route('/register', methods=['POST', 'GET'])
def register():
    new_name = request.json['name']
    new_email = request.json['email']
    new_pass = request.json['password']
    registered = database['Users'].find_one({'email': new_email})
    if not registered:
        hashed_password = bcrypt.generate_password_hash(
            new_pass).decode('utf-8')
        new_user = {
            'name': new_name,
            'email': new_email,
            'password': hashed_password,
            'groups': []
        }
        database['Users'].insert_one(new_user)
        return jsonify({'msg': 'Account created successfully'}), 200

    return jsonify({'msg': 'Action failed'}), 500


@auth.route('/login', methods=['POST', 'GET'])
def login():
    user_email = request.json['email']
    user_pass = request.json['pass']
    is_registered = database['Users'].find_one({'email': user_email})
    if not is_registered or not bcrypt.check_password_hash(is_registered['password'], user_pass):
        return jsonify({'response': 'wrong email address or password'}), 401

    access_token = create_access_token(identity=user_email)
    refresh_token = create_refresh_token(identity=user_email)
    groups = database['Users'].find_one({'email': user_email})['groups']
    resp = jsonify({'msg': 'logged in', 'groups': groups})
    print(resp)
    resp.headers.add('Access-Control-Allow-Origin', 'https://10.16.1.91:3000')
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    print(resp.headers)
    return resp, 200, {'Access-Control-Allow-Credentials': 'true'}


@auth.route("/logout", methods=["POST"])
@jwt_required()
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    if current_user:
        resp = jsonify({'msg': 'user refreshed'})
        access_token = create_access_token(identity=current_user)
        set_access_cookies(resp, access_token)
        return resp, 200
    return jsonify({'msg': 'login required'}), 401


@auth.route('/dashboard', methods=['GET', 'POST'])
@jwt_required()
def verify():
    current_user = get_jwt_identity()
    if not current_user:
        print('error')
    return jsonify(logged_in_as=current_user), 200, {'Access-Control-Allow-Credentials': 'true'}

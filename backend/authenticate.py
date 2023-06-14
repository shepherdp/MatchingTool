from flask import Blueprint, jsonify, request, make_response
from database import db
import json
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth = Blueprint('auth', __name__)


bcrypt = Bcrypt()


class Users(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(200))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


@auth.route('/login', methods=['POST', 'GET'])
def login():
    user_email = request.json['email']
    user_pass = request.json['pass']
    is_registered = Users.query.filter_by(email=user_email).first()
    if not is_registered or not bcrypt.check_password_hash(is_registered.password, user_pass):
        return jsonify({'response': 'wrong email address or password'}), 401

    access_token = create_access_token(identity=user_email)
    return jsonify({'token': access_token, "id": is_registered.id}), 200


@auth.route('/register', methods=['POST', 'GET'])
def register():
    new_name = request.json['name']
    new_email = request.json['email']
    new_pass = request.json['password']
    registered = Users.query.filter_by(email=new_email).first()
    if not registered:
        hashed_password = bcrypt.generate_password_hash(
            new_pass).decode('utf-8')
        new_user = Users(name=new_name, email=new_email,
                         password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        temp = Users.query.filter_by(name=new_name).first()
        print(temp.password)
        return jsonify({'resp': True})
    print('an account is already linked to {email}'.format(
        email=new_email))
    resp = make_response(json.dumps(
        {'resp': False}), 200)
    return resp


@auth.route('/dashboard', methods=['GET', 'POST'])
@jwt_required()
def verify():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

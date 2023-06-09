from flask import Blueprint, jsonify, request
from database import db
from flask_bcrypt import Bcrypt
from flask_login import (
    UserMixin,
    login_user,
    LoginManager,
    current_user,
    logout_user,
    login_required,
)

auth = Blueprint('auth', __name__)

login_manager = LoginManager()
login_manager.session_protection = "strong"
login_manager.login_view = "login"
login_manager.login_message_category = "info"

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


@auth.route('/login', methods=['POST'])
def login():
    user_name = request.json['name']
    user_pass = request.json['pass']
    print(user_name, user_pass)
    new_login = Users(name=user_name, password=user_pass)
    db.session.add(new_login)
    db.session.commit()
    temp = Users.query.filter_by(name=user_name).first()
    print(temp.name)
    return jsonify({'message': 'logged in successfully!'})


@auth.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
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
            return jsonify({'message': 'logged in successfully!'})
        print('an account is already linked to {email}'.format(
            email=new_email))
        return jsonify({'message': 'registration failed'})

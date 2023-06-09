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

login_manager.init_app(auth)
bcrypt.init_app(auth)


class Users(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(200))

    def __init__(self, name, password):
        self.name = name
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


# @auth.route('/register')
# def register():
#     pass

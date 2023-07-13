from flask import Flask, redirect, url_for, request, jsonify
from authenticate import bcrypt
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
import json
from database import db, db_init
from authenticate import auth
from flask_jwt_extended import JWTManager
from contents import content
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())
def create_app():
    app = Flask(__name__)
    # flask blueprints
    # blueprint for authenticate.py
    app.register_blueprint(auth, url_prefix='/user')
    # blueprint for contents.py
    app.register_blueprint(content, url_prefix='/member')
    CORS(app, supports_credentials=True,  origins=[
        'http://10.16.3.216:3000'])

    # config up flask_wtf
    app.config['SECRET_KEY'] = 'secret-key'

    # setting up flask-jwt for authentification
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
    app.config['JWT_COOKIE_SECURE'] = True
    app.config['JWT_COOKIE_SAMESITE'] = 'None'
    app.config['JWT_SECRET_KEY'] = os.environ.get(
        'JWT_SECRET_KEY')  # to be changed
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True
    app.config['JWT_TOKEN_EXPIRES'] = timedelta(days=10)
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=90)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=90)
    jwt = JWTManager(app)

    # setting up the database (to be changed to MySQL later)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.init_app(app)
    bcrypt.init_app(app)


    
    db_init()
    with app.app_context():
        db.create_all()
    return app

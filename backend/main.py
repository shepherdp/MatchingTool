from flask import Flask, redirect, url_for, request, jsonify
from authenticate import bcrypt
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
import json
from database import db_init
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
        'https://www.teammakeronline.com'])

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
    app.config['JWT_TOKEN_EXPIRES'] = timedelta(minutes=30)
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=90)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=90)
    jwt = JWTManager(app)

    bcrypt.init_app(app)


    
    db_init()
    return app

from flask import Flask, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from authenticate import bcrypt
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
import json
from database import db, db_init
from authenticate import auth
from flask_wtf.csrf import CSRFProtect
from flask_jwt_extended import JWTManager
from contents import content

app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/user')
app.register_blueprint(content, url_prefix='/member')
# csrf = CSRFProtect(app)
CORS(app, supports_credentials=True,  origins=[
     'https://10.16.1.91:3000', 'https://localhost:3000'])

# config up flask_wtf
app.config['SECRET_KEY'] = 'secret-key'

# setting up flask-jwt for authentification
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_COOKIE_SAMESITE'] = 'None'
app.config['JWT_SECRET_KEY'] = 'secretkey'  # to be changed
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_TOKEN_EXPIRES'] = timedelta(days=10)
app.config['JWT_SESSION_COOKIE'] = False
jwt = JWTManager(app)

# setting up the database (to be changed to MySQL later)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
bcrypt.init_app(app)


@app.route('/home')
def home():
    return {'names': ['tojo', 'heri']}


if __name__ == '__main__':
    db_init()
    with app.app_context():
        db.create_all()
    app.run(debug=True, use_reloader=False,
            host='0.0.0.0', ssl_context='adhoc')

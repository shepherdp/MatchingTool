from flask import Flask, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from authenticate import bcrypt
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
import json
from database import db
from authenticate import auth
from flask_wtf.csrf import CSRFProtect
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager, get_jwt, create_access_token, set_access_cookies

from contents import content

app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/user')
app.register_blueprint(content, url_prefix='/member')
# csrf = CSRFProtect(app)
CORS(app, supports_credentials=True,  origins=['http://10.16.1.91:3000'])

# config up flask_wtf
app.config['SECRET_KEY'] = 'secret-key'

# setting up flask-jwt for authentification
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_COOKIE_SAMESITE'] = 'None'
app.config['JWT_SECRET_KEY'] = 'secretkey'  # to be changed
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config["JWT_COOKIE_SECURE"] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)

# setting up the database (to be changed to MySQL later)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
bcrypt.init_app(app)

groups = {
    'name': '',
    'type': '',
    'participants': []
}


# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()['exp']
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             set_access_cookies(response, access_token)
#         return response
#     except (RuntimeError, KeyError):
#         return response


@app.route('/home')
def home():
    return {'names': ['tojo', 'heri']}


@app.route("/protected", methods=["GET", "POST"])
@jwt_required()
def protected():
    return jsonify(foo="bar")


@app.route('/add', methods=['GET'])
def add_members():
    if request.method == 'GET':
        users = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                 'ten', 'eleven', 'twelve', 'thirteen', 'forteen', 'fifteen', 'sixteen']
        return jsonify({'added': users})
    if request.method == 'POST':
        name = request.json['name']
        # with open(name) as json_file:
        #     req = json.load(json_file)
        # res = req['name']
        print(name)


@app.route('/groupname', methods=['POST'])
def getGroupName():
    name = request.json['name']
    groups['name'] = name
    print(name)
    return jsonify({'success': 'success post'})


@app.route('/addtype', methods=['POST'])
def getType():
    type = request.json['type']
    groups['type'] = type
    print(type)
    return jsonify({'success': 'success post'})


@app.route('/addmember', methods=['POST', 'GET'])
def addMember():
    new_member = request.json['new_member']
    groups['participants'].append(new_member)
    print(groups['participants'])
    return groups['participants']


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, use_reloader=False, host='0.0.0.0')

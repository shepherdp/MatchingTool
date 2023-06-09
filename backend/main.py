from flask import Flask, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from authenticate import bcrypt, login_manager
from flask_cors import CORS
import json
from database import db
from authenticate import auth


app = Flask(__name__)
app.register_blueprint(auth, url_prefix='/user')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = 'secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
login_manager.init_app(app)
bcrypt.init_app(app)

groups = {
    'name': '',
    'type': '',
    'participants': []
}


@app.route('/home')
def home():
    return {'names': ['tojo', 'heri']}


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

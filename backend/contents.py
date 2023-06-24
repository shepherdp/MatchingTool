from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db_init
content = Blueprint('content', __name__)

database = db_init()


@content.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'session expired, please login'}), 401
    return jsonify(logged_in_as=current_user), 200


@content.route('createmember', methods=['POST'])
@jwt_required()
def createMembers():
    new_name = request.json['name']
    new_name = new_name.upper()
    new_name = ' '.join(new_name.split())

    new_type = request.json['type']
    new_participants = request.json['participants']

    is_valid = database['Users'].find_one({'group_name': new_name})
    if is_valid:
        return jsonify({'msg': 'a group of the same name already exists'}), 500
    current_user = get_jwt_identity()
    owner = database['Users'].find_one({'email': current_user})['_id']
    new_group = {
        'group_name': new_name,
        'group_type': new_type,
        'participants': new_participants,
        'owner': owner
    }
    database['Groups'].insert_one(new_group)
    database['Users'].update_one({'email': current_user}, {
                                 '$push': {'groups': [new_name, new_type]}})
    groups = database['Users'].find_one({'_id': owner})['groups']
    return jsonify({'groups': groups}), 200

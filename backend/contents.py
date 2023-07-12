from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db_init
from teams import makeTeams
from reset import SendEmail
content = Blueprint('content', __name__)

database = db_init()


@content.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'session expired, please login'}), 401
    return jsonify(logged_in_as=current_user), 200


@content.route('/createmember', methods=['POST'])
@jwt_required()
def createMembers():
    new_name = request.json['name']
    new_name = new_name.upper()
    new_name = ' '.join(new_name.split())

    new_type = request.json['type']
    new_participants = request.json['participants']
    current_user = get_jwt_identity()
    owner = database['Users'].find_one({'email': current_user})['_id']
    is_valid = database['Groups'].find_one(
        {'group_name': new_name, 'owner': owner})
    if is_valid:
        return jsonify({'msg': 'a group of the same name already exists'}), 500
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


@content.route('/updateparticipants', methods=['POST'])
@jwt_required()
def UpdateParticipants():
    updated_participants = request.json['participants']
    group_name = request.json['group_name']
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401

    owner = database['Users'].find_one({'email': current_user})['_id']
    database['Groups'].update_one({"owner": owner, 'group_name': group_name}, {
                                  '$set': {'participants': updated_participants}})
    groups = database['Users'].find_one({'_id': owner})['groups']
    return jsonify({'groups': groups}), 200


@content.route('/maketeams', methods=['POST'])
@jwt_required()
def create_teams():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    group_name = request.json['group_name']
    activity = request.json['activity_name']
    per_team = request.json['size']
    matching_option = request.json['matching_option']
    restrictions = request.json['restrictions']

    owner = database['Users'].find_one({'email': current_user})['_id']

    participants = database['Groups'].find_one({'owner': owner, 'group_name': group_name})[
        'participants']

    in_previous_pairs = database['Groups'].find_one(
        {'owner': owner, 'group_name': group_name})

    prev_pairs = []

    if 'prev_ratings' in in_previous_pairs:
        for key, value in in_previous_pairs['prev_ratings'].items():
            prev_pairs.append([key, list(value.keys())[0],
                              value[list(value.keys())[0]]])
    if len(restrictions) > 0:
        prev_pairs += restrictions

    teams, out_prev_matchings = makeTeams(participants=participants,
                                          matching_option=matching_option, size=int(per_team), previous_pairs=prev_pairs)

    updated_prev_matchings = {}
    for pairs in out_prev_matchings:
        if type(pairs[0]) != str:
            updated_prev_matchings[pairs[0].name] = {}
            updated_prev_matchings[pairs[0].name][pairs[1].name] = pairs[-1]

    database['Teams'].insert_one({
        activity: teams,
        'owner': owner,
        'group_name': group_name
    })
    database['Groups'].update_one({'owner': owner, 'group_name': group_name}, {
                                  '$set': {'restrictions': restrictions}})

    database['Groups'].update_one({'owner': owner, 'group_name': group_name},
                                  {'$set': {'prev_ratings': updated_prev_matchings}})

    return jsonify({'teams': teams, 'activity': activity}), 200


@content.route('/getparticipants', methods=['GET', 'POST'])
@jwt_required()
def GetParticipants():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    if request.method == 'GET':
        groups = database['Users'].find_one({'email': current_user})['groups']
        return jsonify({'groups': groups}), 200

    group_name = request.json['group_name']
    print(group_name)
    owner = database['Users'].find_one({'email': current_user})['_id']
    participants = database['Groups'].find_one(
        {'owner': owner, 'group_name': group_name})['participants']

    try:
        restrictions = database['Groups'].find_one(
            {'owner': owner, 'group_name': group_name})['restrictions']
    except Exception as e:
        restrictions = []
    return jsonify({'participants': participants, 'restrictions': restrictions}), 200


@content.route('/editparticipants', methods=['POST'])
@jwt_required()
def EditParticipants():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    owner = database['Users'].find_one({'email': current_user})['_id']
    group_name = request.json['group_name']
    updated_participants = request.json['participants']
    database['Groups'].replace_one({'owner': owner, 'group_name': group_name}, {
                                   'participants': updated_participants})
    return jsonify({'msg': 'update successful'}), 200


@content.route('/previousteams', methods=['POST'])
@jwt_required()
def GetPreviousTeams():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401

    owner = database['Users'].find_one({'email': current_user})['_id']
    group_name = request.json['group_name']
    raw_team_data = database['Teams'].find(
        {'owner': owner, 'group_name': group_name})

    teams_list = []

    for team in raw_team_data:
        name = list(team.keys())[1]
        teams = team[name]
        teams_list.append([name, teams])

    return jsonify({'teams': teams_list}), 200

@content.route('/deletegroups', methods=['POST'])
@jwt_required()
def DeleteGroups():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    
    owner = database['Users'].find_one({'email': current_user})['_id']
    name = request.json['groupName']

    database['Teams'].delete_many({'owner':owner, 'group_name': name})
    groups = database['Users'].find_one({'_id':owner})['groups']
    groups = list(groups)
    for group in groups:
        if group[0] == name:
            groups.remove(group)

    database['Users'].update_one({'_id':owner}, {'$set':{'groups':groups}})
    database['Groups'].delete_one({'owner':owner, 'group_name': name})

    return jsonify({'msg': 'group deleted successfully'}), 200

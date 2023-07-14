import jwt
from flask import Blueprint, jsonify, request, make_response
from database import db_init
import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity,
                                set_access_cookies, set_refresh_cookies, create_refresh_token, unset_jwt_cookies)
from flask_cors import CORS
auth = Blueprint('auth', __name__)
from reset import SendEmail
bcrypt = Bcrypt()

database = db_init()
CORS(auth, origins='https://www.teammakeronline.com', supports_credentials=True)

@auth.route('/register', methods=['POST', 'GET'])
def register():
    '''
    creates user profile
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    new_name = request.json['name']
    new_email = request.json['email']
    new_pass = request.json['password']

    # checks if the email address is already in database
    registered = database['Users'].find_one({'email': new_email})
    if not registered:
        # hash password and decode it with utf-8 so that it can be stored as str
        hashed_password = bcrypt.generate_password_hash(
            new_pass).decode('utf-8')
        new_user = {
            # mongodb will create the user id (_id) automatically
            'name': new_name,
            'email': new_email,
            'password': hashed_password,
            'groups': []
        }
        database['Users'].insert_one(new_user)
        return jsonify({'msg': 'Account created successfully'}), 200

    return jsonify({'msg': 'Action failed'}), 500


@auth.route('/login', methods=['POST', 'GET'])
def login():
    '''
    verify usr credential and grant access to secure pages
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    user_email = request.json['email']
    user_pass = request.json['pass']

    # check if email address exists in database
    is_registered = database['Users'].find_one({'email': user_email})

    # checks if email address exists in the database and if the password entered matches the one stored
    if not is_registered or not bcrypt.check_password_hash(is_registered['password'], user_pass):
        return jsonify({'response': 'wrong email address or password'}), 401

    # creates token to be sent to the frontend
    access_token = create_access_token(identity=user_email)
    # refresh token is no longer being used
    refresh_token = create_refresh_token(identity=user_email)
    groups = database['Users'].find_one({'email': user_email})['groups']
    resp = jsonify({'msg': 'logged in', 'groups': groups})

    # adds the token to response header (the token will be set as cookie in the browser)
    set_access_cookies(resp, access_token, max_age=7776000, domain='.teammakeronline.com')
    set_refresh_cookies(resp, refresh_token, max_age=7776000, domain='.teammakeronline.com')
    return resp, 200


@auth.route("/logout", methods=["POST"])
@jwt_required()
def logout_with_cookies():
    '''
    logs user out and clear token from cookie
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    '''
    refreshes cookie so that users are not logged out automatically when it expires (to be implemented)
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    current_user = get_jwt_identity()
    if current_user:
        resp = jsonify({'msg': 'user refreshed'})
        access_token = create_access_token(identity=current_user)
        set_access_cookies(resp, access_token)
        return resp, 200
    return jsonify({'msg': 'login required'}), 401


@auth.route('/reset', methods=['POST'])
def CheckValidity():
    '''
    verify if the user has an account then send a link to reset password
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    email = request.json['email']
    is_member = database['Users'].find_one({'email': email})
    if not is_member:
        return jsonify({'msg': 'We could not locate any account linked to {}'.format(email)}), 404

    # encodes a token from the user email address and sets the expiration date to 30minutes after creation
    reset_token = jwt.encode({'user_email': email, "exp": datetime.datetime.now(
        tz=datetime.timezone.utc) + datetime.timedelta(minutes=30)}, 'secret', algorithm='HS256')
    SendEmail(recipient=email, token=reset_token)
    return jsonify({'msg': 'email sent successfully'}), 200


@auth.route('/recover', methods=['POST'])
def RecoverMember():
    '''
    verify is reset password link is valid then proceed with updating the user password on the server
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    user_token = request.json['token']
    new_pass = request.json['new_pass']

    # decodes the token sent by the user to get email address under it
    try:
        user = jwt.decode(user_token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'msg': 'the link has expired, please request a new one'}), 401
    print(user)
    database['Users'].update_one({'email': user['user_email']}, {'$set': {'password': bcrypt.generate_password_hash(
        new_pass).decode('utf-8')}})

    return jsonify({'msg': 'password update successfully'}), 200


@auth.route('/dashboard', methods=['POST'])
@jwt_required()
def verify():
    '''
    main page for when a user is logged in. this route will be queried everytime to make sure that the user is currently logged in
    before they can access any of the private routes
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    return jsonify(logged_in_as=current_user), 200, {'Access-Control-Allow-Credentials': 'true'}


@auth.route('/delete', methods=['GET'])
@jwt_required()
def DeleteAcc():
    '''
    deletes user profile and everything related to it
    inputs:
    outputs: json(key:str, value:str) server response
             status(int) => status code based on server response
    '''
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    owner = database['Users'].find_one({'email': current_user})['_id']
    database['Teams'].delete_many({'owner': owner})
    database['Groups'].delete_many({'owner': owner})
    database['Users'].delete_many({'_id': owner})
    response = jsonify({"msg": "account deleted successfully"})
    unset_jwt_cookies(response)
    return response, 200

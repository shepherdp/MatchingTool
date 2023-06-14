from flask import Flask, Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from authenticate import Users

content = Blueprint('content', __name__)


@content.route('/dashboard', methods=['GET', 'POST'])
@jwt_required
def verify():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

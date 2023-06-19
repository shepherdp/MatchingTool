from flask import Flask, jsonify, request
from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# since you already have the table classes in a different file, simple import them here
# for example if you have the classes in a file called database.py, you can import them this way:
# from database import *

app = Flask('__name__')
CORS(app)
# db = SQLAlchemy()

# here is for creating an account: uncomment the commented part and change the names based on your class name

my_students = ['one', 'two', 'three', 'four', 'five', 'six', 'seve']


@app.route('/register', methods=['POST'])
def register():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    response = jsonify({'msg': [name, email, password]})
    return response

# here is for creating a "class" section for each user. this section will contain the name of the class, the list of students and their ratings
# please note: the id for the table here should not be automatically generated(unlike in the Users table), this is because each student will have
# the same ID, which is the ID of the user


@app.route('/class', methods=['POST', 'GET'])
def addCLass():
    if request.method == 'GET':
        return jsonify({'students': my_students})
    group_name = request.json['group_name']  # for example (CSC226)
    # for example (class, sport, coworkers, etc)
    group_type = request.json['groupe_name']
    students = request.json['students']  # this is a list
    ratings = request.json['ratings']  # this is a list
    if len(students) != len(ratings):
        return jsonify({'msg': 'mismatch! check that each student has a rating'})
    # since the user is not authenticated, we have to send the user's email address with the request so that we can find them in the database
    email = request.json['email']
    # find_user = Users.query.filter_by(email=email).first()
    # if not user:
    # return jsonify({'msg':'user not found'})

    # id = find_user.id

    # assuming you named the table 'Classes', this is how you add the students:
    # for i in range(len(students)):
    # new_student = Classes(user_id=id, student=students[i], rating=ratings[i], group_name=group_name, group_type= group_type)
    # db.session.add(new_student)
    # db.session.commit()
    return jsonify({'msg': 'students added successfully'})


@app.route('/getstudents', methods=['GET'])
def getStudents():
    return jsonify({'students': my_students})


if __name__ == '__main__':
    # with app.app_context():
    # db.create_all()
    app.run(debug=True, use_reloader=False, host='0.0.0.0', port=8000)

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class ClassTable(db.Model):
    class_id = db.Column('class_id', db.Integer, primary_key=True)
    class_name = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('Users')

    def __init__(self, class_name, user):
        self.class_name = class_name
        self.user = user

class StudentTable(db.Model):
    student_id = db.Column('student_id', db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    rating = db.Column(db.Integer)
    class_id = db.Column(db.Integer, db.ForeignKey('class_table.class_id'))
    class_table = db.relationship('ClassTable')

    def __init__(self, first_name, last_name, email, rating, class_table):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.rating = rating
        self.class_table = class_table


class PartnerTable(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    id_1 = db.Column(db.Integer)
    id_2 = db.Column(db.Integer)
    rating = db.Column(db.Integer)

    def __init__(self, id_1, id_2, rating):
        self.id_1 = id_1
        self.id_2 = id_2
        self.rating = rating


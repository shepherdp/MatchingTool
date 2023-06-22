from flask_sqlalchemy import SQLAlchemy
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())


def db_init():
    client = MongoClient(os.environ.get('MONGODB_URI'))
    database = client[os.environ.get('DB_NAME')]
    return database


db = SQLAlchemy()

# Import Flask
from flask import Flask

# Iniiate the flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'Here you put a secret key as a string'

# Call the routes code
from digitRecognizer import routes
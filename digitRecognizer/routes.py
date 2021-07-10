# Flask
from flask import render_template, request, jsonify
from digitRecognizer import app

# Utils
import base64
from io import BytesIO

# Image Processing
import cv2
from PIL import Image
import numpy as np

# Deep Learning (Keras)
from keras import backend as K
from keras.models import load_model
K.image_dim_ordering = 'th'

# Process the incoming image then use the pre-trained model to return a prediction
def recognize(img, model):
    # Process the image:
    img = cv2.resize(img, dsize=(28,28))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = img.reshape((-1,28,28,1))
    img = img / 255
    return model.predict(img, steps=1)[0]


# Load the pre-trained model
model = load_model(f'myModel.model')


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return render_template("home.html")
    if request.method == 'POST':
        # Get the drawn image from the canvas in the front-end
        canvas_image = request.form['save_image']
        offset = canvas_image.index(',')+1
        # Process the image
        img_bytes = base64.b64decode(canvas_image[offset:])
        img = Image.open(BytesIO(img_bytes))
        img  = np.array(img)
        # Call the recognition function
        result = recognize(img, model)
        
        # Send the predictions back to the front-end
        return jsonify({'p0' : str(result[0]), 'p1' : str(result[1]), 'p2' : str(result[2]), 
                        'p3' : str(result[3]), 'p4' : str(result[4]), 'p5' : str(result[5]), 
                        'p6' : str(result[6]), 'p7' : str(result[7]), 'p8' : str(result[8]), 
                        'p9' : str(result[9])})
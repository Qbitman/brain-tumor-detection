from flask import Flask, request, jsonify
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import os
import cv2
from flask_cors import CORS
from PIL import Image, ImageOps

        
app = Flask(__name__)
CORS(app) 


UPLOAD_FOLDER = 'src/img/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    
    model = load_model('./brain_tumor_predictor.h5', compile=False)
    file = Image.open(request.files['image'])
    if file and allowed_file(file.filename):
        img = cv2.imread(file)
        size = (200,200)
        img = cv2.resize(img, size)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = img.astype("float32") / 255.0
        img = np.expand_dims(img, axis=-1)
        img = np.expand_dims(img, axis=0)
        
        file = ImageOps.fit(file, size, Image.ANTIALIAS)

        # # Make predictions on the image
        # prediction = model.predict(img)
        # return jsonify(str(prediction))
        # Set the appropriate headers for CORS policy
        # response = jsonify(str(model.predict(img)))
        # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        # response.headers.add('Access-Control-Allow-Credentials', 'true')
        # response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response = jsonify(str(model.predict(img)))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    else:
        return 'Invalid file type! Allowed file types are: png, jpg, jpeg'

if __name__ == '__main__':
    app.run(debug=True)

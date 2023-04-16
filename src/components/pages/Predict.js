import React, { useEffect, useState } from 'react';
import '../../App.css';
import * as tf from '@tensorflow/tfjs';


export default function Predict() {
  const [model, setModel] = useState(null);

  async function loadModel() {
    const loadedModel = await tf.loadLayersModel("https://raw.githubusercontent.com/Qbitman/brain-tumor-detection/main/model.json");
    console.log("Model loaded");
    setModel(loadedModel);
  }

  useEffect(() => {
    loadModel();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const imageFile = e.target.elements.image.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = async () => {
        const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat().div(tf.scalar(255.0)).expandDims();
        const prediction = await TumorDetection(model, tensor);
        console.log(prediction);
      };
    };
    reader.readAsDataURL(imageFile);
  }

  async function TumorDetection(model, image) {
    const prediction = await model.predict(image).data();
    return prediction;
  }

  return (
    <div className="predict">
      <form className="form-design" onSubmit={handleFormSubmit}>
        <div className='UploadBox'>
          <h3>Prediction Model</h3>
          <label className="custom-file-upload">
            <input type="file" name="image" />
            Upload .jpg
          </label>
          <button className="button button-black" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

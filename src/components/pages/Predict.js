import React, { useEffect, useState } from 'react';
import '../../App.css';
import * as tf from '@tensorflow/tfjs';


export default function Predict() {
  const [model, setModel] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [predictionLabel, setPredictionLabel] = useState(null);

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
        const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([200, 200]).mean(2).expandDims(2).expandDims().toFloat().div(tf.scalar(255.0));
        const prediction = await TumorDetection(model, tensor);
        setPredictionLabel(prediction);
        setImageSrc(image.src);
        console.log(prediction);
      };
    };
    reader.readAsDataURL(imageFile);
  }

  async function TumorDetection(model, image) {
    const prediction = await model.predict(image).data();
    const label = prediction[1] > prediction[0] ? 'Tumor detected' : 'No tumor detected';
    return label;
  }

  return (
    <div className="predict">
      <form className="form-design" onSubmit={handleFormSubmit}>
        <div className='UploadBox'>
          <h4>Choose Brain MRI Scan</h4>
          <label className="custom-file-upload">
            <input type="file" name="image" />
          </label>
          <button className="button button-black" type="submit">Submit</button>
        </div>
      </form>
      <div className='outputCard'>
        <h4>Prediction Output</h4>
        <div className='imageSize'>
        <div className='uploadedImage'>
        {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
        </div>
        </div>
        <div className='outputText'>
        {predictionLabel && (
        <p className={predictionLabel === 'Tumor detected' ? 'tumor-label' : 'healthy-label'}>
          Prediction: {predictionLabel}
        </p>)}
        </div>
      </div>
    </div>
  )
}

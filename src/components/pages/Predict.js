import React from 'react';
import '../../App.css';

export default function Predict() {
  return (
    <div className="predict">

        <form className="form-design">
        <h3>Prediction Model</h3>
        <label class="custom-file-upload">
            <input type="file"/>
            Upload .jpg
        </label>
          <button className="button button-black" type="submit">Submit</button>
        </form>
      </div>
  )
}

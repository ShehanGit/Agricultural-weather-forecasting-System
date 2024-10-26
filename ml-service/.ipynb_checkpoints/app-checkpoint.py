from flask import Flask, request, jsonify
import numpy as np
import joblib

# Initialize Flask app
app = Flask(__name__)

# Load the saved model and label encoder
model = joblib.load("model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.json
    
    # Extract features in the order expected by the model
    features = np.array([[data['N'], data['P'], data['K'], data['temperature'], 
                          data['humidity'], data['ph'], data['rainfall']]])
    
    # Predict the crop type
    prediction = model.predict(features)
    crop = label_encoder.inverse_transform(prediction)  # Convert numeric label back to crop name
    
    # Return prediction as JSON
    return jsonify({"Recommended Crop": crop[0]})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

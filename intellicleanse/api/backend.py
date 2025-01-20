from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend interaction

# Route to handle dataset upload and cleaning
@app.route('/data', methods=['POST'])
def upload_data():
    try:
        file = request.files['file']
        if not file:
            return jsonify({"error": "No file provided"}), 400
        
        # Read the dataset using pandas
        data = pd.read_csv(io.StringIO(file.stream.read().decode("UTF8")), delimiter=',')
        print(data.head())  # Print the first few rows of the data for debugging
        return jsonify({"data": data.to_dict(orient='split')})
    except Exception as e:
        print(f"Error in /data route: {str(e)}")  # Log error for debugging
        return jsonify({"error": str(e)}), 500

# Route to clean data (remove duplicates, handle missing values)
@app.route('/clean', methods=['POST'])
def clean_data():
    try:
        # Get the cleaning options from the frontend
        request_data = request.get_json()
        data = pd.DataFrame(request_data['data'])
        remove_duplicates = request_data.get('remove_duplicates', False)
        missing_value_option = request_data.get('missing_value_option', 'mean')
        custom_value = request_data.get('custom_value', None)

        # Handle remove duplicates option
        if remove_duplicates:
            data = data.drop_duplicates()

        # Handle missing values option
        if missing_value_option == 'mean':
            data = data.fillna(data.mean())
        elif missing_value_option == 'median':
            data = data.fillna(data.median())
        elif missing_value_option == 'custom' and custom_value:
            data = data.fillna(custom_value)
        elif missing_value_option == 'flag':
            data = data.fillna('MISSING')

        # Return cleaned data
        return jsonify({"data": data.to_dict(orient='split')})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

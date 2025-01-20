from flask import Flask, jsonify, request
import mysql.connector
from mysql.connector import Error
import pandas as pd

app = Flask(__name__)

# Database configuration
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""  # Replace with your MySQL password if needed
DB_NAME = "intellicleanse"

from flask_cors import CORS

# Enable CORS
CORS(app)

# Connect to MySQL
try:
    db = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    if db.is_connected():
        print("Successfully connected to the database")
except Error as e:
    print(f"Failed to connect to the database: {e}")

# Test database endpoint
@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        cur = db.cursor()
        # Create a sample table if it doesn't exist
        cur.execute('''CREATE TABLE IF NOT EXISTS test (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100))''')
        cur.close()
        return jsonify({"message": "Database Connected Successfully and Table Created!"})
    except Error as e:
        return jsonify({"message": f"Error: {e}"})

# Preview and profiling endpoint
@app.route('/previewandprofiling', methods=['GET'])
def preview_summary():
    table_name = request.args.get('files')  # Table name passed as a query parameter
    if not table_name:
        return jsonify({"error": "Table name is required"}), 400

    try:
        query = f"SELECT * FROM {table_name}"
        df = pd.read_sql(query, db)  # Load the table into a Pandas DataFrame

        # Generate summary report
        summary = {
            "column_names": df.columns.tolist(),
            "data_types": df.dtypes.astype(str).tolist(),
            "missing_values": df.isnull().sum().tolist(),
            "duplicates": df.duplicated().sum(),
            "key_statistics": df.describe(include="all").to_dict()
        }

        return jsonify(summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)

# from flask import Flask, request, jsonify
# import pandas as pd
# from sqlalchemy import create_engine
# from flask_cors import CORS
# import io

# app = Flask(__name__)

# # Enable CORS
# CORS(app)

# # Database connection (replace with your actual database credentials)
# DB_URL = "mysql+pymysql://root:@localhost:3306/intellicleanse"  # Update username/password if needed
# engine = create_engine(DB_URL)

# # Function to fetch file from the database
# def fetch_file_from_db(file_id):
#     query = f"SELECT data FROM files WHERE id = {file_id}"
#     with engine.connect() as conn:
#         result = conn.execute(query).fetchone()
#         if result:
#             return result[0]  # Return the file data
#         else:
#             return None

# # Upload file and create table endpoint
# @app.route('/upload', methods=['POST'])
# def upload_file():
#     # Fetch file ID from the request body
#     file_id = request.json.get('file')
#     if not file_id:
#         return jsonify({"error": "File ID is required"}), 400

#     try:
#         # Fetch the file from the database
#         file_data = fetch_file_from_db(file_id)
#         if not file_data:
#             return jsonify({"error": f"File with ID {file_id} not found in the database"}), 404

#         # Read the file into a pandas DataFrame
#         try:
#             df = pd.read_csv(io.StringIO(file_data.decode('utf-8')))
#         except Exception:
#             df = pd.read_excel(io.BytesIO(file_data))

#         # Generate table name (e.g., based on file ID)
#         table_name = f"table_{file_id}"

#         # Write DataFrame to the database
#         df.to_sql(table_name, con=engine, if_exists='replace', index=False)

#         return jsonify({"message": "File uploaded and table created successfully!", "table_name": table_name}), 200
#     except Exception as e:
#         print(f"Error processing file: {e}")
#         return jsonify({"error": f"Error processing file: {str(e)}"}), 500

# # Preview and profiling endpoint
# @app.route('/previewandprofiling', methods=['GET'])
# def previewandprofiling():
#     table_name = request.args.get('data')  # Get table name from query parameters
#     if not table_name:
#         return jsonify({"error": "Table name is required"}), 400

#     try:
#         # Validate if the table exists
#         if not engine.dialect.has_table(engine, table_name):
#             return jsonify({"error": f"Table '{table_name}' does not exist"}), 404

#         query = f"SELECT * FROM {table_name} LIMIT 10"
#         df = pd.read_sql(query, engine)

#         summary = {
#             "column_names": df.columns.tolist(),
#             "data_types": df.dtypes.astype(str).tolist(),
#             "missing_values": df.isnull().sum().tolist(),
#             "duplicates": df.duplicated().sum(),
#             "key_statistics": df.describe(include="all").to_dict()
#         }
#         return jsonify(summary), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Test database connection endpoint
# @app.route('/test_db', methods=['GET'])
# def test_db():
#     try:
#         with engine.connect() as conn:
#             conn.execute('''CREATE TABLE IF NOT EXISTS test_table (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100))''')
#         return jsonify({"message": "Database connected and test table created successfully!"}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to connect to the database: {e}"}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

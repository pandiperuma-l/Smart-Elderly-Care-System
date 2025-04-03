from flask import Flask, request, jsonify
import sqlite3
from twilio.rest import Client
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend requests

# Twilio Configuration
TWILIO_ACCOUNT_SID = ""
TWILIO_AUTH_TOKEN = ""
TWILIO_PHONE_NUMBER = ""
CAREGIVER_PHONE_NUMBER = ""

# Initialize Twilio client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Function to connect to the database
def connect_db():
    return sqlite3.connect('elderly_care.db')

@app.route('/')
def home():
    return "Elderly Care System is Running!"

# Send SMS Alert
def send_sms_alert(message):
    client.messages.create(
        body=message,
        from_=TWILIO_PHONE_NUMBER,
        to=CAREGIVER_PHONE_NUMBER
    )

# Route to add health monitoring data
@app.route('/add_health', methods=['POST'])
def add_health():
    data = request.json
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO health_monitoring (patient_name, heart_rate, blood_pressure, glucose_level)
        VALUES (?, ?, ?, ?)
    ''', (data['patient_name'], data['heart_rate'], data['blood_pressure'], data['glucose_level']))
    conn.commit()
    conn.close()

    if data['heart_rate'] > 100 or data['glucose_level'] > 200:
        send_sms_alert(f"🚨 ALERT: {data['patient_name']} has abnormal health readings! Heart Rate: {data['heart_rate']}, Glucose: {data['glucose_level']}")

    return jsonify({"message": "Health data added successfully!"})

# Route to add safety monitoring data
@app.route('/add_safety', methods=['POST'])
def add_safety():
    data = request.json
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO safety_monitoring (patient_name, fall_detected, inactivity_time)
        VALUES (?, ?, ?)
    ''', (data['patient_name'], data['fall_detected'], data['inactivity_time']))
    conn.commit()
    conn.close()

    if data['fall_detected']:
        send_sms_alert(f"🚨 URGENT: {data['patient_name']} has fallen! Immediate assistance required.")

    return jsonify({"message": "Safety event recorded successfully!"})

# Route to add daily reminders
@app.route('/add_reminder', methods=['POST'])
def add_reminder():
    data = request.json
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO daily_reminders (patient_name, reminder_text, reminder_time)
        VALUES (?, ?, ?)
    ''', (data['patient_name'], data['reminder_text'], data['reminder_time']))
    conn.commit()
    conn.close()

    print(f"📅 Reminder for {data['patient_name']}: {data['reminder_text']} at {data['reminder_time']}")

    return jsonify({"message": "Reminder added successfully!"})

# ✅ Route to retrieve all health monitoring data
@app.route('/get_health', methods=['GET'])
def get_health():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM health_monitoring")
    data = cursor.fetchall()
    conn.close()

    health_records = []
    for row in data:
        health_records.append({
            "id": row[0],
            "patient_name": row[1],
            "heart_rate": row[2],
            "blood_pressure": row[3],
            "glucose_level": row[4],
            "timestamp": row[5]
        })

    return jsonify(health_records)

# ✅ Route to retrieve all safety monitoring data
@app.route('/get_safety', methods=['GET'])
def get_safety():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM safety_monitoring")
    data = cursor.fetchall()
    conn.close()

    safety_records = []
    for row in data:
        safety_records.append({
            "id": row[0],
            "patient_name": row[1],
            "fall_detected": bool(row[2]),
            "inactivity_time": row[3],
            "timestamp": row[4]
        })

    return jsonify(safety_records)

# ✅ Route to retrieve all reminders
@app.route('/get_reminders', methods=['GET'])
def get_reminders():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM daily_reminders")
    data = cursor.fetchall()
    conn.close()

    reminder_records = []
    for row in data:
        reminder_records.append({
            "id": row[0],
            "patient_name": row[1],
            "reminder_text": row[2],
            "reminder_time": row[3]
        })

    return jsonify(reminder_records)

if __name__ == '__main__':
    app.run(debug=True)

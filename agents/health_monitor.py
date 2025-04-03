import sqlite3

def add_health_data(patient_name, heart_rate, blood_pressure, glucose_level):
    conn = sqlite3.connect('../elderly_care.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO health_monitoring (patient_name, heart_rate, blood_pressure, glucose_level)
        VALUES (?, ?, ?, ?)
    ''', (patient_name, heart_rate, blood_pressure, glucose_level))

    conn.commit()
    conn.close()
    print(f"Health data added for {patient_name}")

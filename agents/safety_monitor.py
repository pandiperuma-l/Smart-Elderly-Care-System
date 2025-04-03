import sqlite3

def add_safety_event(patient_name, fall_detected, inactivity_time):
    conn = sqlite3.connect('../elderly_care.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO safety_monitoring (patient_name, fall_detected, inactivity_time)
        VALUES (?, ?, ?)
    ''', (patient_name, fall_detected, inactivity_time))

    conn.commit()
    conn.close()
    print(f"Safety event recorded for {patient_name}")

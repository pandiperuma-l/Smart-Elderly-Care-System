import sqlite3
from datetime import datetime

def add_reminder(patient_name, reminder_text, reminder_time):
    conn = sqlite3.connect('../elderly_care.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO daily_reminders (patient_name, reminder_text, reminder_time)
        VALUES (?, ?, ?)
    ''', (patient_name, reminder_text, reminder_time))

    conn.commit()
    conn.close()
    print(f"Reminder added for {patient_name}")

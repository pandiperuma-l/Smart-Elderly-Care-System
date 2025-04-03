import sqlite3

# Connect to the database (creates `elderly_care.db` if it doesn't exist)
conn = sqlite3.connect('elderly_care.db')
cursor = conn.cursor()

# Create table for health monitoring
cursor.execute('''
CREATE TABLE IF NOT EXISTS health_monitoring (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    heart_rate INTEGER,
    blood_pressure TEXT,
    glucose_level REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

# Create table for safety monitoring
cursor.execute('''
CREATE TABLE IF NOT EXISTS safety_monitoring (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    fall_detected BOOLEAN,
    inactivity_time INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

# Create table for daily reminders
cursor.execute('''
CREATE TABLE IF NOT EXISTS daily_reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    reminder_text TEXT,
    reminder_time DATETIME
)
''')

# Save changes and close the connection
conn.commit()
conn.close()

print("✅ Database and tables created successfully!")

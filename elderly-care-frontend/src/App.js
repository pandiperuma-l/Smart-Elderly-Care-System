import React, { useEffect, useState } from "react";
import { getHealthData, getSafetyData, getReminders } from "./api";

function App() {
    const [healthData, setHealthData] = useState([]);
    const [safetyData, setSafetyData] = useState([]);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        getHealthData().then(setHealthData);
        getSafetyData().then(setSafetyData);
        getReminders().then(setReminders);
    }, []);

    return (
        <div>
            <h1>Elderly Care System Dashboard</h1>

            <h2>Health Monitoring</h2>
            <ul>
                {healthData.map((entry) => (
                    <li key={entry.id}>
                        {entry.patient_name}: {entry.heart_rate} BPM, {entry.blood_pressure}, Glucose: {entry.glucose_level}
                    </li>
                ))}
            </ul>

            <h2>Safety Monitoring</h2>
            <ul>
                {safetyData.map((entry) => (
                    <li key={entry.id}>
                        {entry.patient_name} - {entry.fall_detected ? "🚨 Fall Detected" : "Safe"}, Inactivity: {entry.inactivity_time} min
                    </li>
                ))}
            </ul>

            <h2>Daily Reminders</h2>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder.id}>
                        {reminder.patient_name}: {reminder.reminder_text} at {reminder.reminder_time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";

export default function DataViewer() {
  const [health, setHealth] = useState([]);
  const [safety, setSafety] = useState([]);
  const [reminders, setReminders] = useState([]);

  const fetchData = () => {
    axios.get("http://127.0.0.1:5000/get_health").then(res => setHealth(res.data));
    axios.get("http://127.0.0.1:5000/get_safety").then(res => setSafety(res.data));
    axios.get("http://127.0.0.1:5000/get_reminders").then(res => setReminders(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetHealth = async () => {
    await axios.post("http://127.0.0.1:5000/reset_health");
    setHealth([]);
  };

  const resetSafety = async () => {
    await axios.post("http://127.0.0.1:5000/reset_safety");
    setSafety([]);
  };

  const resetReminders = async () => {
    await axios.post("http://127.0.0.1:5000/reset_reminders");
    setReminders([]);
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-xl font-bold mb-4">📊 All Data</h2>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold mt-4">Health Records</h3>
        <button onClick={resetHealth} className="text-red-600 text-sm">🧹 Clear</button>
      </div>
      <ul className="list-disc pl-5 text-sm mb-4">
        {health.map((h, i) => (
          <li key={i}>{h.patient_name}: {h.heart_rate} bpm, {h.glucose_level} mg/dL</li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold mt-4">Safety Records</h3>
        <button onClick={resetSafety} className="text-red-600 text-sm">🧹 Clear</button>
      </div>
      <ul className="list-disc pl-5 text-sm mb-4">
        {safety.map((s, i) => (
          <li key={i}>{s.patient_name}: Fall - {s.fall_detected ? "Yes" : "No"}, Inactivity - {s.inactivity_time} min</li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold mt-4">Reminders</h3>
        <button onClick={resetReminders} className="text-red-600 text-sm">🧹 Clear</button>
      </div>
      <ul className="list-disc pl-5 text-sm mb-4">
        {reminders.map((r, i) => (
          <li key={i}>{r.patient_name}: {r.reminder_text} at {r.reminder_time}</li>
        ))}
      </ul>
    </div>
  );
}

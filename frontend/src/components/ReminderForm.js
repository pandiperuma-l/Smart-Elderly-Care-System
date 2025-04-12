import { useState } from "react";
import axios from "axios";

export default function ReminderForm() {
  const [form, setForm] = useState({
    patient_name: "",
    reminder_text: "",
    reminder_time: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/add_reminder", form);
      alert("✅ Reminder added");
      setForm({ patient_name: "", reminder_text: "", reminder_time: "" });
    } catch (err) {
      alert("❌ Failed to add reminder");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Daily Reminder</h2>
      <input className="border p-2 w-full mb-2" placeholder="Patient Name" value={form.patient_name} onChange={e => setForm({ ...form, patient_name: e.target.value })} />
      <input className="border p-2 w-full mb-2" placeholder="Reminder Text" value={form.reminder_text} onChange={e => setForm({ ...form, reminder_text: e.target.value })} />
      <input className="border p-2 w-full mb-4" type="datetime-local" value={form.reminder_time} onChange={e => setForm({ ...form, reminder_time: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Add Reminder</button>
    </div>
  );
}

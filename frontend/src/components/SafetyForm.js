import { useState } from "react";
import axios from "axios";

export default function SafetyForm() {
  const [form, setForm] = useState({
    patient_name: "",
    fall_detected: false,
    inactivity_time: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/add_safety", {
        ...form,
        inactivity_time: parseInt(form.inactivity_time),
        fall_detected: Boolean(form.fall_detected)
      });
      alert("✅ Safety data submitted");
      setForm({ patient_name: "", fall_detected: false, inactivity_time: "" });
    } catch (err) {
      alert("❌ Failed to submit safety data");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Safety Monitoring</h2>
      <input className="border p-2 w-full mb-2" placeholder="Patient Name" value={form.patient_name} onChange={e => setForm({ ...form, patient_name: e.target.value })} />
      <input className="border p-2 w-full mb-2" placeholder="Inactivity Time (mins)" value={form.inactivity_time} onChange={e => setForm({ ...form, inactivity_time: e.target.value })} />
      <label className="block mb-4">
        <input type="checkbox" checked={form.fall_detected} onChange={e => setForm({ ...form, fall_detected: e.target.checked })} /> Fall Detected
      </label>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

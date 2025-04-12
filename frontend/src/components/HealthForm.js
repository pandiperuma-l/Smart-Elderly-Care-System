import { useState } from "react";
import axios from "axios";

export default function HealthForm() {
  const [form, setForm] = useState({
    patient_name: "",
    heart_rate: "",
    blood_pressure: "",
    glucose_level: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/add_health", {
        ...form,
        heart_rate: parseInt(form.heart_rate),
        glucose_level: parseFloat(form.glucose_level),
      });
      alert("✅ Health data submitted");
      setForm({
        patient_name: "",
        heart_rate: "",
        blood_pressure: "",
        glucose_level: "",
      });
    } catch (err) {
      alert("❌ Failed to submit data");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Health Monitoring</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Patient Name"
        value={form.patient_name}
        onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Heart Rate"
        value={form.heart_rate}
        onChange={(e) => setForm({ ...form, heart_rate: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Blood Pressure"
        value={form.blood_pressure}
        onChange={(e) => setForm({ ...form, blood_pressure: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Glucose Level"
        value={form.glucose_level}
        onChange={(e) => setForm({ ...form, glucose_level: e.target.value })}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

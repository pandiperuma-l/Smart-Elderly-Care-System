import HealthForm from "./components/HealthForm";
import SafetyForm from "./components/SafetyForm";
import ReminderForm from "./components/ReminderForm";
import DataViewer from "./components/DataViewer";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Smart Elderly Care System</h1>
      <p>Monitor health, ensure safety, and manage daily reminders.</p>

      <div className="section">
        <HealthForm />
      </div>

      <div className="section">
        <SafetyForm />
      </div>

      <div className="section">
        <ReminderForm />
      </div>

      <div className="section">
        <DataViewer />
      </div>
    </div>
  );
}

export default App;

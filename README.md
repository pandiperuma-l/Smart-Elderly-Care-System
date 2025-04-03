# Smart Elderly Care System 🏥👴👵  

## Overview  
The **Smart Elderly Care System** is a multi-agent AI-based solution designed to assist caregivers in monitoring elderly individuals.  
It integrates **health tracking, safety alerts, and daily reminders**, ensuring real-time notifications for caregivers.  

## 🚀 Features  
- ✅ **Health Monitoring:** Tracks heart rate, blood pressure, and glucose levels.  
- ✅ **Safety Alerts:** Detects falls and unusual inactivity.  
- ✅ **Daily Reminders:** Sends medication and appointment notifications.  
- ✅ **SMS Alerts:** Notifies caregivers of emergency situations.  
- ✅ **Web Dashboard:** Displays real-time data and alerts.  

## 🛠 Technologies Used  
| Component        | Technology Stack |
|-----------------|----------------|
| **Frontend**     | React, Tailwind CSS |
| **Backend**      | Flask, SQLite |
| **SMS Alerts**   | Twilio API |
| **Database**     | SQLite |
| **Hosting**      | Local/Cloud (e.g., Render, Heroku) |

## ⚙️ Installation & Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/pandiperuma-l/Smart-Elderly-Care-System.git
cd Smart-Elderly-Care-System
2️⃣ Backend Setup (Flask API)
sh
Copy
Edit
cd backend
pip install -r requirements.txt
python app.py
Runs the Flask API on http://127.0.0.1:5000/

3️⃣ Frontend Setup (React Dashboard)
sh
Copy
Edit
cd ../frontend
npm install
npm start
Opens the web dashboard at http://localhost:3000/

📡 API Endpoints
Method	Endpoint	Description
POST	/add_health	Adds health data & triggers alerts
POST	/add_safety	Logs fall detection alerts
POST	/add_reminder	Adds a new daily reminder
GET	/get_health	Fetches all health records
GET	/get_safety	Fetches safety alerts

📱 Mobile app for push notifications & alerts.

🤖 AI-based predictive health analysis.

💡 Contributing
Want to improve this project? Fork the repo, create a feature branch, and submit a pull request!

📞 Contact
GitHub: @pandiperuma-l

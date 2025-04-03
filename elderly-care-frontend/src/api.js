import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getHealthData = async () => {
    const response = await axios.get(`${API_BASE_URL}/get_health`);
    return response.data;
};

export const getSafetyData = async () => {
    const response = await axios.get(`${API_BASE_URL}/get_safety`);
    return response.data;
};

export const getReminders = async () => {
    const response = await axios.get(`${API_BASE_URL}/get_reminders`);
    return response.data;
};

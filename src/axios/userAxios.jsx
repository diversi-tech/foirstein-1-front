import axios from 'axios';

// יצירת אינסטנס של axios עם הגדרות ברירת מחדל
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5211/api', // URL בסיסי של ה-API
  headers: {
    'Content-Type': 'application/json'
  }
});

// פונקציה לקבלת כל המשתמשים
export const getAllUsers = () => {
  return axiosInstance.get('/Users/getAllUsers');
};

// פונקציה לעדכון הרשאת משתמש
export const updateUserRole = (userId, newRole) => {
  return axiosInstance.put(`/Users/${userId}/role`, { role: newRole });
};

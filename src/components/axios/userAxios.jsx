import axios from 'axios';

const API_URL = 'http://localhost:5211/api/Users'; // שים כאן את ה-URL שלך לקונטרולר

const userService = {
    
  verifyIdNumber: async (idNumber) => {
    debugger
    try {
      const response = await axios.get(`${API_URL}/verify-security-questions?idNumber=${idNumber}`);
   
      return response.data;
    } catch (err) {
      throw new Error('נכשל בהבאת הנתונים מהשרת.');
    }
  },

  changePassword: async (idNumber, newPassword) => {
    try {
      const response = await axios.put(`${API_URL}/reset-password`, {
          idNumber,
          newPassword
      }, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data;
    } catch (err) {
      throw new Error('שגיאה בהתחברות לשרת');
    }
  },
};

export default userService;

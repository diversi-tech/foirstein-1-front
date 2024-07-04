import axios from 'axios';

// 
const API_URL = 'http://localhost:5211/api/Users'; // שים כאן את ה-URL שלך לקונטרולר

const userService = {
  getAllUsers: async () => {
    try {
        debugger
      const response = await axios.get(`${API_URL}/getUsers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
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

  addUser: async (user) => {
    try {
      debugger
      const response = await axios.post(`${API_URL}/addUser`, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/dellUser/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  updateUser: async (updatedUser) => {
    try {
      debugger
      const response = await axios.put(`${API_URL}/updateUser`, updatedUser);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  updateUserRole: async (userId, newRole) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}/role`, { role: newRole });
        debugger
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
  },
}


export default userService;

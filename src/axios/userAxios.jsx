import axios from 'axios';

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
      alert(response.data.username)   
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

export default userService;

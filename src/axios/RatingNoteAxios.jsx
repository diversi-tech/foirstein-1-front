// src/axios/RatingNoteAxios.js
import axios from 'axios';
const api_url=process.env.REACT_APP_SERVER_URL;

const API_URL = `${api_url}/api/RatingNote`; // שים כאן את ה-URL שלך לקונטרולר

const RatingNoteService = {
  getAllRatingNote: async () => {
    
    try {
      const response = await axios.get(`${API_URL}/GetAllRatingNote`);
      return response.data;
    } catch (error) {
      console.error('Error fetching RatingNote:', error);
      throw error;
    }
  },
}

export default RatingNoteService;

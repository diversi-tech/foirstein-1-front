// src/axios/RatingNoteAxios.js
import axios from 'axios';

const API_URL = 'http://localhost:5211/api/RatingNote'; // שים כאן את ה-URL שלך לקונטרולר

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

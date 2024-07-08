import axios from 'axios';

const API_URL = 'http://localhost:5211/api/BorrowApprovalRequest'; // שים כאן את ה-URL שלך לקונטרולר

const approvalService = {
  getAllApprovals: async () => {
    try {
      const response = await axios.get(`${API_URL}/GetAllBorrowApprovalRequests`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Approval:', error);
      throw error;
    }
  }
};

export default approvalService;

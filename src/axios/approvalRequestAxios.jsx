import axios from 'axios';

const api_url=process.env.REACT_APP_SERVER_URL;
const API_URL = `${api_url}/api/BorrowApprovalRequest`; // שים כאן את ה-URL שלך לקונטרולר

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

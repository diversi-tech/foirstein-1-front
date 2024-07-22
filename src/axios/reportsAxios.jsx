import axios from 'axios';

let userUrl = 'https://foirstein-1-back.onrender.com/api/Report';

const ReportService = {
    getAllReports: async () => {
        try {
            const response = await axios.get(`${userUrl}/getReports`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    },

    createSearchLogsReport: async (reportName) => {
        try {
            const response = await axios.get(`${userUrl}/GetSearchLogsBorrowRequests?reportName=${reportName}&type=חיפושים`);
            return response.data;
        } catch (error) {
            console.error('Error creating search logs report:', error);
            throw error;
        }
    },
    createAnnualReport: async (reportName) => {
        try {
            const response = await axios.get(`${userUrl}/getCountByDate?reportName=${reportName}&type=שנתי`);
            return response.data;
        } catch (error) {
            console.error('Error creating annual report:', error);
            throw error;
        }
    },
    createActivityReport: async (reportName) => {
        try {
            const response = await axios.get(`${userUrl}/activity-report?reportName=${reportName}&type=פעילות`);
            return response.data;
        } catch (error) {
            console.error('Error creating activity report:', error);
            throw error;
        }
    }
};

export default ReportService;

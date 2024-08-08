import axios from 'axios';
const api_url=process.env.REACT_APP_SERVER_URL;
let userUrl = `${api_url}/api/Report`;



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

    createSearchLogsReport: async (reportName,userid) => {
        try {
            const response = await axios.get(`${userUrl}/GetSearchLogsBorrowRequests?reportName=${reportName}&type=חיפושים&userid=${userid}`);
            return response.data;
        } catch (error) {
            console.error('Error creating search logs report:', error);
            throw error;
        }
    },
    createAnnualReport: async (reportName,userid) => {
        try {
            debugger
            const response = await axios.get(`${userUrl}/getCountByDate?reportName=${reportName}&type=שנתי&userid=${userid}`);
            return response.data;
        } catch (error) {
            console.error('Error creating annual report:', error);
            throw error;
        }
    },
    createActivityReport: async (reportName,userid) => {
        try {
            const response = await axios.get(`${userUrl}/activity-report?reportName=${reportName}&type=פעילות&userid=${userid}`);
            return response.data;
        } catch (error) {
            console.error('Error creating activity report:', error);
            throw error;
        }
    },
    createLoginActivityReport: async (loginDate, reportName,userId) => {
        try {
            const response = await axios.get(`${userUrl}/aaa?loginDate=${loginDate}&reportName=${reportName}&type=התחברות&userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error creating login activity report:', error);
            throw error;
        }
    }
};

export default ReportService;

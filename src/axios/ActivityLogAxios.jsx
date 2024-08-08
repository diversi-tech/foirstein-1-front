import axios from "axios";

const api_url=process.env.REACT_APP_SERVER_URL;
let userUrl=`${api_url}/api/ActivityLog`;

const ActivityLogService = {
    getAllActivityLog: async () => {
        try {
            debugger
            const response = await axios.get(`${userUrl}/GetAllActivity`);
            return response.data;
        }
        catch (error) {
            debugger
            console.log(error);
            throw  error;
        }
},
addActivityLog: async (activityLog) => {
    try {
        debugger
        const response = await axios.post(`${userUrl}/addActivity`, activityLog);
        return response.data;
    }
    catch (error) {
        debugger
        console.log(error);
        throw error;
    }
}
};
export default ActivityLogService;
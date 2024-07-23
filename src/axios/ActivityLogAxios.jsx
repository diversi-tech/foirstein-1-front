import axios from "axios";

let userUrl="https://foirstein-1-back.onrender.com/api/ActivityLog";

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
import axios from "axios";

let userUrl="http://localhost:5211/api/ActivityLog";

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
}};
export default ActivityLogService;
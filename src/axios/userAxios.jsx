import axios from "axios";

let userUrl="http://localhost:5211/api/Users";

const userService = {
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${userUrl}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw  error;
        }
}};
export default userService;
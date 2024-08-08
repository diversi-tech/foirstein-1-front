import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const getCookie=(name)=> {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const token = getCookie('jwt');
console.log(token);

export const getRoleFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  export const getPermissionsFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      const permissions = decoded['permissions']; // ההרשאות אמורות להיות כאן לפי הקוד שכתבת
  
      return {
        permissions: permissions || []
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  export const getUserNameFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded['sub'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  export const getUserIdFromToken = () => {
    debugger
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded['tz'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  export const getUserIdFromTokenid = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return parseInt(decoded['userId'], 10); // Convert userId to integer
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  const api_url=process.env.REACT_APP_SERVER_URL;

  export const validateToken = async () => {
    const token1 = getCookie('jwt');
    if (!token1) return false;
    try {
      const response = await axios.post(`${api_url}/api/Users/validate-token`, token1, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.isValid;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  };

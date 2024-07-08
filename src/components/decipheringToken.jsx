import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const token = sessionStorage.getItem('jwt');
export const getRoleFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded); // בדיקת תוכן הטוקן
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  export const getUserNameFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded); // בדיקת תוכן הטוקן
      return decoded['sub'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  export const getUserIdFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded); // בדיקת תוכן הטוקן
      return decoded['tz'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  export const validateToken = async () => {
    const token = sessionStorage.getItem('jwt');
    if (!token) return false;
    try {
      debugger
      const response = await axios.post('http://localhost:5211/api/validate-token', { token });
      return response.data.isValid;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  };
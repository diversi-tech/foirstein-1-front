import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  const getCookie = (name) => {
    // פונקציה לקבלת ערך cookie לפי שם
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const validateToken = async (token) => {
    if (!token) return false;
    try {
      const response = await axios.post('http://localhost:5211/api/validate-token', { token });
      return response.data.isValid;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        console.log('Request config:', config);
        if (config && config.url && !config.url.includes('/api/Users/login') && !config.url.includes('/api/Users/password-recovery')) {
          const token = getCookie('jwt');
          if (token) {
            const isValid = await validateToken(token);
            if (isValid) {
              config.headers.Authorization = `Bearer ${token}`;
            } else {
              console.warn('Token is not valid');
              document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              navigate('/login');
              return Promise.reject(new Error('Invalid token'));
            }
          }
        }
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );
    


    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 500) {
          navigate('/server-error');
        }
        return Promise.reject(error);
      }
    );

    // ניקוי ה-interceptors בעת סיום השימוש
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;

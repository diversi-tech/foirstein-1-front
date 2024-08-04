import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosInterceptor = () => {
  debugger
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 500) {
          navigate('/server-error');
        }
        return Promise.reject(error);
      }
    );

    // ניקוי ה-interceptor בעת סיום השימוש
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;

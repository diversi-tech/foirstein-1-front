import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from '../components/decipheringToken'; // יש לוודא שהפונקציה getCookie קיימת בקובץ אחר
import { validateToken } from '../components/decipheringToken'; // יש לוודא שהפונקציה validateToken קיימת בקובץ אחר

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const requestInterceptor = axios.interceptors.request.use(
    //   async (config) => {
    //     console.log('Request config:', config);
    //     debugger;
    //     // לא לבצע בדיקת טוקן בבקשות מסוימות
    //     if (config && config.url && !config.url.includes('/api/Users/login') && !config.url.includes('/api/Users/password-recovery')&&!config.url.includes('/api/Users/verify-security-questions')&&!config.url.includes('/api/Users/getUsers')&&!config.url.includes('/api/Users/password2')) {
    //       const token = getCookie('jwt');
    //       if (token) {
    //         const isValid = await validateToken();
    //         if (isValid) {
    //           config.headers.Authorization = `Bearer ${token}`;
    //         } else {
    //           navigate('/login', { state: { message: 'Token is not valid' } }); // הפניה לעמוד התחברות אם הטוקן לא תקין עם הודעה
    //           return Promise.reject(new Error('Token is not valid'));
    //         }
    //       } else {
    //         navigate('/login', { state: { message: 'Token is missing' } }); // הפניה לעמוד התחברות אם אין טוקן עם הודעה
    //         return Promise.reject(new Error('Token is missing'));
    //       }
    //     }
    //     return config;
    //   },
    //   error => Promise.reject(error)
    // );

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
      // axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;

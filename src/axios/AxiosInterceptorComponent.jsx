import React from 'react';
import useAxiosInterceptor from './useAxiosInterceptor';

const AxiosInterceptorComponent = () => {
  useAxiosInterceptor();
  return null; // רכיב זה לא מציג דבר, רק מטעין את ה-interceptor
};

export default AxiosInterceptorComponent;

import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';


const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",

});

const useAxiosSecure = () => {

  const { user,logOut } = useAuth();

  useEffect(() => {
    //intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config;
    })


    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response) => {
      return response;
    },
      (error) => {
        console.log(error)

        const statusCode=error.status;
        if(statusCode===401||statusCode===403){
          logOut();
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    }
  }, [user,logOut])
  return axiosSecure;
};

export default useAxiosSecure;
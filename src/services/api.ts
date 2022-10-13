import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useContext } from 'react';
import { AlertContext, showAlert } from '../contexts/AlertContext';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];


export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
  //  baseURL: '//127.0.0.1:80',
    baseURL: 'http://localhost:3333',
//    baseURL: 'https://plantaqui.herokuapp.com',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    console.log("deu erro");
    console.log(error);
    if (error.response.status === 401) {
      if (process.browser) {
        signOut()
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }
    else if(error.response.status === 400){
      const data = error.response.data as any;
      showAlert(data.message as string);
    }
    else{
      showAlert(error.message)
    }
    return Promise.reject(error);
  });

  return api;
}
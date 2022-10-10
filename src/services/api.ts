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
    baseURL: '//127.0.0.1:80',
//    baseURL: 'https://plantaqui.herokuapp.com',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (process.browser) {
        signOut()
      } else {
        return Promise.reject(new AuthTokenError())
      }
      // if (error.response.data?.code === 'token.expired') {
      //   cookies = parseCookies(ctx);
  
      //   const { 'nextauth.refreshToken': refreshToken } = cookies;
      //   const originalConfig = error.config
  
      //   if (!isRefreshing) {
      //     isRefreshing = true

      //     api.post('/refresh', {
      //       refreshToken,
      //     }).then(response => {
      //       const { token } = response.data;
    
      //       setCookie(ctx, 'nextauth.token', token, {
      //         maxAge: 60 * 60 * 24 * 30, // 30 days
      //         path: '/'
      //       })
      
      //       setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
      //         maxAge: 60 * 60 * 24 * 30, // 30 days
      //         path: '/'
      //       })
    
      //       api.defaults.headers['Authorization'] = `Bearer ${token}`;
  
      //       failedRequestsQueue.forEach(request => request.onSuccess(token))
      //       failedRequestsQueue = [];
      //     }).catch(err => {
      //       failedRequestsQueue.forEach(request => request.onFailure(err))
      //       failedRequestsQueue = [];
  
      //       if (process.browser) {
      //         signOut()
      //       }
      //     }).finally(() => {
      //       isRefreshing = false
      //     });
      //   }
  
      //   return new Promise((resolve, reject) => {
      //     failedRequestsQueue.push({
      //       onSuccess: (token: string) => {
      //         originalConfig.headers['Authorization'] = `Bearer ${token}`
  
      //         resolve(api(originalConfig))
      //       },
      //       onFailure: (err: AxiosError) => {
      //         reject(err)
      //       } 
      //     })
      //   });
      // } else {
        // if (process.browser) {
        //   signOut()
        // } else {
        //   return Promise.reject(new AuthTokenError())
        // }
      // }
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
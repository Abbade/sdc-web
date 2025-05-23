import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { showAlert } from '../contexts/AlertContext';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];


export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
 
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {

    if(error.response !== undefined){
      if (error.response?.status === 401) {
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
      else if(error.response?.status === 400){
        const data = error.response.data as any;
        console.log("deu erro");
        console.log(data);
        showAlert(data.message);
      }
      else{
        showAlert(error.message)
      }
    }
    else{
      showAlert('Ocorreu um erro!')
    }
    
    return Promise.reject(error);
  });

  return api;
}
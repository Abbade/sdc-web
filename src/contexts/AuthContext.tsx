import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  authChannel.postMessage('signOut');
  Router.push('/')

}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          setUser(null);         
        
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    console.log("abbade bonitao mesmo")
    if (token) {
      api.get('/me')
        .then(response => {
          console.log(response);
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })

          if (Router.route == "/" || Router.route == "/account/create") {
            Router.push('/dashboard')

          }

        })
        .catch(() => {
          signOut();
        })
    }
    else{
      console.log("abbade bonitao")
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('authenticate', {
        email,
        password,
      })

      const { token, permissions, roles } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      console.log("foi");
      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
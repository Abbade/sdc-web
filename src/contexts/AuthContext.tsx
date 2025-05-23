import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";
import { AlertColor } from "@mui/material/Alert";

type User = {
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  changeMode: () => void;
  mode: "light" | "dark";
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  authChannel.postMessage("signOut");
  Router.push("/login");
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          setUser(null);

          break;
        default:
          break;
      }
    };
  }, []);

  const changeMode = () => {
    setCookie(undefined, "sdc.darkmode", mode === "light" ? "dark" : "light", {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          console.log("chamou o me, cuidado!");
          const { email, permissions, roles, name } = response.data;
          console.log(name);
          setUser({ email, permissions, roles, name });
        })
        .catch(() => {
          signOut();
        });
    }
    const { "sdc.darkmode": modeCookie1 } = parseCookies();
    let chooseMode = modeCookie1 as "dark" | "light";

    if (chooseMode) {
      setMode(chooseMode);
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {

      const response = await api.post("authenticate", {
        email,
        password,
      });

      const { token, permissions, roles, name } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
        name
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, changeMode, mode }}
    >
      {children}
    </AuthContext.Provider>
  );
}

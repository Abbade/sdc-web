import { AlertColor } from "@mui/material";
import { BroadcastChannel } from 'broadcast-channel';
import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect, useState
} from "react";

type AlertContextData = {
  openLoading: boolean;
  setOpenLoading: (value: SetStateAction<boolean>) => void;
  setAlert: (value: SetStateAction<AlertProps>) => void;
  alert: AlertProps;
  showAlert: (message: string, type: AlertColor) => void;
};

type AlertProps = {
  message: string;
  alertType: AlertColor;
  openAlert: boolean;
};
const initialAlert = {
  message: "",
  alertType: "success",
  openAlert: false,
} as AlertProps;

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertContext = createContext({} as AlertContextData);

let alertChannel: BroadcastChannel;


let messageOutSide = "";

export function showAlert(msg: string) {
  console.log("alert1")
  messageOutSide = msg;
  alertChannel.postMessage({ type: "snackalert" , msg: msg});
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertProps>(initialAlert);
  const [openLoading, setOpenLoading] = useState(false);


  useEffect(() => {
    alertChannel = new BroadcastChannel("alertSnack");

    alertChannel.onmessage = (message) => {
      console.log("caiu alert")
      console.log(message);
      switch (message.type) {
  
        case "snackalert":
          setAlert({
            alertType: "error",
            openAlert: true,
            message: message.msg,
          } as AlertProps);

          break;
        default:
          break;
      }
    };
  }, []);

  const showAlert = (message: string, type : AlertColor) => {
    setAlert({
      message: message,
      alertType: type,
      openAlert: true,
    });
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert, openLoading, setOpenLoading }}>
      {children}
    </AlertContext.Provider>
  );
}

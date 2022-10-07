import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useEffect, useState } from "react";

type AlertContextData = {
  showAlert: (message: string, alertType: AlertColor) => void;
  openAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  closeAlert: () => void;
};

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertContext = createContext({} as AlertContextData);

let alertChannel: BroadcastChannel;

let messageOutSide = "";

export function showAlert(msg: string) {
  console.log("chegou alert 1");
  messageOutSide = msg;
  alertChannel.postMessage("alertSnack");
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  useEffect(() => {
    alertChannel = new BroadcastChannel("alertSnack");

    alertChannel.onmessage = (message) => {
      switch (message.data) {
        case "alertSnack":
          console.log("chegou alert 2");
          showAlert(messageOutSide, "error");

          break;
        default:
          break;
      }
    };
  }, []);

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const showAlert = (message: string, alertType: AlertColor) => {
    setAlertMessage(message);
    setAlertType(alertType);
    setOpenAlert(true);
  };

  return (
    <AlertContext.Provider
      value={{ openAlert, alertMessage, alertType, showAlert, closeAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
}

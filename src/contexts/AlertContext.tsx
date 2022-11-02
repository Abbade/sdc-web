import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useEffect, useState } from "react";

type AlertContextData = {
  showAlert: (message: string, alertType: AlertColor) => void;
  openAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  closeAlert: () => void;
  showLoading: () => void;
  closeLoading: () => void;
  openLoading: boolean;
};

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertContext = createContext({} as AlertContextData);

let alertChannel: BroadcastChannel;

let messageOutSide = "";

export function showAlert(msg: string) {

  messageOutSide = msg;
  alertChannel.postMessage("snackalert");
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertColor>("success");
  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    alertChannel = new BroadcastChannel("alertSnack");

    alertChannel.onmessage = (message) => {

      switch (message.data) {
        case "snackalert":

          showAlert(messageOutSide, "error");

          break;
        default:
          break;
      }
    };
  }, []);

  const closeLoading = () => {
    setOpenLoading(false);
  };

  const showLoading = () => {
    setOpenLoading(true);
  };

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
      value={{ openAlert, alertMessage, alertType, showAlert, closeAlert, showLoading, closeLoading, openLoading }}
    >
      {children}
    </AlertContext.Provider>
  );
}

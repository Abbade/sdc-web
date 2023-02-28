import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { PlantaInterface } from "../interfaces/PlantaInterface";
import { api } from "../services/apiClient";

type PlantsContextData = {
  recipients : ItemType[];
  plantStage : ItemType[];
  trashReasons : ItemType[];
  locations : ItemType[];
};


type ItemType = {
  id: number;
  name: string;
};

type PlantProviderProps = {
  children: ReactNode;
};

export const ActionTypeContext = createContext({} as PlantsContextData);

export function ActionTypeProvider({ children }: PlantProviderProps) {
  const [recipients, setRecipients] = useState<ItemType[]>([]);
  const [plantStage, setPlantStage] = useState<ItemType[]>([]);
  const [trashReasons, setTrashReasons] = useState<ItemType[]>([]);
  const [locations, setLocations] = useState<ItemType[]>([]);


  useEffect(() => {
    const getRecipients = async () => {
      const types = await api.get("/recipiente");
      setRecipients(types.data.itens);
    };
    const getPlantStage = async () => {
      const types = await api.get("/fase-cultivo");
      setPlantStage(types.data.itens);
    };
    const getTrashReasons = async () => {
      var response = await api.get("/trash-reason");
      setTrashReasons(response.data.itens);
    };
    const getLocations = async () => {
      var response = await api.get("/location");
      setLocations(response.data.itens);
    };
    getTrashReasons();
    getPlantStage();
    getRecipients();
    getLocations();
  }, []);

  return (
    <ActionTypeContext.Provider
      value={{
        recipients,
        plantStage,
        trashReasons,
        locations
      }}
    >
      {children}
    </ActionTypeContext.Provider>
  );
}

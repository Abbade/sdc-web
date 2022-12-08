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
  plants: PlantaInterface[];
  fastSearch: string;
  setFastSearch: Dispatch<SetStateAction<string>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowCount: number;
  setRowCount: Dispatch<SetStateAction<number>>;
  filter: FilterProp;
  setFilter: Dispatch<SetStateAction<FilterProp>>;
  loadingTable: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

export type FilterProp = {
  totalFilter: number;
  ids?: string;
  idLote?: number;
  idGenetic?: number;
  idRecipiente?: number;
  idLocation?: number;
  idFaseCultivo?: number;
  isMother?: boolean;
  isTrashed?: boolean;
  propagationDate?: Date;
  aclimatationDate?: Date;
  vegetationDate?: Date;
  floweringDate?: Date;
}

const firstFilter = {
  totalFilter: 0,
  ids: undefined,
  idLote: undefined,
  idGenetic: undefined,
  idRecipiente: undefined,
  idFaseCultivo: undefined,
  isMother: undefined,
  isTrashed: undefined,
  propagationDate: undefined,
  aclimatationDate: undefined,
  vegetationDate: undefined,
  floweringDate: undefined
} as FilterProp;

type PlantProviderProps = {
  children: ReactNode;

};

export const PlantsContext = createContext({} as PlantsContextData);

export function PlantProvider({ children}: PlantProviderProps) {
  const [plants, setPlantas] = useState([] as PlantaInterface[]);
  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [rowCount, setRowCount] = useState(1);
  const[loadingTable, setLoadingTable] = useState(false);

  const [filter, setFilter] = useState(firstFilter);
 

  useEffect(() => {
    const get = async () => {
      setLoadingTable(true);
      var response = await api.get("/plant", {
        params: {
          page: page + 1,
          limit: pageSize,
          name: fastSearch,
          filter: filter
        },
      });
      setPlantas(response.data.itens);
      setRowCount(response.data.total);
      setLoadingTable(false);
      setRefresh(false);
    };
    get();
  }, [pageSize, page, fastSearch, filter, refresh]);



  return (
    <PlantsContext.Provider
      value={{
        plants,
        fastSearch,
        setFastSearch,
        setPageSize,
        pageSize,
        page,
        setPage,
        rowCount,
        setRowCount,
        filter,
        setFilter,
        loadingTable,
        setRefresh
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
}

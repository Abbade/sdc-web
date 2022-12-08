import { useEffect, useState } from "react";
import { api } from "../../../services/apiClient";
import PieChart from "../PieChart";

export interface IfilterType{
    filterType: string;
}
export default function TotalByThrashReason({ filterType } : IfilterType) {
  const [names, setNames] = useState([]);
  const [qtds, setQtds] = useState([]);

  useEffect(() => {
    const get = async () => {
      var response = await api.get("/charts/trashreason", {
        params: {
          filterType: filterType,
        },
      });
      setNames(response.data.x);
      setQtds(response.data.y);
    };
    get();
  }, [filterType]);

  return <PieChart xAxis={names} yAxis={qtds} label={"Quantidade"}></PieChart>;
}

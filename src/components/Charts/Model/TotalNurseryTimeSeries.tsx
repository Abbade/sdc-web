import { useEffect, useState } from "react";
import { api } from "../../../services/apiClient";
import { AreaChart } from "../AreaChart";
import PieChart from "../PieChart";
import { format } from "date-fns";


export interface IfilterType {
  filterType: string;
}
export default function TotalNurseryTimeSeries({ filterType }: IfilterType) {
  const [names, setNames] = useState([]);
  const [qtds, setQtds] = useState([]);

  useEffect(() => {
    const get = async () => {
      var response = await api.get("/createTimeSeries", {
        params: {
          filterType: filterType,
        },
      });
      if(filterType == "1"){
        let names = [];
        for(let date of response.data.x){
          names.push(format(new Date(date), "dd"));
        }
      
        setNames(names);

      }
      else{
        setNames(response.data.x);
      }
     
      setQtds(response.data.y);
    };
    get();
  }, [filterType]);

  return (
    <AreaChart
      label="Total Mudas"
      title="Mudas Plantadas"
      labels={names}
      yAxis={qtds}
    ></AreaChart>
  );
}

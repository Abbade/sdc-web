import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import TotalByGeneticChart from "../../components/Charts/Model/TotalByGeneticChart";
import TotalByPropType from "../../components/Charts/Model/TotalByPropType";
import TotalByThrashReason from "../../components/Charts/Model/TotalByThrashReason";
import TotalNurseryTimeSeries from "../../components/Charts/Model/TotalNurseryTimeSeries";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function StatisticsIndex() {
  const [filterType, setFilterType] = useState("1");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid
          container
          xs={2}
          xl={1}
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Select
            labelId="select-label"
            id="select-filter"
            value={filterType}
            onChange={(event: SelectChangeEvent) =>
              setFilterType(event.target.value as string)
            }
          >
            <MenuItem value={"1"}>Este Mês</MenuItem>
            <MenuItem value={"2"}>Este Ano</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid
          container
          justifyContent="center"
          xs={12}
          lg={4}
          sx={{ maxHeight: 330 }}
        >
          <TotalByGeneticChart filterType={filterType}></TotalByGeneticChart>
        </Grid>
        <Grid
          container
          justifyContent="center"
          xs={12}
          lg={4}
          sx={{ maxHeight: 330 }}
        >
          <TotalByPropType filterType={filterType}></TotalByPropType>
        </Grid>
        <Grid
          container
          justifyContent="center"
          xs={12}
          lg={4}
          sx={{ maxHeight: 330 }}
        >
          <TotalByThrashReason filterType={filterType}></TotalByThrashReason>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid        sx={{ maxHeight: 430 }} container justifyContent="center" xs={12} lg={12}>
          <TotalNurseryTimeSeries
            filterType={filterType}
          ></TotalNurseryTimeSeries>
        </Grid>
      </Grid>
    </Box>
  );
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["statistics.culti"],
  }
);

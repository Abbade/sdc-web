import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import TotalByGeneticChart from "../../components/Charts/Model/TotalByGeneticChart";
import TotalNurseryTimeSeries from "../../components/Charts/Model/TotalNurseryTimeSeries";

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
          <Grid container xs={2} xl={1}          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end">
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
          <Grid item xs={12} lg={3}>
            <TotalByGeneticChart filterType={filterType}></TotalByGeneticChart>
          </Grid>
          <Grid item xs={12} lg={9}>
            <TotalNurseryTimeSeries
              filterType={filterType}
            ></TotalNurseryTimeSeries>
          </Grid>
        </Grid>
    </Box>
  );
}

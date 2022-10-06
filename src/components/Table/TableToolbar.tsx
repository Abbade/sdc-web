import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function TableToolbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={4}>
          <h1>Usuários</h1>
        </Grid>
        <Grid item xs={2} >
          +
        </Grid>
      </Grid>
    </Box>
  );
}

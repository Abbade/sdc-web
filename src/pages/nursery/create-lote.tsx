import { ThemeProvider } from "@emotion/react";
import { Typography, createTheme, Container, CssBaseline, Box, Avatar, Grid, TextField, FormControlLabel, Checkbox, Button, TextFieldProps, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { api } from "../../services/apiClient";
import Router from 'next/router'
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import BasicDatePicker from "../../components/Inputs/BasicDatePicker";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import BasicSelect from "../../components/Inputs/BasicSelect";
import BasicTextField from "../../components/Inputs/BasicTextField";
import { Genetic, LoteInterface, PropagationType } from "../../interfaces/LoteInterface";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function CreateLote() {
    const [propagationType, setPropagationType] = useState([] as PropagationType[]);

    useEffect(() => {
      const getPropagationTypes = async () => {
        var response = await api.get("/propagation-type");
        setPropagationType(response.data);
      };
  
      getPropagationTypes();
    }, []);
    
    const [genetic, setGenetics] = useState([] as Genetic[]);

    useEffect(() => {
      const getGenetics = async () => {
        var response = await api.get("/genetic");
        setGenetics(response.data);
      };
  
      getGenetics();
    }, []);

    const [location, setLocation] = useState([] as Location[]);

    useEffect(() => {
      const getLocations = async () => {
        var response = await api.get("/location");
        setLocation(response.data);
      };
  
      getLocations();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const { propDate, id_propagationType, id_genetic, id_location_init, qtTotal, obs } = {
            propDate: new Date(data.get('propDate').toString()) ,
            id_propagationType: new Number(data.get('id_propagationType')),
            id_genetic: new Number(data.get('id_genetic')),
            id_location_init: new Number(data.get('id_location_init')),
            qtTotal: new Number(data.get('qtTotal')),
            obs: data.get('obs'),
        };

        try {
            const user = await api.post('lote', { propDate, id_propagationType, id_genetic, id_location_init, qtTotal, obs });
            Router.back()

        } catch (error) {
            const errorOficial = error as Error
            console.log(error as Error)
        }




    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Novo Lote
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <BasicSelect label={"Genética"} name={"id_genetic"} values={genetic}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <BasicDatePicker label={"Data de Propagação"} name={"propDate"}
                                />
                            </Grid>


                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                    className="propDate"
                                        label="Propagation Date"
                                        value={propDate}
                                        onChange={(newValue) => {
                                            setValue(newValue);

                                        }}
                                        renderInput={(params) => <TextField {...params} name="propDate" fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid> */}

                            <Grid item xs={12} sm={12}>
                                <BasicSelect label={"Tipo de Propagação"} name={"id_propagationType"} values={propagationType}
                                />

                            </Grid>

                            <Grid item xs={12} sm={12}>

                                <BasicSelect label={"Origem"} name={"id_origem"}
                                />

                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <BasicSelect label={"Local"} name={"id_location_init"} values={location}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <BasicTextField label={"Quantidade"} name={"qtTotal"}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <BasicTextField label={"obs"} name={"obs"}
                                />

                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cadastrar Lote
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
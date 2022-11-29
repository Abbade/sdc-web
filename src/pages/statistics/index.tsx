import { useEffect, useState } from 'react';
import { LoteInterface } from '../../interfaces/LoteInterface';
import { api } from '../../services/apiClient';
import { Box, Container } from '@mui/material';
import PieChart from '../../components/Charts/PieChart';



export default function StatisticsIndex() {


    const [fastSearch, setFastSearch] = useState("");
    const [pageSize, setPageSize] = useState(200);
    const [page, setPage] = useState(0);

    const [lotes, setLotes] = useState([] as LoteInterface[]);

    const [lotesGeneticsPropagacao, setLotesGeneticsPropagacao] = useState([])
    const [qtdPropagacao, setQtdPropagacao] = useState([])




    useEffect(() => {
        get(fastSearch, page + 1, pageSize);
    }, [pageSize, page, fastSearch]);

    const get = async (name: string, page: number, pageSize: number) => {
        var response = await api.get("/lote", {
            params: {
                name: name,
                page: page,
                limit: pageSize,
            },
        });
        setLotes(response.data.itens);
        updateDateChartPropagacao();
    };

    useEffect(() => {
        updateDateChartPropagacao()
    }, [lotes]);

    const updateDateChartPropagacao = async () => {

        const label = 'Quantidade'

        const xAxis = [...new Set(lotes.map(lote => { return lote.id_genetic }))]
        const xAxisText = [...new Set(lotes.map(lote => { return lote.genetic.name }))]

        const yAxis = xAxis.map(genetic => {
            return lotes.filter(lote => { return lote.id_genetic == genetic }).reduce(
                (soma, propagacao) =>
                    soma + propagacao.qtProp, 0

            )
        })

        console.log(xAxis)
        console.log(yAxis)
        setLotesGeneticsPropagacao(xAxisText)
        setQtdPropagacao(yAxis)

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container component="main" maxWidth="xs">

                <PieChart
                    xAxis={lotesGeneticsPropagacao}
                    yAxis={qtdPropagacao}
                    label={"Quantidade"}

                ></PieChart>

            </Container>


        </Box>
    );

}
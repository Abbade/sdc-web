import { useContext, useEffect } from "react"
import Router from 'next/router';
import Box from "@mui/material/Box";
import { AuthContext } from "../../contexts/AuthContext"
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth"
import { Can } from "../../components/Can";
import TableToolbar from "../../components/Table/TableToolbar";


export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TableToolbar />

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['lote.list']}>
        <div>Métricas</div>
      </Can>
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {}
  }
}, {
  permissions: ['lote.list'],
  roles: ['administrador'],
})
import { getUser } from '../../../utils/requireAuth'
import { getRoasters } from '../../../utils/api/roasters'
import RoastersComponent from '../../../views/roasters/main'

const Roasters = (props) => <RoastersComponent {...props} />

export async function getServerSideProps({ req }) {
  const { user } = await getUser(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  const roasters = await getRoasters({ user })

  return {
    props: {
      user,
      roasters,
    },
  }
}

export default Roasters

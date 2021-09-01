import { getCoffees } from '../../../utils/api/coffee'
import { getMinimalRoasters } from '../../../utils/api/roasters'
import { getUser } from '../../../utils/requireAuth'
import Coffees from '../../../views/coffee/main'

const CoffeesPage = (props) => <Coffees {...props} />

export async function getServerSideProps({ req }) {
  const { user } = await getUser(req)
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  const coffees = await getCoffees({ user })
  const roasters = await getMinimalRoasters({ user })

  return { props: { user, coffees, roasters } }
}

export default CoffeesPage

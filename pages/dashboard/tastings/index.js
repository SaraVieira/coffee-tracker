import { getMinimalCoffees } from '../../../utils/api/coffee'
import { getMinimalRoasters } from '../../../utils/api/roasters'
import { getTastings } from '../../../utils/api/tastings'
import { getUser } from '../../../utils/requireAuth'
import Tastings from '../../../views/tastings/main'

const TastingsPage = (props) => <Tastings {...props} />

export async function getServerSideProps({ req }) {
  const { user } = await getUser(req)
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  const tastings = await getTastings({ user })
  const roasters = await getMinimalRoasters({ user })
  const coffees = await getMinimalCoffees({ user })

  return { props: { user, coffees, roasters, tastings } }
}

export default TastingsPage

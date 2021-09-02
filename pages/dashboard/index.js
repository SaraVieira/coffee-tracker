import DashboardLayout from '../../components/Layout/DashboardLayout'
import { getCoffees } from '../../utils/api/coffee'
import { getRoasters } from '../../utils/api/roasters'
import { getUser } from '../../utils/requireAuth'

const Dashboard = ({ coffees, roasters }) => {
  const stats = [
    { name: 'Coffees Added', stat: coffees.length },
    { name: 'Roasters', stat: roasters.length },
    { name: 'Tastings made', stat: 0 },
  ]

  return (
    <DashboardLayout>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your data</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    </DashboardLayout>
  )
}
export async function getServerSideProps({ req }) {
  const { user } = await getUser(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }
  const roasters = await getRoasters({ user })
  const coffees = await getCoffees({ user })
  return { props: { user, roasters, coffees } }
}
export default Dashboard

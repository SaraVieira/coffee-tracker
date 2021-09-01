import DashboardLayout from '../../components/Layout/DashboardLayout'
import { getUser } from '../../utils/requireAuth'

const Dashboard = () => <DashboardLayout>sup</DashboardLayout>
export async function getServerSideProps({ req }) {
  const { user } = await getUser(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  return { props: { user } }
}
export default Dashboard

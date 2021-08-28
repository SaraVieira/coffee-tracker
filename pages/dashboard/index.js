import DashboardLayout from '../../components/Layout/DashboardLayout'
import { supabase } from '../../utils/initSupabase'
import { getUser } from '../../utils/requireAuth'

const Dashboard = () => <DashboardLayout>sup</DashboardLayout>
export async function getServerSideProps({ req }) {
  const { user } = await getUser(req)
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
export default Dashboard

import DashboardLayout from '../../components/Layout/DashboardLayout'

import Empty from '../../components/Empty'

import CoffeeAside from '../../components/Asides/CoffeeAside'
import { getCoffees } from '../../utils/api/coffee'

import { useQuery, useQueryClient } from 'react-query'
import { QUERIES } from '../../utils/constants'
import { useRouter } from 'next/router'
import Header from '../common/header'
import Coffee from './coffee'

const Coffees = ({ coffees: starterCoffees, user, roasters }) => {
  const { query } = useRouter()
  const id = query.id ? parseInt(query.id, 10) : null

  const { data: coffees } = useQuery(QUERIES.COFFEE_QUERY, () => getCoffees({ user }), {
    initialData: starterCoffees,
  })
  const queryClient = useQueryClient()

  const refetchData = () => {
    queryClient.invalidateQueries(QUERIES.COFFEE_QUERY)
  }

  return (
    <DashboardLayout title="Coffees">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch">
          <main className="flex-1 overflow-y-auto">
            <div className="pt-8 max-w-7xl mx-auto">
              <Header user={user} roasters={roasters} type="coffees" />
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                {coffees.length ? (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {coffees.map((coffee) => (
                      <Coffee key={coffee.id} coffee={coffee} />
                    ))}
                  </ul>
                ) : (
                  <Empty> No Coffees added</Empty>
                )}
              </section>
            </div>
          </main>

          {id && (
            <CoffeeAside
              refetchData={refetchData}
              currentCoffee={coffees.find((c) => c.id === id)}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Coffees

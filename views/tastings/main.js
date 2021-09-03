import DashboardLayout from '../../components/Layout/DashboardLayout'

import Empty from '../../components/Empty'

import CoffeeAside from '../../components/Asides/CoffeeAside'
import { useQuery, useQueryClient } from 'react-query'
import { QUERIES } from '../../utils/constants'
import { useRouter } from 'next/router'
import Header from '../common/header'
import Coffee from './coffee'
import { getTastings } from '../../utils/api/tastings'

const Tastings = ({ tastings: starterTastings, coffees, user, roasters }) => {
  const { query } = useRouter()
  const id = query.id ? parseInt(query.id, 10) : null

  const { data: tastings } = useQuery(QUERIES.TASTING_QUERY, () => getTastings({ user }), {
    initialData: starterTastings,
  })
  const queryClient = useQueryClient()

  const refetchData = () => {
    queryClient.invalidateQueries(QUERIES.TASTING_QUERY)
  }

  return (
    <DashboardLayout title="Tastings">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch">
          <main className="flex-1 overflow-y-auto">
            <div className="pt-8 max-w-7xl mx-auto">
              <Header user={user} roasters={roasters} type="tastings" />
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                {tastings.length ? (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {tastings.map((coffee) => (
                      <Coffee key={coffee.id} coffee={coffee} />
                    ))}
                  </ul>
                ) : (
                  <Empty> No tastings added</Empty>
                )}
              </section>
            </div>
          </main>

          {id && (
            <CoffeeAside
              refetchData={refetchData}
              currentCoffee={tastings.find((c) => c.id === id)}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Tastings

import { useState } from 'react'

import DashboardLayout from '../../components/Layout/DashboardLayout'
import RoastersAside from '../../components/Asides/RoastersAside'

import { getRoasters } from '../../utils/api/roasters'
import { useQuery } from 'react-query'
import { QUERIES } from '../../utils/constants'
import Header from '../common/header'
import Roaster from './roaster'
import { useRouter } from 'next/router'

const RoastersComponent = ({ roasters: starterRoasters, user }) => {
  const { query } = useRouter()
  const id = query.id ? parseInt(query.id, 10) : null
  const { data: roasters } = useQuery(QUERIES.ROASTER_QUERY, () => getRoasters({ user }), {
    initialData: starterRoasters,
  })

  return (
    <DashboardLayout title="Roasters">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch overflow">
          <main className="flex-1 overflow-y-auto">
            <div className="pt-8 max-w-7xl mx-auto">
              <Header type="roasters" user={user} />
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {roasters.map((roaster) => (
                    <Roaster key={roaster.id} roaster={roaster} />
                  ))}
                </ul>
              </section>
            </div>
          </main>

          {id && <RoastersAside currentRoaster={roasters.find((c) => c.id === id)} />}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RoastersComponent

import { useState } from 'react'

import {
  PlusIcon as PlusIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import RoastersAside from '../../../components/Asides/RoastersAside'
import classNames from '../../../utils/classsesNames'
import AddRoasterAside from '../../../components/Asides/AddRoasterAside'
import { getUser } from '../../../utils/requireAuth'
import { getRoasters } from '../../../utils/api/roasters'
import { useQuery, useQueryClient } from 'react-query'
import IncognitoAvatar from '../../../components/Avatar'
import { QUERIES } from '../../../utils/constants'

const Roasters = ({ roasters: starterRoasters, user }) => {
  const queryClient = useQueryClient()
  const { data: roasters } = useQuery(QUERIES.ROASTER_QUERY, () => getRoasters({ user }), {
    initialData: starterRoasters,
  })

  const [currentRoaster, setCurrentRoaster] = useState()
  const [showAdd, setShowAdd] = useState(false)

  return (
    <DashboardLayout title="Roasters">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch overflow">
          <main className="flex-1 overflow-y-auto">
            <div className="pt-8 max-w-7xl mx-auto">
              <div className="flex">
                <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center justify-end w-full">
                  <button
                    type="button"
                    className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Use list view</span>
                  </button>
                  <button
                    type="button"
                    className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Use grid view</span>
                  </button>

                  <button
                    onClick={() => setShowAdd(true)}
                    className="ml-3 inline-flex bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
                  >
                    <PlusIconSolid className="h-5 w-5 mr-1" aria-hidden="true" /> Add a roaster
                  </button>
                  {showAdd && (
                    <AddRoasterAside
                      user={user}
                      onClose={() => {
                        setShowAdd(false)
                        queryClient.invalidateQueries(QUERIES.ROASTER_QUERY)
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Gallery */}
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {roasters.map((roaster) => (
                    <li key={roaster.id} className="relative">
                      <button
                        type="button"
                        className="focus:outline-none text-left w-full h-full"
                        onClick={() => {
                          setCurrentRoaster(roaster)
                        }}
                      >
                        <div
                          className={classNames(
                            roaster.id === currentRoaster?.id
                              ? 'ring-2 ring-offset-2 ring-indigo-500'
                              : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden h-full'
                          )}
                        >
                          {roaster.image ? (
                            <img
                              src={roaster.image}
                              alt={roaster.name}
                              className={classNames(
                                roaster.id === currentRoaster?.id ? '' : 'group-hover:opacity-75',
                                'object-cover pointer-events-none w-full h-full rounded-lg'
                              )}
                            />
                          ) : (
                            <>
                              <div
                                className={classNames(
                                  roaster.id === currentRoaster?.id ? '' : 'group-hover:opacity-75',
                                  'text-center flex items-center text-white h-full justify-center bold text-6xl object-cover pointer-events-none rounded-lg'
                                )}
                              >
                                <IncognitoAvatar name={roaster.name} />
                              </div>
                            </>
                          )}
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                          {roaster.name}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>

          {currentRoaster && (
            <RoastersAside currentRoaster={currentRoaster} setCurrentRoaster={setCurrentRoaster} />
          )}
        </div>
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

  return {
    props: {
      user,
      roasters,
    },
  }
}

export default Roasters

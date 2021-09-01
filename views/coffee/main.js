import { useState } from 'react'

import {
  PlusIcon as PlusIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import classNames from '../../utils/classsesNames'
import Empty from '../../components/Empty'
import AddCoffeeAside from '../../components/Asides/AddCoffeeAside'
import CoffeeAside from '../../components/Asides/CoffeeAside'
import { getCoffees } from '../../utils/api/coffee'
import IncognitoAvatar from '../../components/Avatar'
import { useQuery, useQueryClient } from 'react-query'
import { COFFEES_ROUTE, QUERIES } from '../../utils/constants'
import { useRouter } from 'next/router'

const Coffees = ({ coffees: starterCoffees, user, roasters}) => {
  const {query, push} = useRouter()
  const [currentCoffee, setCurrentCoffee] = useState(query.id ? starterCoffees.find(c => c.id === query.id) : null)
  const [showAdd, setShowAdd] = useState(false)
  const { data: coffees } = useQuery(QUERIES.COFFEE_QUERY, () => getCoffees({ user }), {
    initialData: starterCoffees,
  })
  const queryClient = useQueryClient()

  const refetchData = () => {
    setShowAdd(false)
    queryClient.invalidateQueries(QUERIES.COFFEE_QUERY)
  }


  return (
    <DashboardLayout title="Coffees">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch">
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
                    <PlusIconSolid className="h-5 w-5 mr-1" aria-hidden="true" /> Add a coffee
                  </button>
                  {showAdd && (
                    <AddCoffeeAside user={user} roasters={roasters} onClose={refetchData} />
                  )}
                </div>
              </div>

              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                {coffees.length ? (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {coffees.map((coffee) => (
                      <li key={coffee.id} className="relative">
                        <button
                          type="button"
                          className="focus:outline-none text-left w-full h-full"
                          onClick={() => {
                            setCurrentCoffee(coffee)
                            push(`${COFFEES_ROUTE}/${coffee.id}`, null, {shallow: true})
                          }}
                        >
                          <div
                            className={classNames(
                              coffee.id === query.id
                                ? 'ring-2 ring-offset-2 ring-indigo-500'
                                : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                              'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden h-full'
                            )}
                          >
                            {coffee.image ? (
                              <img
                                src={coffee.image}
                                alt={coffee.name}
                                className={classNames(
                                  coffee.id === query.id ? '' : 'group-hover:opacity-75',
                                  'object-cover pointer-events-none w-full h-full rounded-lg'
                                )}
                              />
                            ) : (
                              <div
                                className={classNames(
                                  coffee.id === query.id ? '' : 'group-hover:opacity-75',
                                  'text-center flex items-center text-white h-full justify-center bold text-6xl object-cover pointer-events-none rounded-lg'
                                )}
                              >
                                <IncognitoAvatar name={coffee.name} />
                              </div>
                            )}
                          </div>
                          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                            {coffee.name}
                          </p>
                          <p className="mt-2 block text-sm font-medium text-gray-600 truncate pointer-events-none">
                            {coffee.roaster.name}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty> No Coffees added</Empty>
                )}
              </section>
            </div>
          </main>

          {query.id && currentCoffee &&  (
            <CoffeeAside
              refetchData={refetchData}
              currentCoffee={currentCoffee}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Coffees
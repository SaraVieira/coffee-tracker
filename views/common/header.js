import {
  PlusIcon as PlusIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid'
import AddRoasterAside from '../../components/Asides/AddRoasterAside'
import AddCoffeeAside from '../../components/Asides/AddCoffeeAside'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { QUERIES } from '../../utils/constants'

const Header = ({ type, ...props }) => {
  const [showAdd, setShowAdd] = useState(false)
  const queryClient = useQueryClient()

  const refetchData = () => {
    setShowAdd(false)
    const QUERY = type === 'roasters' ? QUERIES.ROASTER_QUERY : QUERIES.COFFEE_QUERY
    queryClient.invalidateQueries(QUERY)
  }

  return (
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
          <PlusIconSolid className="h-5 w-5 mr-1" aria-hidden="true" /> Add a{' '}
          {type === 'roasters' ? 'roaster' : 'coffee'}
        </button>
        {showAdd ? (
          type === 'roasters' ? (
            <AddRoasterAside {...props} onClose={refetchData} />
          ) : (
            <AddCoffeeAside {...props} onClose={refetchData} />
          )
        ) : null}
      </div>
    </div>
  )
}

export default Header

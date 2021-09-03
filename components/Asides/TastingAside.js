import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { removeCoffee } from '../../utils/api/coffee'
import { removeTasting } from '../../utils/api/tastings'
import classNames from '../../utils/classsesNames'
import { TASTINGS_ROUTE } from '../../utils/constants'
import IncognitoAvatar from '../Avatar'
import AsideWrapper from './Wrapper'

const TastingAside = ({ refetchData, currentTasting }) => {
  const router = useRouter()
  const info = [
    { key: 'Roaster', value: currentTasting.roaster.name, href: currentTasting.roaster.website },
    { key: 'Coffee', value: currentTasting.coffee.name },
  ]
  const sendHome = () => router.push(TASTINGS_ROUTE, undefined, { shallow: true })

  const mutation = useMutation(() => removeTasting({ id: currentTasting.id }), {
    onSuccess: () => {
      sendHome()
      refetchData()
    },
  })

  return (
    <AsideWrapper closeAside={sendHome}>
      <div className="pb-16 space-y-6">
        <div>
          <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
            {currentTasting.image ? (
              <img src={currentTasting.image} alt={currentTasting.name} className="object-cover" />
            ) : (
              <div
                className={classNames(
                  'text-center flex items-center text-white h-[200px] justify-center bold text-6xl object-cover pointer-events-none'
                )}
              >
                <IncognitoAvatar name={currentTasting.name} />
              </div>
            )}
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {currentTasting.name}
              </h2>
              <p className="text-sm font-medium text-gray-500">{currentTasting.notes}</p>
            </div>
          </div>
        </div>
        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          <div className="py-3 flex justify-between text-sm font-medium">
            <dt className="text-gray-500">Liked</dt>
            <dd className="text-gray-900 text-right">
              {currentTasting.liked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </dd>
          </div>
          {info.map(
            ({ key, value, href }) =>
              value && (
                <div className="py-3 flex justify-between text-sm font-medium" key={key}>
                  <dt className="text-gray-500">{key}</dt>
                  <dd className="text-gray-900 text-right">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-500"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              )
          )}
        </dl>
        {currentTasting.notes && (
          <div>
            <h3 className="font-medium text-gray-900">Notes</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{currentTasting.notes}</p>
            </div>
          </div>
        )}

        <div className="flex">
          <a
            href={''}
            className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
          >
            Add a tasting
          </a>
          <button
            onClick={mutation.mutate}
            type="button"
            className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Delete
          </button>
        </div>
      </div>
    </AsideWrapper>
  )
}

export default TastingAside

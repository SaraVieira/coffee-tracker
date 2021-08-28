import classNames from '../../utils/classsesNames'
import getInitials from '../../utils/getInitials'
import AsideWrapper from './Wrapper'

const CoffeeAside = ({ setCurrentCoffee, setCoffees, currentCoffee }) => {
  const info = [
    { key: 'Roaster', value: currentCoffee.roaster.name, href: currentCoffee.roaster.website },
    { key: 'Roast', value: currentCoffee.roast },
    { key: 'Origin', value: `${currentCoffee.origin_city}, ${currentCoffee.origin_country}` },
    { key: 'Flavors', value: currentCoffee.flavors },
  ]

  return (
    <AsideWrapper
      closeAside={() => {
        setCurrentCoffee(null)
        setCoffees((ro) =>
          ro.map((a) => ({
            ...a,
            active: false,
          }))
        )
      }}
    >
      <div className="pb-16 space-y-6">
        <div>
          <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
            {currentCoffee.image ? (
              <img src={currentCoffee.image} alt={currentCoffee.name} className="object-cover" />
            ) : (
              <div
                className={classNames(
                  'text-center flex items-center text-white h-[200px] justify-center bold text-6xl object-cover pointer-events-none'
                )}
                style={{
                  background: currentCoffee.color,
                }}
              >
                {getInitials(currentCoffee.name)}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {currentCoffee.name}
              </h2>
              <p className="text-sm font-medium text-gray-500">{currentCoffee.notes}</p>
            </div>
          </div>
        </div>
        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          {info.map(({ key, value, href }) => (
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">{key}</dt>
              <dd className="text-gray-900">
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
          ))}
        </dl>
        {currentCoffee.notes && (
          <div>
            <h3 className="font-medium text-gray-900">Notes</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{currentCoffee.notes}</p>
            </div>
          </div>
        )}

        {currentCoffee.tastings && (
          <div>
            <h3 className="font-medium text-gray-900">Tastings</h3>
            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              {Object.keys(currentCoffee.tastings).map((key) => (
                <div key={key} className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">{key}</dt>
                  <dd className="text-gray-900">{currentCoffee.information[key]}</dd>
                </div>
              ))}
            </dl>
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

export default CoffeeAside

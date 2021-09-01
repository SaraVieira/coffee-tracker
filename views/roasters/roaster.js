import { useRouter } from 'next/router'
import IncognitoAvatar from '../../components/Avatar'
import classNames from '../../utils/classsesNames'
import { ROASTERS_ROUTE } from '../../utils/constants'

const Roaster = ({ roaster }) => {
  const { query, push } = useRouter()
  const id = parseInt(query?.id)

  return (
    <li className="relative">
      <button
        type="button"
        className="focus:outline-none text-left w-full h-full"
        onClick={() => push(`${ROASTERS_ROUTE}?id=${roaster.id}`, null, { shallow: true })}
      >
        <div
          className={classNames(
            roaster.id === id
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
                roaster.id === id ? '' : 'group-hover:opacity-75',
                'object-cover pointer-events-none w-full h-full rounded-lg'
              )}
            />
          ) : (
            <>
              <div
                className={classNames(
                  roaster.id === id ? '' : 'group-hover:opacity-75',
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
  )
}

export default Roaster

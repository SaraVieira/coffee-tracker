import { useState } from 'react'
import { supabase } from '../../utils/initSupabase'
import countries from '../../utils/countries'
import Avatar from '../UploadImages'
import AsideWrapper from './Wrapper'

const AddCoffeeAside = ({ user, onClose, roasters }) => {
  const [state, setState] = useState({})

  const addCoffee = async (e) => {
    e.preventDefault()
    try {
      await supabase.from('coffees').insert({
        user: user.id,
        ...state,
      })
      onClose()
    } catch {}
  }

  return (
    <AsideWrapper closeAside={onClose}>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={addCoffee}>
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={state.name}
                  onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="adress" className="block text-sm font-medium text-gray-700">
                Roaster
              </label>
              <div className="mt-1">
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={state.roaster}
                  onChange={(e) => setState((s) => ({ ...s, roaster: e.target.value }))}
                >
                  <option>Select a Roaster</option>
                  {roasters.map((roaster) => (
                    <option value={roaster.id}>{roaster.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="adress" className="block text-sm font-medium text-gray-700">
                Origin City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={state.origin_city}
                  onChange={(e) => setState((s) => ({ ...s, origin_city: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="adress" className="block text-sm font-medium text-gray-700">
                Origin Country
              </label>
              <div className="mt-1">
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={state.origin_country}
                  onChange={(e) => setState((s) => ({ ...s, origin_country: e.target.value }))}
                >
                  {' '}
                  <option>Select a country</option>
                  {countries.map((country) => (
                    <option value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="adress" className="block text-sm font-medium text-gray-700">
                Roast
              </label>
              <div className="mt-1">
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={state.roast}
                  onChange={(e) => setState((s) => ({ ...s, roast: e.target.value }))}
                >
                  <option>Select a Roast</option>
                  <option value="Espresso">Espresso</option>
                  <option value="Filter">Filter</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>

            <Avatar
              onUpload={(url) =>
                setState((s) => ({
                  ...s,
                  image: `https://aakriwpnapmmttzkjrdz.supabase.in/storage/v1/object/public/coffees/${url}`,
                }))
              }
              storageName="coffees"
            />
            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Flavors
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={state.flavors}
                  onChange={(e) => setState((s) => ({ ...s, flavors: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                  value={state.notes}
                  onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </AsideWrapper>
  )
}

export default AddCoffeeAside

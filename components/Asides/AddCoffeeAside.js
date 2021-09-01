import { useMemo, useState } from 'react'
import { COFFEE_STORAGE, STORAGE_BASE_URL } from '../../utils/constants'
import Input from '../form/Input'
import Textarea from '../form/TextArea'
import Select from '../form/Select'
import Avatar from '../UploadImages'
import AsideWrapper from './Wrapper'
import { addCoffee } from '../../utils/api/coffee'
const AddCoffeeAside = ({ user, onClose, roasters }) => {
  const [state, setState] = useState({})

  const insertCoffee = async (e) => {
    e.preventDefault()
    try {
      await addCoffee({
        user: user.id,
        ...state,
      })
      onClose()
    } catch {}
  }

  const roasterOptions = useMemo(
    () => roasters.map((roaster) => ({ key: roaster.id, value: roaster.name })),
    [roasters]
  )

  return (
    <AsideWrapper closeAside={onClose}>
      <form className="space-y-8" onSubmit={insertCoffee}>
        <div>
          <Input
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            name="name"
            label="Name"
            required
          />
          <Select
            required
            name="roaster"
            label="roaster"
            options={roasterOptions}
            value={state.roaster}
            onChange={(e) => setState((s) => ({ ...s, roaster: e.target.value }))}
          />

          <Input
            value={state.origin_city}
            onChange={(e) => setState((s) => ({ ...s, origin_city: e.target.value }))}
            name="originCity"
            label="Origin City"
          />
          <Input
            value={state.origin_country}
            onChange={(e) => setState((s) => ({ ...s, origin_country: e.target.value }))}
            name="originCountry"
            label="Origin Country"
          />
          <Select
            name="roast"
            label="Roast"
            options={[
              {
                key: 'Espresso',
                value: 'Espresso',
              },
              {
                key: 'Filter',
                value: 'Filter',
              },
              {
                key: 'Mixed',
                value: 'Mixed',
              },
            ]}
            value={state.roast}
            onChange={(e) => setState((s) => ({ ...s, roast: e.target.value }))}
          />

          <Avatar
            onUpload={(url) =>
              setState((s) => ({
                ...s,
                image: `${STORAGE_BASE_URL}${COFFEE_STORAGE}/${url}`,
              }))
            }
            storageName={COFFEE_STORAGE}
          />
          <Input
            value={state.flavors}
            onChange={(e) => setState((s) => ({ ...s, flavors: e.target.value }))}
            name="flavors"
            label="Flavors"
          />
          <Textarea
            name="notes"
            label="Notes"
            value={state.notes}
            onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          />
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

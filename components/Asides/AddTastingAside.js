import { useMemo, useState } from 'react'
import { COFFEE_STORAGE, STORAGE_BASE_URL } from '../../utils/constants'
import Input from '../form/Input'
import Textarea from '../form/TextArea'
import Select from '../form/Select'

import Avatar from '../UploadImages'
import AsideWrapper from './Wrapper'
import { addTasting } from '../../utils/api/tastings'
import { CoffeeIcon } from '../Icons'
import Checkbox from '../form/Checkbox'

const AddTastingAside = ({ user, onClose, roasters, coffees }) => {
  const [state, setState] = useState({
    name: `Tasting at ${new Intl.DateTimeFormat('en').format()}`,
  })

  const insertTasting = async (e) => {
    e.preventDefault()
    try {
      await addTasting({
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
  const coffeeOptions = useMemo(
    () =>
      coffees
        .filter((c) => c.roaster === parseInt(state.roaster))
        .map((coffee) => ({ key: coffee.id, value: coffee.name })),
    [coffees, state.roaster]
  )

  return (
    <AsideWrapper closeAside={onClose}>
      <form className="space-y-8" onSubmit={insertTasting}>
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
            label="Roaster"
            options={roasterOptions}
            value={state.roaster}
            onChange={(e) => setState((s) => ({ ...s, roaster: e.target.value }))}
          />
          <Select
            disabled={!state.roaster}
            required
            name="coffee"
            label="Coffee"
            options={coffeeOptions}
            value={state.coffee}
            onChange={(e) => setState((s) => ({ ...s, coffee: e.target.value }))}
          />

          <Rating label="Taste" onChange={(value) => setState((s) => ({ ...s, taste: value }))} />
          <Rating label="Smell" onChange={(value) => setState((s) => ({ ...s, smell: value }))} />
          <Checkbox
            name="liked"
            label="Liked"
            description="     I liked this tasting"
            onChange={(e) => setState((s) => ({ ...s, liked: e.target.checked }))}
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

function RatingIcon({ index, rating, hoverRating, onMouseEnter, onMouseLeave, onSaveRating }) {
  const getColor = () => {
    if (hoverRating >= index || (!hoverRating && rating >= index)) {
      return '#a1a82f'
    }
    return 'currentColor'
  }

  return (
    <button
      type="button"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <CoffeeIcon style={{ color: getColor() }} />
    </button>
  )
}

const Rating = ({ onChange, name, label }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const onSaveRating = (index) => {
    setRating(index)
    onChange(index)
  }
  return (
    <div className="mt-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <RatingIcon
              index={index}
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={(i) => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              onSaveRating={onSaveRating}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AddTastingAside

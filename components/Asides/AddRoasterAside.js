import { useState } from 'react'
import { addRoaster } from '../../utils/api/roasters'
import { ROASTERS_STORAGE, STORAGE_BASE_URL } from '../../utils/constants'
import Input from '../form/Input'
import Textarea from '../form/TextArea'
import Avatar from '../UploadImages'
import AsideWrapper from './Wrapper'

const AddRoasterAside = ({ user, onClose }) => {
  const [state, setState] = useState({})

  const insertRoaster = async (e) => {
    e.preventDefault()
    try {
      await addRoaster({
        userId: user.id,
        ...state,
      })
      onClose()
    } catch {}
  }

  return (
    <AsideWrapper closeAside={onClose}>
      <form className="space-y-8" onSubmit={insertRoaster}>
          <Input
            name="name"
            label="Name"
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            autoComplete="given-name"
            required
          />
          <Input
            name="address"
            label="Address"
            value={state.location}
            onChange={(e) => setState((s) => ({ ...s, location: e.target.value }))}
          />

          <Avatar
            onUpload={(url) =>
              setState((s) => ({
                ...s,
                image: `${STORAGE_BASE_URL}${ROASTERS_STORAGE}/${url}`,
              }))
            }
            storageName="roasters"
          />
          <Textarea
            name="notes"
            label="Notes"
            value={state.notes}
            onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          />
          <Input
            name="website"
            label="Website"
            value={state.website}
            onChange={(e) => setState((s) => ({ ...s, website: e.target.value }))}
          />

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

export default AddRoasterAside

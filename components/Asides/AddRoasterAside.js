import { useState } from 'react'
import { supabase } from '../../utils/initSupabase'
import Avatar from '../UploadImages'
import AsideWrapper from './Wrapper'

const AddRoasterAside = ({ user, onClose }) => {
  const [state, setState] = useState({})

  const addRoaster = async (e) => {
    e.preventDefault()
    try {
      await supabase.from('roasters').insert({
        userId: user.id,
        ...state,
      })
      onClose()
    } catch {}
  }

  return (
    <AsideWrapper closeAside={onClose}>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={addRoaster}>
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
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="adress"
                  id="adress"
                  required
                  autoComplete="given-adress"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={state.location}
                  onChange={(e) => setState((s) => ({ ...s, location: e.target.value }))}
                />
              </div>
            </div>
            <Avatar
              onUpload={(url) =>
                setState((s) => ({
                  ...s,
                  image: `https://aakriwpnapmmttzkjrdz.supabase.in/storage/v1/object/public/roasters/${url}`,
                }))
              }
              storageName="roasters"
            />
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
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

export default AddRoasterAside

// <div className="sm:col-span-6">
// <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
//   Cover photo
// </label>
// <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//   <div className="space-y-1 text-center">
//     <svg
//       className="mx-auto h-12 w-12 text-gray-400"
//       stroke="currentColor"
//       fill="none"
//       viewBox="0 0 48 48"
//       aria-hidden="true"
//     >
//       <path
//         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//     <div className="flex text-sm text-gray-600">
//       <label
//         htmlFor="file-upload"
//         className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//       >
//         <span>Upload a file</span>
//         <input
//           id="file-upload"
//           name="file-upload"
//           type="file"
//           className="sr-only"
//         />
//       </label>
//       <p className="pl-1">or drag and drop</p>
//     </div>
//     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//   </div>
// </div>
// </div>

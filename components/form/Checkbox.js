const Checkbox = ({ label, name, description, ...props }) => (
  <div className="mt-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <fieldset class="space-y-5">
        <legend class="sr-only"> {label}</legend>
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input
              id={name}
              name={name}
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              {...props}
            />
          </div>
          <div class="ml-3 text-sm">
            <label for={name} class="font-medium text-gray-700">
              {description}
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
)

export default Checkbox

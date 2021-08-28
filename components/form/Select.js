const Select = ({ label, name, options, ...props }) => (
  <div className="mt-6">
    <label htmlFor="adress" className="block text-sm font-medium text-gray-700">
      Roaster
    </label>
    <div className="mt-1">
      <select
        id="location"
        name="location"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        {...props}
      >
        <option>Select a Roaster</option>
        {options.map((option) => (
          <option value={option.key}>{option.value}</option>
        ))}
      </select>
    </div>
  </div>
)

export default Select

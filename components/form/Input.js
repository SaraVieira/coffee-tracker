const Input = ({ label, name, ...props }) => (
  <div className="mt-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        type="text"
        name={name}
        id={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        {...props}
      />
    </div>
  </div>
)

export default Input

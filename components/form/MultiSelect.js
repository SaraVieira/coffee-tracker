import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const MultiSelect = ({ options, name, label, ...props }) => {
  return (
    <div className="mt-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <Select
          options={options}
          isMulti
          name={name}
          closeMenuOnSelect={false}
          components={animatedComponents}
          {...props}
        />
      </div>
    </div>
  )
}

export default MultiSelect

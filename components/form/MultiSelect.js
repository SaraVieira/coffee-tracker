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
          styles={{
            indicatorSeparator: () => ({ display: 'none' }),
            placeholder: () => ({
              fontSize: '0.875rem',
              color: 'rgba(55, 65, 81, 1))',
              paddingLeft: 5,
            }),
            control: (p) => ({
              ...p,
              borderRadius: '0.375rem',
              borderColor: 'rgba(209, 213, 219, 1)',
            }),
            indicatorsContainer: (p) => ({
              ...p,
              color: 'hsl(0, 0%, 60%)',
            }),
          }}
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

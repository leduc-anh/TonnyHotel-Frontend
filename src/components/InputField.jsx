import PropTypes from 'prop-types';

const InputField = ({ icon, name, value, placeholder, onChange }) => (
  <div className='flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
    <div className='px-3'>{icon}</div>
    <input
      type='text'
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='w-full p-2 outline-none bg-transparent text-gray-800 dark:text-gray-100'
    />
  </div>
);

InputField.propTypes = {
  icon: PropTypes.element,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  icon: null,
  placeholder: '',
};

export default InputField;

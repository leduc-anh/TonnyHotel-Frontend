import PropTypes from 'prop-types';

const DisplayField = ({ icon, label, value }) => (
  <div className='flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800'>
    {icon}
    <span className='font-medium text-gray-600 dark:text-gray-300 w-32'>
      {label}:
    </span>
    <span className='text-gray-800 dark:text-gray-100'>{value || '-'}</span>
  </div>
);

DisplayField.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

DisplayField.defaultProps = {
  icon: null,
  value: '-',
};

export default DisplayField;

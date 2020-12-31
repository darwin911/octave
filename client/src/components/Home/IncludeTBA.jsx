import React from 'react';

const IncludeTBA = ({ isChecked, onChange }) => {
  return (
    <div>
      <label htmlFor='include-tba'>
        {isChecked ? 'Include TBA' : 'Less data, more faster'}
        <input
          type='checkbox'
          name='include-tba'
          id='include-tba'
          value={isChecked}
          onChange={(ev) => onChange(ev.target.checked)}
        />
      </label>
    </div>
  );
};

export default IncludeTBA;

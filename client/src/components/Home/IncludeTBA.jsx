import React from 'react';

const IncludeTBA = ({ isChecked, onChange }) => {
  return (
    <div>
      <label htmlFor='include-tba'>
        <span>Include TBA: </span>
        <input
          type='checkbox'
          name='includeTBA'
          id='include-tba'
          value={isChecked}
          onChange={(ev) =>
            onChange((prevState) => ({
              ...prevState,
              includeTBA: ev.target.checked,
            }))
          }
        />
      </label>
    </div>
  );
};

export default IncludeTBA;

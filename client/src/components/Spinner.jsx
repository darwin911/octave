import React from 'react';

export const Spinner = ({ size = 100 }) => {
  return (
    <div
      className='spinner spinner-3'
      style={{ '--spinner-dimensions': `${size}px`, width: `${size}px`, height: `${size}px` }}
    />
  );
};

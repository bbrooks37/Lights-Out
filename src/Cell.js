import React from 'react';

function Cell({ isOn, onClick }) {
  return (
    <button 
      className={`cell ${isOn ? 'on' : 'off'}`} 
      onClick={onClick}
    />
  );
}

export default Cell;
import React from 'react';

// CSS
import './index.css';

const ButtonPlain = ({text, type}) => {

  return (
    <button 
      id="plain"
      type={type}
      >
      {text}
    </button>
  );
  
}


export default ButtonPlain;
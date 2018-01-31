import React from 'react';
import classes from './Button.css';

const button = (props) => (
  // btnType has to be .Success or .Danger
  // join the array elements into a classes string
  <button 
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;
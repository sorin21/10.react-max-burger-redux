import React from "react";
import classes from './Modal.css'

const modal = (props) => {
  const modalAnimationStyle = {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    };
  return(
    <div 
      className={classes.Modal}
      style={modalAnimationStyle}>
      {props.children}
    </div>
  );
};

export default modal;
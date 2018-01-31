import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidate && props.touched) {
    // if invalid push the Invalid class
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case 'input':
      // get the input atributes with ...props 
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed} />;
      break;
    case 'textarea':
      inputElement = <textarea c
        lassName={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed} />;
      break;
    case 'select':
      inputElement = <select 
        className={inputClasses.join(' ')} 
        value={props.value}
        onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>;
      break;
  
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
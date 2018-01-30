import React from "react";
import classes from './Order.css';

const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: </p>
    {/* Transform a string into a number */}
    <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong> </p>
  </div>
);

export default order;

import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css'

const navigationItem = props => (
  <ul className={classes.NavigationItem}>
    <li>
      {/* exact is used if is the exact/active route */}
      <NavLink 
        exact={props.exact} 
        to={props.link} 
        activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  </ul>
);

export default navigationItem;
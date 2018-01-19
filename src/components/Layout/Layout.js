import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>
      {/* output the component we wrap this layout 
     so use this layout as wrapper around the core content
     that we want to render to the screen*/}
      {props.children}
    </main>
  </Aux>
);

export default layout;
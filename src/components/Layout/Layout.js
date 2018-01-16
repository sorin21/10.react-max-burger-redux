import React from "react";
import Aux from "../../hoc/Auxiliary";

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
      {/* output the component we wrap this layout 
     so use this layout as wrapper around the core content
     that we want to render to the screen*/}
      {props.children}
    </main>
  </Aux>
);

export default layout;
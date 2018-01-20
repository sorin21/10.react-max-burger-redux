import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary";
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    // seState() is asynchronous and to pass this.state.showSideDrawer 
    // with no issue we have to use prevState
    // switch between false and true
    // prevState is passed by default
    this.setState((prevState) => {  
      return { showSideDrawer:  !prevState.showSideDrawer };
    });
  }

  render() {
    return <Aux>
        <Toolbar drawerTooggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {/* output the component we wrap this layout 
        so use this layout as wrapper around the core content
        that we want to render to the screen*/}
          {this.props.children}
        </main>
      </Aux>;
  }
}

export default Layout;
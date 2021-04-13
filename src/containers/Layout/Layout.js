import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state={
        showSideDrawer:false
    }
    SideDrawerCloseHandler= () =>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerOpenHandler= () =>{
        this.setState((prevState) =>{ return {showSideDrawer:!prevState.showSideDrawer}});
    }
    render(){
    return ( 
        <Aux>
            <Toolbar openDrawer={this.SideDrawerOpenHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
            <main className={classes.content}>{this.props.children}</main>
        </Aux>
     );
    }
}
 
export default Layout;
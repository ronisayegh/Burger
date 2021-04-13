import classes from './NavigationItems.module.css';
import React from 'react';
import NavigationItem from './NavigatiItem/NavigationItem';


const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' >Burger Builder</NavigationItem>
            <NavigationItem link='/orders' >Orders</NavigationItem>
        </ul>
    )
}

export default navigationItems

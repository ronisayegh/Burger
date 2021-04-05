import React from 'react';
import classes from './Burger.module.css';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant'

const burger = () => {
    return (
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top"></BurgerIngrediant>
            <BurgerIngrediant type="cheese"></BurgerIngrediant>
            <BurgerIngrediant type="meat"></BurgerIngrediant>
            <BurgerIngrediant type="bread-bottom"></BurgerIngrediant>
        </div>
    )
}

export default burger;


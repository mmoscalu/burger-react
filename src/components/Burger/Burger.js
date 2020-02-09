import React from 'react';
import classes from './Burger.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            <BurgerIngridient type="meat"/>
            <BurgerIngridient type="cheese"/>
            <BurgerIngridient type="salad"/>
            <BurgerIngridient type="meat"/>
            <BurgerIngridient type="bread-bottom"/>
        </div>
    )
}

export default burger;
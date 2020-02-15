import React from 'react';
import classes from './Burger.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    let transformIngridients = Object.keys(props.ingridients)
    .map(igKey => {
        return [...Array(props.ingridients[igKey])].map((_key, index) => {
            return <BurgerIngridient key={igKey + index} type={igKey} />
        })
    })
    .reduce((array, element) => {
        return array.concat(element);
    }, []);

    if (transformIngridients.length === 0) {
        transformIngridients = <p>Please start adding ingridients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            { transformIngridients }
            <BurgerIngridient type="bread-bottom"/>
        </div>
    )
}

export default burger;
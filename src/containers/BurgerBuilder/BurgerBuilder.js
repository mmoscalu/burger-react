import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 1.5,
    bacon: 1.7,
    cheese: 1
}

class BurgerBuilder extends Component {

    state = {
        ingridients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 5
    }

    addIngridientsHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients});
    }

    removeIngridientsHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        if (oldCount <= 0) { return; }
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients});
    }

    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <p>Total Price: {this.state.totalPrice.toFixed(2)}</p>
                <BuildControls
                    ingridientAdded ={this.addIngridientsHandler}
                    ingridientRemoved={this.removeIngridientsHandler}
                />
            </Aux>
        )
    }

}

export default BurgerBuilder;
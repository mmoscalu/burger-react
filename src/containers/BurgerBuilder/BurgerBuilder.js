import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 5,
        purchasable: false,
        purchasing: false
    }

    updatePurchasableState(ingridients) {
        const sum = Object.keys(ingridients)
            .map(igKey => {
                return ingridients[igKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0)
        this.setState({ purchasable: sum > 0 })
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
        this.updatePurchasableState(updatedIngridients);
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
        this.updatePurchasableState(updatedIngridients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchasingContinueHandler = () => {
        this.setState({purchasing: false})
        alert('You continue');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal  show={this.state.purchasing}
                        modalClosed={this.purchasingCancelHandler}>
                    <OrderSummary   ingridients={this.state.ingridients}
                                    price={this.state.totalPrice}
                                    cancelled={this.purchasingCancelHandler}
                                    continued={this.purchasingContinueHandler}/>
                </Modal>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls
                    ingridientAdded ={this.addIngridientsHandler}
                    ingridientRemoved={this.removeIngridientsHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                    totalPrice={this.state.totalPrice}
                />
            </Aux>
        )
    }

}

export default BurgerBuilder;
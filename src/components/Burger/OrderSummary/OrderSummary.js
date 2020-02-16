import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingridientsSummary = Object.keys(props.ingridients)
        .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingridients[igKey]}
            </li>)
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingtidients:</p>
            <ul>
                {ingridientsSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
}

export default orderSummary;
import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
    <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelled}
                    btnType="Danger">Cancel</Button>
            <Button btnType="Success"
                    clicked={props.continued}>Continue</Button>
        </Aux>
    );
}

export default orderSummary;
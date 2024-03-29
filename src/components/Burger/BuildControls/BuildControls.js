import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(_control => {
            return <BuildControl
                key={_control.label}
                label={_control.label}
                added={() => props.ingridientAdded(_control.type)}
                removed={() => props.ingridientRemoved(_control.type)}
                disabled={props.disabled[_control.type]}
                />
        })}
        <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
                >Order Now</button>
    </div>
);

export default buildControls;
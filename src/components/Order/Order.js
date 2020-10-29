import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingridients = [];
  for (let name in props.ingridients) {
    ingridients.push({
      name: name,
      amount: props.ingridients[name],
    });
  }

  const ingridientOutput = ingridients.map((ig) => {
    return (
      <span>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingridientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;

import React from 'react';
import classes from './Order.css';
import Button from '../UI/Button/Button';

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
      <span key={ig.name} className={classes.ingridientOutput}>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <div className={classes.IngridientWrapper}>
        <p>Ingredients: {ingridientOutput}</p>
        <p>
          Price: <strong>USD {props.price.toFixed(2)}</strong>
        </p>
      </div>
      <Button btnType="Warning" clicked={props.removed}>X</Button>
    </div>
  );
};

export default order;

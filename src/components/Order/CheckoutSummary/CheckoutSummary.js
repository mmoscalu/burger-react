import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.Burger}>
        <Burger ingridients={props.ingridients} />
      </div>
      <Button btnType='Danger' clicked={props.checkoutClickCanceled}>
        Cancel
      </Button>
      <Button btnType='Success' clicked={props.checkoutClickContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;

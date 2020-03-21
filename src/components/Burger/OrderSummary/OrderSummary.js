import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {
    const ingridientsSummary = Object.keys(this.props.ingridients).map(
      igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
            {this.props.ingridients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingtidients:</p>
        <ul>{ingridientsSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancelled} btnType='Danger'>
          Cancel
        </Button>
        <Button btnType='Success' clicked={this.props.continued}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingridients: null,
    price: 0
  };

  componentWillMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingridients = {};
      let price = 0;
      for (let param of query.entries()) {
          if (param[0] === 'price') {
            price = +param[1];
          } else {
            ingridients[param[0]] = +param[1]
          }
      }
      this.setState({ingridients: ingridients, price: price});
  }

  onClickCancelHandler = () => {
    this.props.history.goBack();
  };

  onClickContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.state.ingridients}
          checkoutClickCanceled={this.onClickCancelHandler}
          checkoutClickContinued={this.onClickContinueHandler}
        />
        <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingridients={this.state.ingridients} price={this.state.price} {...props} />)} />
      </div>
    );
  }
}

export default Checkout;

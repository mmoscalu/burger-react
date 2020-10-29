import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingridients: {}
  };

  componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingridients = {};
      for (let param of query.entries()) {
          ingridients[param[0]] = +param[1]
      }
      this.setState({ingridients: ingridients});
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
        <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;

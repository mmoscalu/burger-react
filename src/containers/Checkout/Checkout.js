import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
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
          ingridients={this.props.ingridients}
          checkoutClickCanceled={this.onClickCancelHandler}
          checkoutClickContinued={this.onClickContinueHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.ingridients
  };
};

export default connect(mapStateToProps)(Checkout);

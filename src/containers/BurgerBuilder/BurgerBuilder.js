import React, { Component } from 'react';
import axios from '../../axios-inctance';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchasableState(ingridients) {
    const sum = Object.keys(ingridients)
      .map((igKey) => {
        return ingridients[igKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    return sum > 0;
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasingContinueHandler = () => {
    this.setState({ loading: true });
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingridients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingridients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingridients) {
      burger = (
        <Aux>
          <Burger ingridients={this.props.ingridients} />
          <BuildControls
            ingridientAdded={this.props.addedIngridientsHandler}
            ingridientRemoved={this.props.removedIngridientsHandler}
            disabled={disabledInfo}
            purchasable={this.updatePurchasableState(this.props.ingridients)}
            ordered={this.purchasingHandler}
            totalPrice={this.props.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingridients={this.props.ingridients}
          price={this.props.totalPrice}
          cancelled={this.purchasingCancelHandler}
          continued={this.purchasingContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.ingridients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addedIngridientsHandler: (ingridient) =>
      dispatch({ type: actionTypes.ADD_INGRIDIENT, value: ingridient }),
    removedIngridientsHandler: (ingridient) =>
      dispatch({ type: actionTypes.REMOVE_INGRIDIENT, value: ingridient }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

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

// const INGREDIENTS_PRICE = {
//   salad: 0.5,
//   meat: 1.5,
//   bacon: 1.7,
//   cheese: 1,
// };

class BurgerBuilder extends Component {
  state = {
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get('/ingridients.json')
    //   .then((response) => this.setState({ ingridients: response.data }))
    //   .catch((err) => this.setState({ error: true }));
  }

  updatePurchasableState(ingridients) {
    const sum = Object.keys(ingridients)
      .map((igKey) => {
        return ingridients[igKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasingContinueHandler = () => {
    this.setState({ loading: true });
    const queryParams = [];
    for (let i in this.state.ingridients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingridients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
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
            purchasable={this.state.purchasable}
            ordered={this.purchasingHandler}
            totalPrice={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingridients={this.props.ingridients}
          price={this.state.totalPrice}
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

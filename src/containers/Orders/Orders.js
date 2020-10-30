import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-inctance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.css';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    axios
      .get('/orders.json')
      .then((response) => {
        const orders = [];
        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ orders: orders, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  onRemoveHandler = (orderId) => {
    axios
      .delete(`orders/${orderId}.json`)
      .then((response) => this.getOrders())
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    let orders = (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingridients={order.ingridients}
            price={+order.price}
            removed={() => this.onRemoveHandler(order.id)}
          />
        ))}
      </div>
    );
    if (this.state.loading) {
      orders = <Spinner />;
    }
    if (this.state.orders.length === 0 && !this.state.loading) {
        orders = <p className={classes.EmptyOrders}>Please select first order</p>
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);

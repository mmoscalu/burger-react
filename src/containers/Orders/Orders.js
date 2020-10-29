import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-inctance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
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

  render() {
    let orders = (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingridients={order.ingridients}
            price={+order.price}
          />
        ))}
      </div>
    );
    if (this.state.loading) {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);

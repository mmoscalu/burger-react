import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-inctance';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price,
      customer: {
        name: 'MonyaJR',
        address: {
          city: 'Chernivtsi',
          street: 'Main Street',
        },
        email: 'monyajr@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
          this.setState({ loading: false });
          this.props.history.push('/')
        })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder='Your Name' />
        <input type='email' name='email' placeholder='Your Email' />
        <input type='text' name='street' placeholder='Your Street' />
        <input type='text' name='postal' placeholder='Your Postal Code' />
        <Button btnType='Success' clicked={this.onSubmitHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
        form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please add your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-inctance';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: this.createFormControl('name', 'text', 'Name'),
      street: this.createFormControl('street', 'text', 'Street'),
      postalCode: this.createFormControl('postalCode', 'text', 'Postal Code'),
      country: this.createFormControl('country', 'text', 'Country'),
      email: this.createFormControl('email', 'email', 'Email'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'chipest', displayValue: 'Chipest' },
          ],
        },
      },
    },
    loading: false,
  };

  createFormControl(name, type, placeholder) {
    const formControl = {
      elementType: 'input',
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: '',
    };
    return formControl;
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price,
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const formArrayData = [];
    for (let key in this.state.orderForm) {
      formArrayData.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formArrayData.map((formControl) => (
          <Input key={formControl.id}
          elementType={formControl.config.elementType}
          elementConfig={formControl.config.elementConfig}
          value={formControl.config.value} />
        ))}
        <Button btnType='Success' clicked={this.onSubmitHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
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

import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-inctance';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

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
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  createFormControl(name, type, placeholder) {
    const formControl = {
      elementType: 'input',
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: '',
      validation: {
        required: true,
        minLength: name === 'postalCode' ? 5 : null,
        maxLength: name === 'postalCode' ? 5 : null,
      },
      valid: false,
      touched: false,
    };
    return formControl;
  }

  checkFormValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  onFormControlChangeHandler = (value, formContolId) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedForm[formContolId] };
    updatedFormElement.value = value;
    updatedFormElement.valid = this.checkFormValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[formContolId] = updatedFormElement;
    let formIsValid = true;
    for (let control in updatedForm) {
      formIsValid = updatedForm[control].valid && formIsValid;
    }
    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formControlName in this.state.orderForm) {
      formData[formControlName] = this.state.orderForm[formControlName].value;
    }
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price,
      orderData: formData,
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
      <form onSubmit={this.onSubmitHandler}>
        {formArrayData.map((formControl) => (
          <Input
            key={formControl.id}
            elementType={formControl.config.elementType}
            elementConfig={formControl.config.elementConfig}
            value={formControl.config.value}
            changed={(event) =>
              this.onFormControlChangeHandler(
                event.target.value,
                formControl.id
              )
            }
            touched={formControl.config.touched}
            shouldValidate={formControl.config.validation}
            invalid={!formControl.config.valid}
          />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
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

const mapStateToProps = (state) => {
  return {
    ingridients: state.ingridients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);

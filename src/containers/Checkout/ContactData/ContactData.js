import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: true,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: true,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                value: 'fastest',
                valid: true,
            },
        },
        loading: false,
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        // console.log(this.props.ingredients);
        // alert('You choose to continue!');
        const formData = {};
        for (let formElementID in this.state.orderForm) {
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }

        const order = {
            ingredients: this.props.ings,
            bread: this.props.bread,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
                console.log(response);
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    isValid(value, rules) {
        let isValid = true;
        
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' &&
                (rules.minLength ? value.length >= rules.minLength : true) &&
                (rules.maxLength ? value.length <= rules.maxLength : true)

            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }

            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
            return isValid;
        }
    }

    inputChangedHandler = (event, inputID) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { ...updatedOrderForm[inputID] };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.validation !== undefined) {
            updatedFormElement.valid = this.isValid(updatedFormElement.value, updatedFormElement.validation)
        }

        let formIsValid = true;
        for (let inputID in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputID].valid && formIsValid;
        }

        // console.log(updatedFormElement);
        updatedOrderForm[inputID] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        return (
            !this.state.loading ?
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementtype={formElement.config.elementType}
                                elementconfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                change={(event) => this.inputChangedHandler(event, formElement.id)}
                                invalid={!formElement.config.valid}
                            />
                        ))}
                        <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                    </form>
                </div> : <Spinner />

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        bread: state.bread,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);
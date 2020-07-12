import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true,
    }

    isValid(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = this.state.isSignup ? value.trim() !== '' &&
            (rules.minLength ? value.length >= rules.minLength : true) &&
            (rules.maxLength ? value.length <= rules.maxLength : true) : true

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
        const updatedControls = {
            ...this.state.controls,
            [inputID]: {
                ...this.state.controls[inputID],
                value: event.target.value,
                valid: this.isValid(event.target.value, this.state.controls[inputID].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map((formElement, index) => (
            <Input
                focus={index === 0 ? true : false}
                key={formElement.id}
                elementtype={formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                value={formElement.config.value}
                change={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={formElement.config.touched ? !formElement.config.valid : false}
            />
        ));

        let error = this.props.error ?
            <p style={{ color: 'red', font: 'bold' }}>{this.props.error.message}</p> : null;

        return (
            !this.props.loading ?
                !this.props.isAuth ?
                    <div className={classes.Auth}>
                        {error}
                        <form onSubmit={this.submitHandler}>
                            {form}
                            <Button btnType='Success'>SUBMIT</Button>
                        </form>
                        <Button
                            btnType='Danger'
                            clicked={this.switchAuthModeHandler}>
                            SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                        </Button>

                    </div> : <Redirect to='/' /> : <Spinner />
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
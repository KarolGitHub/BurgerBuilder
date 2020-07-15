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
import { updateObject , isValid} from '../../shared/utility';
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

    inputChangedHandler = (event, inputID) => {
        const updatedControls = updateObject(this.state.controls,
            {
                [inputID]: updateObject(this.state.controls[inputID],
                    {
                        value: event.target.value,
                        valid: isValid(event.target.value, this.state.controls[inputID].validation, this.state.isSignup),
                        touched: true
                    })
            }
        );
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
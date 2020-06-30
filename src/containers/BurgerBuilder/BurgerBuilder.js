import React, { Component } from 'react';
import Aux from '../../Hoc/hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

const INGEDIENTS_PRICES = {
    salad: 0.4,
    cheese: 0.3,
    meat: 1,
    bacon: 0.6,
    bread: 0.5,
}

class BurgerBuilder extends Component {

    state = {
        /*  ingredients: {
             salad: 0,
             cheese: 0,
             meat: 0,
             bacon: 0,
         }, */
        ingredients: null,
        bread: 0,
        totalPrice: 4,
        purchaseable: false,
        isModal: false,
        loading: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json', )
            .then(response => {
                console.log(response);
                this.setState({
                    ingredients: response.data,
                });
                this.updatePurchaseState(this.state.ingredients);
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchaseable: sum > 0,
        });
    }

    addIngredientHandler = (type) => {
        if (type === 'bread') {
            const updatedCount = this.state.bread + 1;
            const updatedPrice = INGEDIENTS_PRICES[type] + this.state.totalPrice;
            this.setState({
                bread: updatedCount,
                totalPrice: updatedPrice,
            });
        }
        else {
            const updatedCount = this.state.ingredients[type] + 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const updatedPrice = INGEDIENTS_PRICES[type] + this.state.totalPrice;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice,
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    removeIngredientHandler = (type) => {
        if (type === 'bread' && this.state.bread > 0) {
            const updatedCount = this.state.bread - 1;
            const updatedPrice = this.state.totalPrice - INGEDIENTS_PRICES[type];
            this.setState({
                bread: updatedCount,
                totalPrice: updatedPrice,
            });
        }
        else if (this.state.ingredients[type] > 0) {
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const updatedPrice = this.state.totalPrice - INGEDIENTS_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice,
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    modalHandler = (prevState) => {
        this.setState({ isModal: !prevState });
    }

    purchaseContinueHandler = () => {
        // alert('You choose to continue!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Mr Majster',
                address: {
                    street: 'Spacestreet 1',
                    zipCode: '12345',
                    country: 'MCR'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, isModal: false });
                console.log(response);
            })
            .catch(error => {
                this.setState({ loading: false, isModal: false });
                console.log(error);
            });
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients,
            bread: this.state.bread
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            this.state.ingredients ?
                <Aux>
                    <Modal isOpen={this.state.isModal} isClosed={() => this.modalHandler(this.state.isModal)}>
                        {!this.state.loading ?
                            <OrderSummary
                                ingredients={this.state.ingredients}
                                cancel={() => this.modalHandler(this.state.isModal)}
                                continue={this.purchaseContinueHandler}
                                price={this.state.totalPrice}
                            /> : <Spinner />}
                    </Modal>

                    <Burger ingredients={this.state.ingredients} bread={this.state.bread} />
                    <BurgerControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        purchased={() => this.modalHandler(this.state.isModal)}
                    />
                </Aux> : <Spinner />
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
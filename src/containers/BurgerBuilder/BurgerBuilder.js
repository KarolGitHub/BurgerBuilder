import React, { Component } from 'react';
import Aux from '../../Hoc/hoc/Auxiliary';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

// import { Link } from 'react-router-dom';
class BurgerBuilder extends Component {

    state = {
        isModal: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get( 'https://react-my-burger.firebaseio.com/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    modalHandler = (prevState) => {
        this.setState({ isModal: !prevState });
    }

    purchaseContinueHandler = () => {   
        this.props.history.push('/checkout');
        
    }

    render() {
        let disabledInfo = {
            ...this.props.ings,
            bread: this.props.bread
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            this.state.error ?
                <p>Ingredients can't be loaded!</p> :
                this.props.ings ?
                    <Aux>
                        <Modal isOpen={this.state.isModal} isClosed={() => this.modalHandler(this.state.isModal)}>
                            {!this.state.loading ?
                                <OrderSummary
                                    ingredients={this.props.ings}
                                    cancel={() => this.modalHandler(this.state.isModal)}
                                    continue={this.purchaseContinueHandler}
                                    price={this.props.price}
                                /> : <Spinner />}
                        </Modal>

                        <Burger ingredients={this.props.ings} bread={this.props.bread} />
                        <BurgerControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchaseable={this.updatePurchaseState(this.props.ings)}
                            purchased={() => this.modalHandler(this.state.isModal)}
                        />
                    </Aux> : <Spinner />
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        bread: state.bread,
        price: state.totalPrice
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ing) => dispatch({ type: actionTypes.ADD_ING, ingName: ing }),
        onIngredientRemoved: (ing) => dispatch({ type: actionTypes.REM_ING, ingName: ing })
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
import React, { Component } from 'react';
import Aux from '../../Hoc/hoc/Auxiliary';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
export class BurgerBuilder extends Component {

    state = {
        isModal: false,
        loading: false,
    }

    componentDidMount() {
        // console.log(this.props);
        this.props.onIngredientSet(this.props.building);
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
        if (this.props.isAuth) {
            this.setState({ isModal: !prevState });
        }
        else {
            this.props.history.push('/login');
        }
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
        this.props.onInitPurchase();
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
            this.props.error ?
                null :
                this.props.ings ?
                    <Aux>
                        <Modal
                            isOpen={this.state.isModal}
                            isClosed={() => this.modalHandler(this.state.isModal)}>
                            {!this.state.loading ?
                                <OrderSummary
                                    ingredients={this.props.ings}
                                    cancel={() => this.modalHandler(this.state.isModal)}
                                    continue={this.purchaseContinueHandler}
                                    price={this.props.price} /> : <Spinner />}
                        </Modal>

                        <Burger ingredients={this.props.ings} bread={this.props.bread} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchaseable={this.updatePurchaseState(this.props.ings)}
                            purchased={() => this.modalHandler(this.state.isModal)}
                            isAuth={this.props.isAuth} />
                    </Aux> : <Spinner />
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        bread: state.burgerBuilder.bread,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        building: state.burgerBuilder.building,
        isAuth: state.auth.token !== null,
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ing) => dispatch(actions.addIng(ing)),
        onIngredientRemoved: (ing) => dispatch(actions.remIng(ing)),
        onIngredientSet: (building) => dispatch(actions.setIng(building)),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 2,
            cheese: 3,
            bread: 3,
            meat: 3,
            bacon: 2,   
        },
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>
                    Burger Ingredients
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
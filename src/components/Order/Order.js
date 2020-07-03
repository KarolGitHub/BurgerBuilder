import React from 'react';

import classes from './Order.module.css';
const order = (props) => {
    const ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push(
            {
                name: ingName,
                amount: props.ingredients[ingName]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={classes.Span}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <h4>{props.id}</h4>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: {props.price.toFixed(2)}<strong>5 PLN</strong></p>
        </div>
    );
};

export default order;
import React from 'react';

import classes from './Burger.module.css';
import BurgerIngedient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let keyArray = [];
    let transformedIngedients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                    keyArray.push(igKey);
                    return <BurgerIngedient key={igKey + i} type={igKey} />
                });
        }).reduce((arr, el) => arr.concat(el), []);
    console.log(transformedIngedients);
    if (transformedIngedients.length === 0) {
        transformedIngedients = <p>Please start adding ingredients!</p>
    }
    else {
        switch (Array(props.ingredients['bread']).length) {
            case 1: {
                break;
            }
            case 2: {
                let bread = transformedIngedients.slice(keyArray.indexOf('bread'), keyArray.lastIndexOf('bread') + 1);
                transformedIngedients.splice(keyArray.indexOf('bread'), 2);
                transformedIngedients.splice(keyArray.lastIndexOf('cheese') + 1,0, bread[0]);
                transformedIngedients.splice(keyArray.lastIndexOf('meat'),0, bread[1]);
                console.log(bread);
                console.log(keyArray.indexOf('bread'));
                break;
            }
            case 3: {
                let bread = transformedIngedients.slice(keyArray.indexOf('bread'), keyArray.lastIndexOf('bread') + 1);
                transformedIngedients.splice(keyArray.indexOf('bread'), 3);
                transformedIngedients.splice(keyArray.lastIndexOf('salad') + 1,0, bread[0]);
                transformedIngedients.splice(keyArray.lastIndexOf('cheese') + 2,0, bread[1]);
                transformedIngedients.splice(keyArray.lastIndexOf('meat'),0, bread[2]);
                console.log(bread);
                break;
            }
            default:
                console.log(Object.keys(props.ingredients));
        }
    }
    console.log(keyArray);
    return (
        <div className={classes.Burger}>
            <BurgerIngedient type='bread-top' />
            {transformedIngedients}
            <BurgerIngedient type='bread-bottom' />
        </div>
    );
};

export default burger;
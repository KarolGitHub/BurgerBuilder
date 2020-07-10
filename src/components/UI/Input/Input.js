import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementtype) {
        case ('input'):
            inputElement = <input
                autoFocus={props.focus}
                onChange={props.change}
                onBlur={() => props.invalid}
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementconfig} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                autoFocus={props.focus}
                onChange={props.change}
                onBlur={() => props.invalid}
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value} />;
            break
        case ('select'):
            inputElement =
                <select
                    autoFocus={props.focus}
                    onChange={props.change}
                    onBlur={() => props.invalid}
                    className={inputClasses.join(' ')}
                    value={props.value}>
                    {props.elementconfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>;
            break;
        default:
            inputElement = <input
                autoFocus={props.focus}
                onChange={props.change}
                onBlur={() => props.invalid}
                className={inputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value} />;
    }
    
    let validationError = null;

    if (props.invalid) {
        validationError = <p className={classes.ValidationError}>Please enter a valid value</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;
import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {
    const ingrediantSummary = Object.keys(props.ingrediants).map(igKey => {
        return (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingrediants[igKey]}</li>);
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <ul>
                {ingrediantSummary}
            </ul>
            <p><strong>Total Price: </strong>{props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.canceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.continued}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary;

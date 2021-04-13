import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../Burger/UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <Aux>
            <div className={classes.CheckoutSummary}>
                <h2>We hope it tastes well!</h2>
                <div>
                    <Burger ingrediants={props.ingrediants}/>
                </div>
                <Button btnType='Danger' clicked={props.onCheckoutCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={props.onCheckoutContinued}>Continue</Button>
            </div>
        </Aux>
    )
}

export default CheckoutSummary

import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

export class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <Burger></Burger>
            </Aux>
        )
    }
}

export default BurgerBuilder;
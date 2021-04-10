import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Burger/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIANT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
export class BurgerBuilder extends Component {
    state = {
        ingrediants:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }
    purchasableHandler = (ingrediants) =>{

        const sum = Object.keys(ingrediants).map(igkey => {
            return ingrediants[igkey];
        }).reduce((sum,el) => {
            return sum + el;
        },0)
        this.setState({purchasable:sum > 0})
    }

    purchasingHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinued = () => {
        alert('purchase completed!')
    }

    addIngrediantHandler = (type)=>{
        const oldCount = this.state.ingrediants[type];
        const updatedCount = oldCount + 1;
        const updatedIngrediants = {...this.state.ingrediants};
        updatedIngrediants[type] = updatedCount;

        const priceAddition = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice, ingrediants:updatedIngrediants});

        this.purchasableHandler(updatedIngrediants);
    }

    removeIngrediantHandler = (type)=>{
        const oldCount = this.state.ingrediants[type];
        if(oldCount < 1){return;}
        const updatedCount = oldCount - 1;
        const updatedIngrediants = {...this.state.ingrediants};
        updatedIngrediants[type] = updatedCount;

        const priceDeduction = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice:newPrice, ingrediants:updatedIngrediants});
        this.purchasableHandler(updatedIngrediants);
    }

    render() {
        const ingInfo = {...this.state.ingrediants};
        for(let key in ingInfo){
            ingInfo[key] = ingInfo[key] <= 0;
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingrediants={this.state.ingrediants} 
                                  canceled={this.purchaseCancelHandler}
                                  continued={this.purchaseContinued}
                                  price={this.state.totalPrice}/>
                </Modal>
                <Burger ingrediants={this.state.ingrediants}></Burger>
                <BuildControls 
                added={this.addIngrediantHandler} 
                removed={this.removeIngrediantHandler} 
                disabled={ingInfo}
                total={this.state.totalPrice.toFixed(2)}
                purchasable={this.state.purchasable}
                ordered={this.purchasingHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;

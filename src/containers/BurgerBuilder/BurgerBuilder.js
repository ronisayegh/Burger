import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Burger/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Burger/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIANT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
export class BurgerBuilder extends Component {
    state = {
        ingrediants:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('/ingrediants.json').then(response => {
            this.setState({ingrediants: response.data});
        }).catch(error => {this.setState({error:true})});
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
        
        const queryParams = [];
        for(let i in this.state.ingrediants){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingrediants[i]));
        }
        queryParams.push("totalPrice=" + encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        let orderState = null;

        let burger = this.state.error ? <p style={{textAlign:'center'}}>Ingrediants cant be loaded!</p> :<Spinner/>   
        
        if(this.state.ingrediants){
        burger =   ( <Aux>
                            <Burger ingrediants={this.state.ingrediants}></Burger>
                                <BuildControls 
                                added={this.addIngrediantHandler} 
                                removed={this.removeIngrediantHandler} 
                                disabled={ingInfo}
                                total={this.state.totalPrice.toFixed(2)}
                                purchasable={this.state.purchasable}
                                ordered={this.purchasingHandler}/>
                        </Aux>
                    );
        orderState= (<OrderSummary ingrediants={this.state.ingrediants} 
        canceled={this.purchaseCancelHandler}
        continued={this.purchaseContinued}
        price={this.state.totalPrice}/>);

        }
        if(this.state.loading){
            orderState=<Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderState}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);

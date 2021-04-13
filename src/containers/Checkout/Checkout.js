import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import {Route} from 'react-router-dom';
export class Checkout extends Component {
    state={
        ingrediants:null,
        totalPrice:0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingrediants = {};
        let price=0;
        for(let param of query.entries()){
            if(param[0] === 'totalPrice'){
                price = +param[1];
            }
            else{
                ingrediants[param[0]] = +param[1];
            }
        }
        this.setState({ingrediants:ingrediants, totalPrice:price});
    }
    checkoutCancelled = () =>{
        this.props.history.goBack();
    }
    checkoutContinued = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                onCheckoutCancelled={this.checkoutCancelled}
                onCheckoutContinued={this.checkoutContinued}
                ingrediants={this.state.ingrediants}/>
                <Route path={this.props.match.url + '/contact-data'} 
                render={(props) => (<ContactData ingrediants={this.state.ingrediants} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout

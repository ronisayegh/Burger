import React, { Component } from 'react';
import Button from '../../../components/Burger/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Burger/UI/Spinner/Spinner';

export class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingrediants : this.props.ingrediants,
            price : this.props.price,
            customer : {
                name:'roni'
            }
        }
        axios.post('/orders.json',order)
        .then(response =>{
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error=>{this.setState({loading:false});});
    }
    render() {
        let body= <Spinner/>;

        if(!this.state.loading){
            body=(<div><h2>Enter your contact data below</h2>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="your name here"></input>
                    <input className={classes.Input} type="email" name="email" placeholder="your email here"></input>
                    <input className={classes.Input} type="text" name="street" placeholder="your street here"></input>
                    <input className={classes.Input} type="text" name="postal" placeholder="your postal here"></input>
                    <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
                </form></div>);
        }

        return (
            <div className={classes.ContactData}>
                {body}
            </div>
        )
    }
}

export default ContactData;

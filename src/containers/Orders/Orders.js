import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/Burger/UI/Spinner/Spinner'

export class Orders extends Component {
    state={
        orders:null,
        loading:true
    }
    componentDidMount(){
        
        axios.get('https://react-burger-83c3a-default-rtdb.firebaseio.com/orders.json')
        .then(res => {
            let fetchdOrders=[];
            for(let el in res.data){
                fetchdOrders.push({...res.data[el],id:el})
            }
            this.setState({loading:false, orders:fetchdOrders});
        }).catch(err => {
            this.setState({loading:false});
        });
    }
    render() {
        let loader = <Spinner/>
        if(!this.state.loading){
            loader= this.state.orders.map(order =>{
                        return <Order key={order.id} price={order.price} ings={order.ingrediants}/>
                    } ) 
        }
        return (
            <div>
                {loader}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);

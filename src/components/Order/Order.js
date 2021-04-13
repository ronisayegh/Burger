import React from 'react';
import classes from './Order.module.css';


const Order = (props) => {
    let ingrediants=[];
    for(let el in props.ings){
        ingrediants.push(
            {name:el,
            amount:props.ings[el]
        }); 
    }
    const ingrediantsOutput = ingrediants.map(i =>
        {
            return <span style={{border:'1px solid #ccc',margin:'0 8px',display:'inline-block',padding:'5px'}} 
            key={i.name}>{i.name} ({i.amount})</span>;
        })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingrediantsOutput}</p>
            <p>Price : <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default Order

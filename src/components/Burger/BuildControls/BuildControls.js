import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'salad',type:'salad'},
    {label:'meat',type:'meat'},
    {label:'cheese',type:'cheese'},
    {label:'bacon',type:'bacon'},
];
const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(el => (
                <BuildControl decrease={()=>props.removed(el.type)} increase={()=>props.added(el.type)} key={el.label} label={el.label}></BuildControl>))}
        </div>
    )
}

export default BuildControls

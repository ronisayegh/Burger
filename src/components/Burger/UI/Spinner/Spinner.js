import React from 'react';
import classes from './Spinner.module.css'

const Spinner = () => {
    return (
        <div style={{width:'100%',textAlign:'center'}}>
            <div className={classes.ldsripple}><div></div><div></div></div>
        </div>
    )
}

export default Spinner

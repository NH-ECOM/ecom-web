import React from 'react';
import { Icon } from '@material-ui/core';
import '../styles/OrderPlaced.scss';
import CheckIcon from '@material-ui/icons/Check';
const OrderPlaced=()=>{
    return(
    
        <div className="order">
            <Icon>
                <CheckIcon/>
            </Icon>
            <h3>your order is successfully placed</h3>
            <h4>your order id ------</h4>
        </div>
    )}
export default OrderPlaced;
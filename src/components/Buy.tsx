import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import '../styles/cart.scss';

const Buy = () => {
    return (
        <div className='cartWrapper'>
            <button className='cartButton'>
                <FontAwesomeIcon icon={faCartShopping}/>
                <p className='itemQty'>0</p>
            </button>
            
        </div>
    );
};

export default Buy;
import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import * as mock from './mock';
import coke from '../images/CokeCan.jpg';
import '../styles/Homepage.scss';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        const {products} = this.props;
        return (
            <div className='main-product-container' >
                {products.map((product) => (
                    <div className='main-product-sub-container'>
                        <div className='product-image'>
                            <img src={coke} />
                        </div>
                        <div className='product-name'>
                            Product Name <Typography key={product.id}>{product.name}</Typography>
                        </div>
                        <div className='product-price'>
                            Product Price <Typography key={product.id}>{product.price}</Typography>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}


HomePage.defaultProps = {
    products: mock.products,
};

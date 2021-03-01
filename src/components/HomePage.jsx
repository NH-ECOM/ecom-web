import React, { Component } from 'react';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import SearchSharp from '@material-ui/icons/SearchSharp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as mock from './mock';
import '../styles/Homepage.scss';
import { InfoOutlined } from '@material-ui/icons';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      product: {},
      navigate: false,
      categories: {}
    };
  }
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  componentDidMount() { 
    const { products } = this.props;
    // console.log("Products : "+products);
    // let categories = {}
    // products.forEach (product => categories.push(product.category))

    // console.log("All Categories : "+categories)
  }

  addToCart = (product) => {
    this.setState({ product: product });
    // this.props.history.push({
    //   pathname: '/details',
    //   productDetails: product,
    // });

    product.orderedQty = product.orderedQty + 1;
    product.addButtonDisplay = 'none';
    product.qtyDisplay= 'inline-flex'
  };

  addItemToCart = (product) => {
    console.log("product.orderedQty : "+product.orderedQty);

    product.orderedQty = product.orderedQty + 1;
  }

  removeItemFromCart = (product) => {
    console.log("removeItemFromCart called");
    product.orderedQty = product.orderedQty - 1;
    if(product.orderedQty < 1) {
      product.addButtonDisplay = 'inline-flex';
      product.qtyDisplay = 'none'
    }
  }

  render() {
    const { products } = this.props;
    return (
      <div className='main-container'>
        <div className='search-container'>
          <TextField
            id="quickFilter"
            placeholder='Search Item'
            variant="outlined"
            color="primary"
            className="search-item"
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchSharp />
                </InputAdornment>
              ),
            }}
            onChange={(e) => this.searchSpace(e)}
          />
        </div>
        <div className='body-container'>
          <div className="filter-container">
            <span>Left side menus</span>
          </div>
          <div className="items-main-container">
            <div className='items-container'>
              {products
                .filter((product) => {
                  if (this.state.search == null) return product;
                  else if (
                    product.name
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase()) ||
                    product.price
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product) => (
                  <ul className="non-bullet-list">
                    <li key={product.id} className='main-product-sub-container'>
                      <span className="product-image">
                        <img src={product.src} alt='' />
                      </span>
                      <div className="product-details">
                        <h2 className="product-name-text">
                          <Typography key={product.id} variant='subtitle1'>
                            {product.name}
                          </Typography>
                        </h2>
                        <p className="product-unit-text">
                            {product.unit}
                        </p>
                        <div className="product-cost-container">
                          <div className="product-cost">
                            <Typography key={product.id} variant='subtitle1'>
                              {product.price}
                            </Typography>
                          </div>
                          <span>
                            <div className="add-to-cart">
                              <div className="add-button"
                                style={{ display: product.addButtonDisplay }}
                                onClick={() => this.addToCart(product)}>
                                <span>ADD</span>
                                <AddIcon />
                              </div>
                              <div className="qty-button"
                                id={ product.id }
                                style={{ display: product.qtyDisplay }}>
                                <div className="remove-button"
                                  onClick={() => this.removeItemFromCart(product)}>
                                  <RemoveIcon />
                                </div>
                                <div className="qty">{product.orderedQty}</div>
                                <div className="remove-button" 
                                  onClick={() => this.addItemToCart(product)}>
                                  <AddIcon />
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
          <div className="cart-container">
            <span>Checkout cart</span>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  products: mock.products,
};

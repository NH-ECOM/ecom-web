import React, { Component } from 'react';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import SearchSharp from '@material-ui/icons/SearchSharp';
import * as mock from './mock';
import '../styles/Homepage.scss';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      product: {},
      navigate: false,
    };
  }
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  componentDidMount() {}

  showDetails = (product) => {
    this.setState({ product: product });
    this.props.history.push({
      pathname: '/details',
      productDetails: product,
    });
  };

  render() {
    const { products } = this.props;
    return (
      <div className='mainContainer'>
        <div className='searchContainer'>
          <TextField
            id='quickFilter'
            placeholder='Search Item'
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
        <div className='itemsContainer'>
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
              <div
                key={product.id}
                className='main-product-sub-container'
                onClick={() => this.showDetails(product)}
              >
                <div className='product-image'>
                  <img src={product.src} alt='' />
                </div>
                <div className='product-name'>
                  Product Name{' '}
                  <Typography key={product.id} variant='subtitle1'>
                    {product.name}
                  </Typography>
                </div>
                <div className='product-price'>
                  Product Price{' '}
                  <Typography key={product.id} variant='subtitle1'>
                    {product.price}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  products: mock.products,
};

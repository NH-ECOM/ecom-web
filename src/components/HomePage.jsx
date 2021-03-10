import React, { Component } from 'react';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import SearchSharp from '@material-ui/icons/SearchSharp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as mock from './mock';
import { Link } from 'react-router-dom';
import Auth from '../Auth';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    AppBar,
    IconButton,
    Toolbar,
    Grid,
    Badge
} from '@material-ui/core';
import {
    ExitToApp
} from '@material-ui/icons';

import '../styles/Header.scss';
import '../styles/Homepage.scss';
// import { InfoOutlined } from '@material-ui/icons';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      search: null,
      product: {},
      navigate: false,
      categoryNames: [],
      categories: [],
      itemSearch: '',
      active: false,
      noOfItemsInCart: 0
    };
  }

  searchItem = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword, itemSearch: keyword });
  };

  componentWillMount() { 
    const { products } = this.props;
    this.setState({products: products});

    this.state.categories.push({categoryName: 'All Categories', isActive: true});
    products.forEach (product => {
      if(this.state.categoryNames.indexOf(product.category) === -1) {
        this.state.categories.push({categoryName: product.category, isActive: false});
        this.state.categoryNames.push(product.category);
      }
    });
    console.log("this.state.categories : "+this.state.categories)
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

  filterItemsOnCategory = (category) => {
    const { products } = this.props;

    this.setState({ 
      products: products, 
      search: null, 
      itemSearch: ''
    });

    if(category.categoryName !== 'All Categories') {
      const selectedProducts = products.filter((product) => product.category===category.categoryName);
      this.setState({products: selectedProducts});
    }

    this.state.categories.forEach( categoryItem => 
      {
        if(categoryItem.categoryName !== category.categoryName) {
          categoryItem.isActive = false;
        } else {
          category.isActive = true;
        }
      }
    );
  }

  render() {
    const products = this.state.products;
    return (
      <div>
        <div className='site-header-container'>
          <AppBar position='fixed'>
            <Toolbar className='toolbar' variant='dense'>
              <Grid
                  container
                  direction='row'
                  justify='space-around'
                  alignItems='center'
              >

              <div className="logo-container">
                  <Typography className='title' variant='h5'>
                      <Link to='/'>eCom</Link>
                  </Typography>
                  <Typography className='titleSmall' variant='h5'>
                      <Link to='/'>eCom</Link>
                  </Typography>
              </div>
              <div className='search-container'>
                <TextField
                  id="quickFilter"
                  placeholder='Search Item'
                  variant="outlined"
                  color="primary"
                  className="search-item"
                  value={this.state.itemSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>
                        <SearchSharp />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => this.searchItem(e)}
                />
              </div>
              <div className='account-notification-container'>
                  <Grid container direction='row' justify='space-evenly' alignItems='center'>
                      <Grid item>
                          <IconButton
                              aria-label='cart'
                              tooltip={'Cart'}
                              onClick={() => {
                                  this.props.history.push('/cart');
                              }
                              }>
                              <Badge badgeContent={this.state.count} color="secondary" showZero>
                                  <ShoppingCartIcon />
                              </Badge>
                          </IconButton>
                      </Grid>
                      <Grid item>
                          <IconButton
                              aria-label='Sign Out'
                              onClick={() => {
                                  Auth.logout(() => {
                                      this.props.history.push('/');
                                  });
                              }}
                              tooltip={'Sign Out'}
                          >
                              <ExitToApp />
                          </IconButton>
                      </Grid>
                  </Grid>
              </div>
            </Grid>
            </Toolbar>
          </AppBar>
        </div>
        <div className='main-container'>
          <div className='body-container'>
            <div className="filter-container">
              <ul className="filter-categories">
                {this.state.categories.map((category) => (
                  <li key={category.categoryName} className="non-bullet-list">
                    <a className={category.isActive ? 'item-category-link active': 'item-category-link'} onClick={()=>this.filterItemsOnCategory(category)}>{category.categoryName}</a>
                  </li>
                ))}
              </ul>
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
                      <li key={product.id.toString()} className='main-product-sub-container'>
                        <span className="product-image">
                          <img src={product.src} alt='' />
                        </span>
                        <div className="product-details">
                          <Typography variant='subtitle1'>
                            {product.name}
                          </Typography>
                          <p className="product-unit-text">
                              {product.unit}
                          </p>
                          <div className="product-cost-container">
                            <div className="product-cost">
                              <Typography variant='subtitle1'>
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
              <div className="cart-items-header">
                <div className="cart-header-text">
                  <h3>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cart &nbsp;
                    <span className="cart-items-count">{this.state.noOfItemsInCart}</span>
                  </h3>
                </div>
                <div className="clear-cart">
                <span>Clear Cart</span>
              </div>
              </div>
              <div className="empty-cart">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  products: mock.products,
};

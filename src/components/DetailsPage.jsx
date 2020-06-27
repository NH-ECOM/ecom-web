import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import '../styles/DetailsPage.scss';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Icon from '@material-ui/core/Icon';

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      product: {},
    };
  }

  async componentDidMount() {
    await this.setProductDetails();
    console.log('state : ' + JSON.stringify(this.state));
  }

  async setProductDetails() {
    if (this.props.location.productDetails) {
      const product = this.props.location.productDetails;
      this.setState({ product: product });
      localStorage.setItem('product', JSON.stringify(product));
    } else if (localStorage.getItem('product')) {
      this.setState({ product: JSON.parse(localStorage.getItem('product')) });
    }
  }

  goCheckout = () => {
    this.props.history.push('/checkout');
  };
  render() {
    return (
      <div className='maindiv'>
        <div className='image'>
          <img src={this.state.product.src} alt='' />
          <Typography variant='h6'>{this.state.product.name}</Typography>
          <Typography variant='h6'>{this.state.product.description}</Typography>
          <Typography className='rs' variant='h5'>
            <strong>{this.state.product.price}</strong>
          </Typography>
          <br />
          <Typography>Available offers</Typography>
          <Typography>
            <Icon className='localicon' color='secondary'>
              {<LocalOfferIcon className='iconsize' />}
              <span className='span'>
                Bank Offer10% Instant Discount* with Axis Bank Credit and Debit
                Cards
              </span>
            </Icon>
            <br />
            <Icon className='localicon' color='secondary'>
              {<LocalOfferIcon className='iconsize' />}
              <span className='span'>
                Bank Offer5% Unlimited Cashback on Axis Bank Credit Card
              </span>
            </Icon>
            <br />
            <Icon className='localicon' color='secondary'>
              {<LocalOfferIcon className='iconsize' />}
              <span className='span'>
                Bank OfferExtra 5% off* with Axis Bank Buzz Credit Card
              </span>
            </Icon>
            <br />
            <Icon className='localicon' color='secondary'>
              {<CreditCardIcon className='iconsize' />}
              <span className='span'>No Cost EMI on Axis Bank Credit Card</span>
            </Icon>
            <br />
            <br />
            <Icon className='localicon' color='secondary'>
              {<AccessTimeIcon className='iconsize' />}
              <span className='span'>
                Best before 19 Aug 2020
                <br />
                Manufactured date 22 May 2020
              </span>
            </Icon>
            <br />
          </Typography>
          <br />
          <div className='form-group'>
            <label htmlFor='deliveryPin'>Delivery</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='pincode'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='buttondiv'>
          <Button
            className='addcart'
            variant='contained'
            startIcon={<ShoppingCartIcon />}
          >
            ADD TO CART
          </Button>
          <Button
            className='buynow'
            variant='contained'
            startIcon={<FlashOnIcon />}
            onClick={this.goCheckout}
          >
            BUY NOW
          </Button>
        </div>
      </div>
    );
  }
}

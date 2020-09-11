import React, { Component } from 'react';
import "../styles/Cart.scss";
import {
  Fab,
  Button,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //product: {},
      cartproduct:{},
      quantity: 1,
      allCartProducts:[],
    };
  }

  async componentDidMount() {
    await this.newsetcartProductDetails();
  }
  
  async newsetcartProductDetails() {
    let newCartProducts = [];
    if (this.props.location.cartproductDetails) {
      newCartProducts = this.props.location.cartproductDetails;
    }

    let cartProductStore = [];

    if(localStorage.getItem("cartProductStore")) {
      cartProductStore = JSON.parse(localStorage.getItem("cartProductStore"));
    }

    newCartProducts.forEach(newProduct => {
      cartProductStore.push(newProduct);
    })
    
    localStorage.setItem('cartProductStore', JSON.stringify(cartProductStore));
    console.log("cartProductStore : "+JSON.stringify(cartProductStore));

    this.setState({ allCartProducts: cartProductStore});
  }

  IncrementItem = () => {
    if (this.state.quantity > 9) {
    } else {
      this.setState({
        quantity: this.state.quantity + 1,
      });
    }
  };
  DecreaseItem = () => {
    if (this.state.quantity <= 1) {
    } else {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };
  removeFromCart = (productId) => {
    const productsInStore = JSON.parse(localStorage.getItem("cartProductStore"));
    const remProductsInStore = [];
    productsInStore.forEach(product => {
      console.log("product.id="+product.id + " and productId="+productId);
      if(product.id !== productId){
        remProductsInStore.push(product);
      }
    });

    localStorage.setItem('cartProductStore', JSON.stringify(remProductsInStore));
    this.setState({ allCartProducts: remProductsInStore});

    // window.location.reload();
    console.log('removeFromCart done');
  }

  render() {
    // const {cartproduct} = JSON.parse(this.state.cartproduct);
    return(
        <div>
          <table>
            <tr>
              <td >Name</td>
              <td >Image</td>
              <td >Description</td>
              <td >Quantity</td>
              <td >Price</td>
              <td >Total Amount</td>
              <td>Remove from Cart</td>
            </tr>
            {this.state.allCartProducts.map((cartProduct)=>(
            
             <tr>  
              <td>{cartProduct.name}</td>
              <td><img src={cartProduct.src} alt='' /></td>
              <td>{cartProduct.description}</td>
              <td><Typography>
                  <Fab
                    color='primary'
                    aria-label='add'
                    className='incrDECR'
                    onClick={this.IncrementItem}
                  >
                    <AddIcon />
                  </Fab>
                  <input className='inputne' value={this.state.quantity} />
                  <Fab
                    color='primary'
                    aria-label='subtract'
                    className='incrDECR'
                    onClick={this.DecreaseItem}
                  >
                    <RemoveIcon />
                  </Fab>
                </Typography></td>
              <td>{cartProduct.price}</td>
              <td>
                <strong>
                  {this.state.quantity * parseInt(cartProduct.priceInt)}
                </strong>
                  &nbsp;
                <strong>Rs..</strong>
              </td>
              <td>
              <Button
            className='remcart'
            variant='contained'
            startIcon={<DeleteIcon />}
            onClick={() =>this.removeFromCart(cartProduct.id)}
          >
            Remove
          </Button>
              </td> 
            </tr>  
        
             ))}; 
          </table>
        </div>
    )
  }
}


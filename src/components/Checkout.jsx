import React, { Component } from 'react';
import '../styles/CheckOut.scss';
import {
  Radio,
  Fab,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  AppBar,
  TextField,
  Toolbar,
  Typography,
  Button,
  Paper
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import StarIcon from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

class Checkout extends Component {
  constructor(props){
    super(props);
  
  this.state = {
    expanded: 'panel0',
    indiaStates: [
      { value: '--Select State--' },
      { value: 'Delhi' },
      { value: 'Chandigarh' },
      { value: 'Haryana' },
      { value: 'Andhra Pardesh' },
      { value: 'Madhya Pardesh' },
    ],
    month: [
      { value: 'MM' },
      { value: '01' },
      { value: '02' },
      { value: '03' },
      { value: '04' },
      { value: '05' },
      { value: '06' },
      { value: '07' },
      { value: '08' },
      { value: '09' },
      { value: '10' },
      { value: '11' },
      { value: '12' },
    ],
    year: [
      { value: 'YY' },
      { value: '21' },
      { value: '22' },
      { value: '23' },
      { value: '24' },
      { value: '25' },
      { value: '26' },
      { value: '27' },
      { value: '28' },
      { value: '29' },
      { value: '30' },
    ],
    quantity: 1,
    show: true,
    max: 5,
    min: 0,
    showMe1: false,
    showMe2: false,
    showMe3: false,
    date: '',
    openDialog: false,
    email: '',
    name: '',
    number: '',
    address: '',
    pincode: '',
    cdt: '',
    cardname: '',
    cardnumber: '',
    cvv: '',
    product:{},
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
  paypal = (e) => {
    window.open('https://www.paypal.com/in/home', '_blank');
  };
  handleCardNameChange = (e) => {
    this.setState({ cardname: e.target.value });
  };
  handleCardNumberChange = (e) => {
    this.setState({ cardnumber: e.target.value });
  };
  handleCVVChange = (e) => {
    this.setState({ cvv: e.target.value });
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };
  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };
  handlePincodeChange = (e) => {
    this.setState({ pincode: e.target.value });
  };
  handleCDTChange = (e) => {
    this.setState({ cdt: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handleOrder=()=>{
    this.props.history.push('/orderplaced');
  }
  operation1 = () => {
    this.setState({
      showMe1: !this.state.showMe1,
      showMe2: false,
      showMe3: false,
    });
  };
  operation2 = () => {
    this.setState({
      showMe2: !this.state.showMe2,
      showMe1: false,
      showMe3: false,
    });
  };
  operation3 = () => {
    this.setState({
      showMe3: !this.state.showMe3,
      showMe1: false,
      showMe2: false,
    });
  };
  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  handleButtonClick = (nextPanelString) => (event, expanded) => {
    this.setState({
      expanded: nextPanelString,
    });
  };
  handleState = (event) => {
    this.setState({
      states: event.target.value,
    });
  };
  handleMonth = (event) => {
    this.setState({
      event: event.target.value,
    });
  };
  handleYear = (event) => {
    this.setState({
      event: event.target.value,
    });
  };
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
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <div>
          <AppBar position='fixed'>
            <Toolbar className='toolbar' variant='dense'>
              <Typography variant='h6' className='root_meg'>
                eCom
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <br />
        <br />
        <div className='Deliveryaddress'>
          <br />
          <ExpansionPanel square expanded={expanded === 'panel0'}>
            <ExpansionPanelSummary
              aria-controls='panel0d-content'
              id='panel-header'
            >
              <Typography>
                <span className='lognum'>1</span>
                LOGIN OR SIGNUP
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className='insidelogin'>
                <TextField
                  className='standard-secondary'
                  label='Enter Email/Mobile Number'
                  color='secondary'
                  required
                  name='email'
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <br />
                <br />
                <Typography className='policy'>
                  By continuing, you agree our megakart <br />
                  terms of use and Privacy policy.
                </Typography>
                <br />
                <Button
                  variant='contained'
                  className='btncon'
                  onClick={this.handleButtonClick('panel1')}
                  disabled={!this.state.email}
                >
                  CONTINUE
                </Button>
                <br />
                <br />
              </Typography>

              <Typography className='advlogin'>
                <Typography className='advcolor'>
                  Advantage of our secure login
                </Typography>

                <Typography>
                  <Icon color='secondary'>
                    {<LocalShippingIcon className='iconsize' />}
                    <span className='span'>
                      Easily track orders,free returns
                    </span>
                  </Icon>
                  <br />
                  <Icon color='secondary'>
                    {<NotificationsIcon className='iconsize' />}
                    <span className='span'>
                      Get relevant alerts and recommendations
                    </span>
                  </Icon>
                  <br />
                  <Icon color='secondary'>
                    {<StarIcon className='iconsize' />}
                    <span className='span'>
                      Wishlist,Reviews,Ratings and more.
                    </span>
                  </Icon>
                  <br />
                </Typography>
                <br />
                <br />
                <br />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <br />

          <ExpansionPanel square expanded={expanded === 'panel1'}>
            <ExpansionPanelSummary
              aria-controls='panel1d-content'
              id='panel-header'
            >
              <Typography>
                <span className='lognum'>2</span>
                DELIVERY ADDRESS
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form>
                <TextField
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  required
                  inputProps={{ maxLength: 15 }}
                  name='name'
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                  id='outlined-basic'
                  label='10-digit mobile number'
                  variant='outlined'
                  required
                  inputProps={{ maxLength: 10 }}
                  name='number'
                  value={this.state.number}
                  onChange={this.handleNumberChange}
                />
                <br />
                <br />
                <TextField
                  id='outlined-basic'
                  label='PinCode'
                  variant='outlined'
                  required
                  name='pincode'
                  inputProps={{ maxLength: 6 }}
                  value={this.state.pincode}
                  onChange={this.handlePincodeChange}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                  id='outlined-basic'
                  label='Locality'
                  variant='outlined'
                  inputProps={{ maxLength: 10 }}
                />
                <br />
                <br />
                <TextField
                  id='address'
                  label='Address( Area and Street)'
                  variant='outlined'
                  required
                  name='address'
                  inputProps={{ maxLength: 50 }}
                  value={this.state.address}
                  onChange={this.handleAddressChange}
                />
                <br />
                <br />
                <TextField
                  id='outlined-basic'
                  label='City/District/Town'
                  variant='outlined'
                  required
                  name='cdt'
                  inputProps={{ maxLength: 20 }}
                  value={this.state.cdt}
                  onChange={this.handleCDTChange}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                  id='standard-select'
                  select
                  label='select state'
                  onChange={this.handleState}
                  required
                  name='states'
                  value={this.state.states}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {this.state.indiaStates.map((option) => (
                    <option key={option.value}>{option.value}</option>
                  ))}
                </TextField>
                <br />
                <br />
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>address type</FormLabel>
                  <RadioGroup
                    row
                    aria-label='position'
                    name='position'
                    defaultValue='top'
                  >
                    <FormControlLabel
                      value='home'
                      control={<Radio color='primary' />}
                      label='Home(all type)'
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControlLabel
                      value='work'
                      control={<Radio color='primary' />}
                      label='Work(between 10 AM and 5 PM)'
                    />
                  </RadioGroup>
                </FormControl>{' '}
                <br />
                <br />
                <Button
                  variant='contained'
                  className='btncon'
                  onClick={this.handleButtonClick('panel2')}
                  disabled={
                    (!this.state.name,
                    !this.state.number,
                    !this.state.pincode,
                    !this.state.address,
                    !this.state.cdt,
                    !this.state.states)
                  }
                >
                  Save and Deliver Here
                </Button>
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br />
          <ExpansionPanel square expanded={expanded === 'panel2'}>
            <ExpansionPanelSummary
              aria-controls='panel2d-content'
              id='panel-header'
            >
              <Typography>
                <span className='lognum'>3</span>
                ORDER SUMMARY
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <Typography>
                  <h4 className='sucess'>
                    Successfully updated your item in number :{' '}
                    {this.state.quantity}
                  </h4>
                </Typography>
                <br />
                <br />

                <Typography>
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
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span id='amount'>Your Total Amount is </span>
                  &nbsp;
                  <strong>{this.state.quantity * parseInt(this.state.product.priceInt)}</strong>
                  &nbsp;
                  <strong>Rs..</strong>
                </Typography>
                <br />
                <br />
                <Typography>
                  <h5>Order Confirmation email will be sent to ------</h5>
                  <Button
                    variant='contained'
                    className='btncon'
                    onClick={this.handleButtonClick('panel3')}
                  >
                    CONTINUE
                  </Button>
                </Typography>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <br />
          <ExpansionPanel square expanded={expanded === 'panel3'}>
            <ExpansionPanelSummary
              aria-controls='panel1d-content'
              id='panel-header'
            >
              <Typography>
                <span className='lognum'>4</span>
                PAYMENT OPTION
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Payment type</FormLabel>
                  <br />
                  <RadioGroup
                    aria-label='position'
                    name='position'
                    defaultValue='top'
                  >
                    <FormControlLabel
                      value='PhonePay'
                      control={<Radio color='primary' />}
                      label='PhonePay'
                      onChange={this.operation1}
                    />
                    <div>
                      {this.state.showMe1 ? (
                        <div className='phonepaybody'>
                          <br />
                          <span id='phonepayText'>
                            From Here you will redirect to PhonePay Official
                            Page.
                          </span>
                          <br />
                          <br />
                          <span id='phonepayText'>Click on Continue..</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button
                            variant='contained'
                            className='btncon'
                            onClick={this.paypal}
                          >
                            CONTINUE
                          </Button>
                        </div>
                      ) : null}
                    </div>
                    <FormControlLabel
                      value='work'
                      control={<Radio color='primary' />}
                      label='Credit Card/Debit Card'
                      onChange={this.operation2}
                    />

                    {this.state.showMe2 ? (
                      <div>
                        <form>
                          <br />
                          <TextField
                            id='outlined-basic'
                            label='Name on Card'
                            variant='outlined'
                            required
                            name='cardname'
                            value={this.state.cardname}
                            onChange={this.handleCardNameChange}
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <TextField
                            id='outlined-basic'
                            label='Card Number'
                            variant='outlined'
                            required
                            name='cardnumber'
                            value={this.state.cardnumber}
                            onChange={this.handleCardNumberChange}
                          />
                          <br />
                          <br />
                          <span id='valid'>valid through</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <TextField
                            select
                            onChange={this.handleMonth}
                            SelectProps={{
                              native: true,
                            }}
                          >
                            {this.state.month.map((option) => (
                              <option key={option.value}>{option.value}</option>
                            ))}
                          </TextField>
                          <TextField
                            select
                            onChange={this.handleYear}
                            SelectProps={{
                              native: true,
                            }}
                          >
                            {this.state.year.map((option) => (
                              <option key={option.value}>{option.value}</option>
                            ))}
                          </TextField>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <TextField
                            id='cvv'
                            placeholder='CVV'
                            inputProps={{ maxLength: 3 }}
                            variant='outlined'
                            required
                            name='cvv'
                            value={this.state.cvv}
                            onChange={this.handleCVVChange}
                          />{' '}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button
                            variant='contained'
                            className='paybtn'
                            disabled={
                              (!this.state.cardname,
                              !this.state.cardnumber,
                              !this.state.cvv)
                            }
                          >
                            PAY Rs.
                          </Button>
                        </form>
                      </div>
                    ) : null}

                    <FormControlLabel
                      value='CashOnDelivery'
                      control={<Radio color='primary' />}
                      label='CashOnDelivery'
                      onChange={this.operation3}
                    />
                    <div>
                      {this.state.showMe3 ? (
                        <div className='phonepaybody'>
                          <br />
                          <span id='phonepayText'>
                            You want to Pay Money at Your home
                          </span>
                          <br />
                          <br />
                          <span id='phonepayText'>Click on Continue..</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button
                            variant='contained'
                            className='btncon'
                            onClick={this.handleOrder}
                          >
                            CONTINUE
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </RadioGroup>
                </FormControl>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className="Summary"> 
            <Paper >
              SUMMARY
              <br/><br/>
              <Typography variant='subheading1'>Product name:&nbsp;&nbsp;{this.state.product.name}</Typography>
              <br/>
              <Typography variant='subheadinh1'>Product Quantity:&nbsp;&nbsp;{this.state.quantity}
              </Typography><br/><br/>
              <span id='amount'>Your Total Amount is </span>
                  &nbsp;
                  <strong>{this.state.quantity * parseInt(this.state.product.priceInt)}</strong>
                  &nbsp;
                  <strong>Rs..</strong>

            </Paper>
          </div>
      </div>
    );
  }
}

export default Checkout;

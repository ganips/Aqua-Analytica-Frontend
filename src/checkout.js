import React from 'react';
import logo from './logo.png';
import { Modal, Button, Icon, Step, Segment, Checkbox, Header, TextArea, Dimmer, Loader, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

class Checkout extends React.Component{
    state={
        open: false,
        value : undefined,
        status : 'billing',
        loader : true,
        address : this.props.users.address
    }

    handleChange = (e, { value }) => this.setState({ value })

    componentDidMount(){
        const url = 'http://localhost:8080/api/customers.php'
        axios.get(url).then(response => response.data)
        .then((data) => { 
            data.map((row) => {
                if(row['name'] === localStorage.name){
                    this.setState({ data : row })
                }
            })
        })
        setTimeout(() => this.setState({ loader : false }), 1500);
    }

    openCheckout() {
        if(this.state.value === 'razorpay'){    
            let options = {
                "key": "rzp_test_YTji4Pa4Tvcpiu",
                "amount": this.props.amount *100,
                "name": "WMS",
                "description": "Wholsale Management System",
                "image": logo,
                "handler": function (response){
                    this.setState({ pay_id : response.razorpay_payment_id })
                }.bind(this),
                "prefill": {
                    "name": this.props.users.name,
                    "email": this.props.users.email,
                    "phone": this.props.users.phone
                },
                "notes": {
                    "address": this.props.users.address
                },
                "theme": {
                    "color": "teal"
                }
            };
            let rzp = new window.Razorpay(options);
            rzp.open();
        }
        if(this.state.value === 'cash'){
            this.setState({ pay_id : 'COD' })
        }
    }

    getAddress = (e) => {
        this.setState({ address : e.target.value })
    }

    confirmOrder = () => {
        axios.get('http://localhost:8080/api/cart.php').then(response => response.data)
        .then((data) => {
            data.forEach(element => {
                if(element['customers_id'] === this.props.customer_id){
                    axios.post('http://localhost:8080/api/sales.php', {customers_id : this.props.customer_id, products_id : element['products_id'], amount : element['amount'], quantity : element['quantity'], payment_id : this.state.pay_id, status : 0})
                }
            });
        })
        .then(() => {
            toast({
                type: 'success',
                description: 'Order Placed Successfully!!',
                animation: 'bounce',
                time: 5000,
            });
            this.setState({ open : false })
        })
    }

    render(){
        return(
            <>
            <Modal
            onClose={() => this.setState({ open : false })}
            onOpen={() => this.setState({ open : true })}
            open={this.state.open}
            trigger={<Button disabled={this.props.disabled} animated color='teal' size='big' style={{marginTop : '15px'}}>
                        <Button.Content hidden><Icon name='sign-out'/></Button.Content>
                        <Button.Content visible>Checkout</Button.Content>
                    </Button>}
            >
                <Modal.Header>
                    <Step.Group ordered size='tiny'>
                        <Step completed>
                            <Step.Content>
                                <Step.Title>Add to Cart</Step.Title>
                                <Step.Description>Choose the item and add to cart</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step active={this.state.status === 'billing' ? true : false} completed={this.state.status !== 'billing' ? true : false}>
                            <Step.Content>
                                <Step.Title>Billing</Step.Title>
                                <Step.Description>Choose the address and payment method</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step disabled={this.state.status === 'billing' ? true : false} active={this.state.status !== 'billing' ? true : false}>
                            <Step.Content>
                                <Step.Title>Confirm Order</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                    <Icon style={{float : 'right'}} onClick={() => this.setState({open : false})} name='close' />
                </Modal.Header>
                <Modal.Content>
                    <Segment basic style={{height : 'fit-content'}}>
                        {this.state.status === 'billing' ? 
                            <>
                            <Segment>
                                <Form size='small' style={{fontFamily : 'GE Inspira Sans'}}>
                                    <Form.Field required>
                                        <label>Phone Number</label>
                                        <Input placeholder='Number' onChange={(event) => this.handleChange(event, 'phone')} defaultValue={this.state.data ? this.state.data['phone'] : null}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Address</label>
                                        <TextArea placeholder='Address' type='text area' onChange={(event) => this.handleChange(event, 'address')} defaultValue={this.state.data ? this.state.data['address'] : null}/>
                                    </Form.Field>
                                </Form>
                            </Segment>
                            <Segment color={this.state.value === 'cash' ? 'red' : undefined} raised={this.state.value === 'cash' ? true : false} style={{width : '300px', float : 'right', marginTop : '0px'}}>
                                <Checkbox label='Cash on Delivery' value='cash' checked={this.state.value === 'cash'} onChange={this.handleChange}/>
                            </Segment>
                            <Segment color={this.state.value === 'razorpay' ? 'red' : undefined} raised={this.state.value === 'razorpay' ? true : false} style={{width : '300px'}}>
                                <Checkbox label='Pay with Razorpay' value='razorpay' checked={this.state.value === 'razorpay'} onChange={this.handleChange}/>
                            </Segment>
                            </>
                        : undefined}
                        {this.state.pay_id ? this.state.pay_id !== 'COD' ? 
                            <Header icon textAlign='center'>
                                <Icon name='checkmark' color='green' />Payment Successful!!!
                            </Header>
                        :
                            undefined
                        :
                            undefined
                        }
                        {this.state.pay_id ? this.state.pay_id === 'COD' ? 
                            <Header icon textAlign='center'>
                                <Icon name='checkmark' color='green' />Mode of Payment : Cash on Delivery!!
                            </Header>
                        :
                            undefined
                        :
                            undefined
                        }
                        {this.state.loader === true ? 
                            <Segment basic style={{marginTop : '200px'}}>
                                <Dimmer active inverted>
                                    <Loader size='big'>Getting Profile Data....</Loader>
                                </Dimmer>
                            </Segment>
                        : 
                            undefined}
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                {this.state.status === 'billing' ?
                    <Button disabled={!this.state.value} content="Confirm and Proceed" labelPosition='right' icon='arrow right' onClick={() => {this.setState({ status : 'payment' }); this.openCheckout()}} color='teal' />
                : <> <Button content='Confirm Order' labelPosition='right' color='teal' icon='checkmark' onClick={this.confirmOrder} /></>}
                </Modal.Actions>
            </Modal>
            <SemanticToastContainer position="top-right" size='big'/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : localStorage 
    }
}

export default connect(mapStateToProps)(Checkout);
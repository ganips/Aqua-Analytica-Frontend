import React from 'react';
import { Segment, Table, Loader, Dimmer, Icon, Image, Button, Input, Header } from 'semantic-ui-react';
import axios from 'axios';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Checkout from './checkout';

class Cart extends React.Component{

    state={
        products : [],
        loader : true,
        total : undefined,
    }

    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        this.setState({images : images })
    }

    componentDidMount(){
        this.setState({ products : [], loader : true,})
        axios.get('http://localhost:8080/api/cart.php').then(response => response.data)
        .then((cart) => {
            var values = []
            axios.get('http://localhost:8080/api/products.php').then(response => response.data)
            .then((products) => {
                cart.map((item) => {
                    if(item['customers_id'] === this.props.id){
                        values.push(item)
                    }
                })
                var items = []
                var total = 0
                values.map((value) => {
                    products.map((product) => {
                        if(value['products_id'] === product['id']){
                            items.push({id : value['id'], file_name : product['file_name'], name : product['name'], category : product['category'], quantity : value['quantity'], amount : product['amount']})
                            total = total + value['quantity'] * product['amount']
                        }
                    })
                })
                this.setState({ products : items, total: total })
            })
        })
        this.importAll(require.context('./images/', false, /\.(png|jpg|svg)$/));
        setTimeout(() => this.setState({ loader : false }), 1000);
    }

    deleteItem = (id) => {
        axios.delete('http://localhost:8080/api/cart.php' + '?' + 'id=' + id).then(response => response)
        .then((response) => {
            if(response.status === 200){
                toast({
                    type: 'success',
                    description: 'Item Successfully removed from Cart',
                    animation: 'bounce',
                    time: 5000,
                });
            }
        })
        setTimeout(() => this.componentDidMount(), 1000);
    }

    editQuantity = (id, quantity, edit) => {
        let data;
        if(edit === 'add'){
            data = {id : id, quantity : Number(quantity) + 1}
        }
        else{
            data = {id : id, quantity : Number(quantity) - 1}
        }
        axios.put('http://localhost:8080/api/cart.php', data).then(response => response)
        setTimeout(() => this.componentDidMount(), 0);
    }

    render(){
        const header = ['Delete From Cart', 'Product', 'Name', 'Category', 'Quantity(kgs)', 'Amount']
        if(this.state.loader){
            return  <Segment basic style={{marginTop : '200px'}}>
                        <Dimmer active inverted>
                            <Loader size='big'>Getting Cart Data....</Loader>
                        </Dimmer>
                    </Segment>
        }
        else{
            return(
                <Segment textAlign='center' basic vertical>
                    <div style={{height : '500px', overflow : 'auto', marginLeft : '80px', marginRight : '80px'}}>
                    <Table style={{fontFamily : 'GE Inspira Sans'}} celled textAlign='center'>
                        <Table.Header>
                        <Table.Row>
                            {header.map((name) => {
                                return <Table.HeaderCell>{name}</Table.HeaderCell>
                            })}
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.products.map((product) => {
                                return  (<Table.Row>
                                            <Table.Cell ><Button icon basic circular color='red' onClick={() => this.deleteItem(product.id)}><Icon name='close' size='large'/></Button></Table.Cell>
                                            <Table.Cell><center><Image src={this.state.images[product.file_name].default} style={{width : '50px', height : '50px'}} /></center></Table.Cell>
                                            <Table.Cell>{product.name}</Table.Cell>
                                            <Table.Cell>{product.category}</Table.Cell>
                                            <Table.Cell>
                                                <Input>
                                                    <Button size='mini' circular disabled={Number(product.quantity) === 1 ? true : false} content='-' onClick={() => this.editQuantity(product.id, product.quantity, 'minus')} />
                                                    <span style={{marginRight:'15px', marginTop : '5px', marginLeft:'15px'}}>{product.quantity}</span>
                                                    <Button size='mini' circular content='+' onClick={() => this.editQuantity(product.id, product.quantity, 'add')} />
                                                </Input>
                                            </Table.Cell>
                                            <Table.Cell>{product.amount * product.quantity}</Table.Cell>
                                        </Table.Row>)
                            })}
                        </Table.Body>
                    </Table>
                    {this.state.products.length > 0 ? <Header floated='right'>Total Amount : Rs. {this.state.total}</Header> : undefined}
                    {this.state.products.length === 0 ? <p style={{fontFamily : 'GE Inspira Sans', fontSize : '18pt', color : 'Highlight'}}><strong>No items in the Cart</strong></p> : undefined}
                    </div>
                    <SemanticToastContainer position="top-right"/>
                    <Checkout disabled={this.state.products.length > 0 ? false : true} amount={this.state.total} customer_id={this.props.id} />
                </Segment>
            )
        }
    }
}

export default Cart;
import React from 'react';
import { Segment, Table, Loader, Dimmer, Radio, Image, Button, Input, Header, ItemDescription, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';

class Orders extends React.Component{

    state={
        products : [],
        loader : true,
    }

    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        this.setState({images : images })
    }

    componentDidMount(){
        var values = []
        axios.get('http://localhost:8080/api/sales.php').then(response => response.data)
        .then((data) => {
            axios.get('http://localhost:8080/api/products.php').then(response => response.data)
            .then((products) => {
                data.map((item) => {
                    if(item['customers_id'] === this.props.id){
                        products.map((product) => {
                            if(item['products_id'] === product['id']){
                                values.push({file_name : product['file_name'], name : product['name'], category : product['category'], quantity : item['quantity'], amount : item['amount'], pay_id : item['payment_id'], sales_date : item['sales_date'], status : item['status'] === "0" ? false : true})
                            }
                        })
                    }
                    if(this.props.admin === 'admin'){
                        products.map((product) => {
                            if(item['products_id'] === product['id']){
                                values.push({id : item.id, file_name : product['file_name'], name : product['name'], category : product['category'], quantity : item['quantity'], amount : item['amount'], pay_id : item['payment_id'], sales_date : item['sales_date'], status : item['status'] === "0" ? false : true})
                            }
                        })
                    }
                })
            })
        })
        this.setState({ products : values })
        this.importAll(require.context('./images/', false, /\.(png|jpg|svg)$/));
        setTimeout(() => this.setState({ loader : false }), 1000);
    }

    handleChange = (e, {value}) => {
        const status = value.status === true ? 0 : 1;
        axios.put('http://localhost:8080/api/sales.php', {id : value.id, status : status}).then(response => response)
        .then(() => {
            this.setState({ loader : true})
            this.componentDidMount()
        })
    }

    render(){
        console.log(this.state)
        const header = ['Product', 'Name', 'Category', 'Quantity(kgs)', 'Amount', 'Payment ID', 'Sales Date', 'Status']
        const message = this.props.id ? "Getting all Orders...." : "Getting your Orders...."
        if(this.state.loader){
            return  <Segment basic style={{marginTop : '200px'}}>
                        <Dimmer active inverted>
                            <Loader size='big'>{message}</Loader>
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
                                            <Table.Cell><center><Image src={this.state.images[product.file_name].default} style={{width : '50px', height : '50px'}} /></center></Table.Cell>
                                            <Table.Cell>{product.name}</Table.Cell>
                                            <Table.Cell>{product.category}</Table.Cell>
                                            <Table.Cell>{product.quantity}</Table.Cell>
                                            <Table.Cell>{product.amount * product.quantity}</Table.Cell>
                                            <Table.Cell>{product.pay_id}</Table.Cell>
                                            <Table.Cell>{product.sales_date}</Table.Cell>
                                            <Table.Cell>
                                                <Radio disabled={product.status || this.props.admin !== 'admin'} toggle value={product} defaultChecked={product.status} onChange={this.handleChange} />
                                                <br />
                                                {product.status === true ? 'In-progress' : 'Delivered'}
                                            </Table.Cell>
                                        </Table.Row>)
                            })}
                        </Table.Body>
                    </Table>
                    {this.state.products.length === 0 ? <p style={{fontFamily : 'GE Inspira Sans', fontSize : '18pt', color : 'Highlight'}}><strong>You haven't ordered anything yet!!</strong></p> : undefined}
                    </div>
                </Segment>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        users : localStorage 
    }
}

export default connect(mapStateToProps)(Orders);
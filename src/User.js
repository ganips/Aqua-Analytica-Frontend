import React from 'react';
import logo from './logo.png';
import { Segment, Header, Menu, Button, Image, Icon, Card, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import Profile from './Profile';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Cart from './Cart.js';
import { connect } from 'react-redux';
import Orders from './orders';
import About from './about';

class Users extends React.Component{

    state = {
        activeItem  : 'profile',
        Meat : [],
        Dry : [],
        Flowers : [],
        Vegetables : [],
        Fruits : [],
        Milk : [],
        images : [],
    }

    componentDidMount(){
        const url = 'http://localhost:8080/api/custom.php'
        axios.post(url, {query : "select *, products.id as pid, products.name as pname  from products left join traders on products.traders_id=traders.id where traders.active=1"}).then(response => response.data)
        .then((data) => { 
            data.map((row) => {
                if(row['category'] === 'Meat'){
                    this.state.Meat.push(row)
                }
                else if(row['category'] === 'Milk Products'){
                    this.state.Milk.push(row)
                }
                else if(row['category'] === 'Flowers'){
                    this.state.Flowers.push(row)
                }
                else if(row['category'] === 'Vegetables'){
                    this.state.Vegetables.push(row)
                }
                else if(row['category'] === 'Fruits'){
                    this.state.Fruits.push(row)
                }
                else if(row['category'] === 'Dry Fruits'){
                    this.state.Dry.push(row)
                }
            })
        })
        this.importAll(require.context('./images/', false, /\.(png|jpg|svg)$/));
        axios.get('http://localhost:8080/api/customers.php').then(response => response.data)
        .then((data) => {
            data.map((item) => {
                if(item['name'] === this.props.user){
                    this.setState({ customer_id : item['id'] })
                }
            })
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    refresh = () => {
        this.setState({
            Meat : [],
            Milk : [],
            Flowers : [],
            Vegetables : [],
            Fruits : [],
            Dry : []
        })
        this.componentDidMount()
    }

    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        this.setState({images : images })
    }

    addCart = (id, amount) => {
        var found = false
        axios.get('http://localhost:8080/api/cart.php').then(response => response.data)
        .then((data) => {
            data.map((item) => {
                if(id === item['products_id']){
                    found = true
                }
            })
            if(found === true){
                toast({
                    type: 'error',
                    description: 'Item already in Cart',
                    animation: 'bounce',
                    time: 5000,
                });
            }
            else{
                axios.post('http://localhost:8080/api/cart.php', { id : id, amount : amount, quantity : 1, customer_id : this.state.customer_id }).then(response => response)
                .then((response) => {
                    if(response.status === 200){
                        toast({
                            type: 'success',
                            description: 'Item Added to Cart',
                            animation: 'bounce',
                            time: 5000,
                        });
                    }
                    setTimeout(() => this.refresh(), 1000);
                })
            }
        })
    }
    
    render(){
        const { activeItem } = this.state
        console.log(this.state)
        return(
            <Segment inverted style={{ height : '100vh', margin : '0px'}}>
            <Segment style={{ height : '100px', marginTop : '0'}}>
                <div style={{float : 'left'}}>
                    <Header style={{ fontFamily : 'GE Inspira Sans', fontSize : '30pt'}}>
                        <Image circular src={logo} /> FRESH POINT
                    </Header>
                </div>
                <div style={{float: 'right', marginTop : '15px', fontFamily : 'GE Inspira Sans', fontSize : '20pt', color : 'green'}}>
                    Welcome Back {this.props.user} !!!
                    <Button positive compact size='big' style={{marginLeft : '30px'}} onClick={() => {localStorage.clear(); window.location.reload(false)}}>Logout</Button>
                </div>
            </Segment>
            <div style={{width : 'fit-content'}}>
                <Menu inverted secondary size='huge' style={{fontFamily : 'GE Inspira Sans'}}>
                    <Menu.Item
                        name='profile'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                    />
                    <Dropdown item text='Categories'>
                        <Dropdown.Menu>
                            <Dropdown.Item name='vegetables' active={activeItem === 'vegetables'} onClick={this.handleItemClick}>Vegetables</Dropdown.Item>
                            <Dropdown.Item name='meat' active={activeItem === 'meat'} onClick={this.handleItemClick}>Meat</Dropdown.Item>
                            <Dropdown.Item name='dry' active={activeItem === 'dry'} onClick={this.handleItemClick}>Dry Fruits</Dropdown.Item>
                            <Dropdown.Item name='fruits' active={activeItem === 'fruits'} onClick={this.handleItemClick}>Fruits</Dropdown.Item>
                            <Dropdown.Item name='flowers' active={activeItem === 'flowers'} onClick={this.handleItemClick}>Flowers</Dropdown.Item>
                            <Dropdown.Item name='milk' active={activeItem === 'milk'} onClick={this.handleItemClick}>Milk Products</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item name='My Cart' active={activeItem === 'cart'} onClick={this.handleItemClick}>
                    </Menu.Item>
                    <Menu.Item name='My Orders' active={activeItem === 'orders'} onClick={this.handleItemClick} />
                    <Menu.Item name='About US' active={activeItem === 'about'} onClick={this.handleItemClick} />
                </Menu>
            </div>
            <Segment style={{height : '74%', overflow:'auto'}}>
                {this.state.activeItem === 'profile' ? 
                    <Profile name='customers' user={this.props.user} id={this.state.customer_id}/>
                :
                    undefined
                }
                {this.state.activeItem === 'My Cart' ? 
                    <Cart id={this.state.customer_id} />
                :
                    undefined
                }
                {this.state.activeItem === 'My Orders' ? 
                    <Orders id={this.state.customer_id} admin='null' />
                :
                    undefined
                }
                {this.state.activeItem === 'meat' ? 
                    <Card.Group itemsPerRow={5}>
                    {this.state.Meat.map((row) => {
                        return  <Card>
                                    <Card.Content>
                                        <Image src={this.state.images[row.file_name].default} size='tiny' wrapped floated='right' />
                                        <Card.Header>{row.pname}</Card.Header>
                                        <Card.Meta><span>Rs.{row.amount}/-</span></Card.Meta>
                                        <Card.Description>{row.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button  floated='right'color='teal' onClick={() => this.addCart(row.pid, row.amount)}>Add to Cart</Button>
                                    </Card.Content>
                                </Card>
                    })}
                    </Card.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'dry' ? 
                    <Card.Group itemsPerRow={5}>
                    {this.state.Dry.map((row) => {
                        return  <Card>
                                    <Card.Content>
                                        <Image src={this.state.images[row.file_name].default} size='tiny' wrapped floated='right' />
                                        <Card.Header>{row.pname}</Card.Header>
                                        <Card.Meta><span>Rs.{row.amount}/-</span></Card.Meta>
                                        <Card.Description>{row.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button  floated='right'color='teal' onClick={() => this.addCart(row.pid, row.amount)}>Add to Cart</Button>
                                    </Card.Content>
                                </Card>
                    })}
                    </Card.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'vegetables' ? 
                    <Card.Group itemsPerRow={5}>
                    {this.state.Vegetables.map((row) => {
                        return  <Card>
                                    <Card.Content>
                                        <Image src={this.state.images[row.file_name].default} size='tiny' wrapped floated='right' />
                                        <Card.Header>{row.pname}</Card.Header>
                                        <Card.Meta><span>Rs.{row.amount}/-</span></Card.Meta>
                                        <Card.Description>{row.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button  floated='right'color='teal' onClick={() => this.addCart(row.pid, row.amount)}>Add to Cart</Button>
                                    </Card.Content>
                                </Card>
                    })}
                    </Card.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'flowers' ? 
                    <Card.Group itemsPerRow={5}>
                    {this.state.Flowers.map((row) => {
                        return  <Card>
                                    <Card.Content>
                                        <Image src={this.state.images[row.file_name].default} size='tiny' wrapped floated='right' />
                                        <Card.Header>{row.pname}</Card.Header>
                                        <Card.Meta><span>Rs.{row.amount}/-</span></Card.Meta>
                                        <Card.Description>{row.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button  floated='right'color='teal' onClick={() => this.addCart(row.pid, row.amount)}>Add to Cart</Button>
                                    </Card.Content>
                                </Card>
                    })}
                    </Card.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'fruits' ? 
                    <Card.Group itemsPerRow={5}>
                    {this.state.Fruits.map((row) => {
                        return  <Card>
                                    <Card.Content>
                                        <Image src={this.state.images[row.file_name].default} size='tiny' wrapped floated='right' />
                                        <Card.Header>{row.pname}</Card.Header>
                                        <Card.Meta><span>Rs.{row.amount}/-</span></Card.Meta>
                                        <Card.Description>{row.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button  floated='right'color='teal' onClick={() => this.addCart(row.pid, row.amount)}>Add to Cart</Button>
                                    </Card.Content>
                                </Card>
                    })}
                    </Card.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'milk' ? 
                    <Card.Group itemsPerRow={5}>
                    {this.state.Milk.map((row) => {
                        return  <Card>
                                    <Card.Content>
                                        <Image src={this.state.images[row.file_name].default} size='tiny' wrapped floated='right' />
                                        <Card.Header>{row.pname}</Card.Header>
                                        <Card.Meta><span>Rs.{row.amount}/-</span></Card.Meta>
                                        <Card.Description>{row.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button  floated='right'color='teal' onClick={() => this.addCart(row.pid, row.amount)}>Add to Cart</Button>
                                    </Card.Content>
                                </Card>
                    })}
                    </Card.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'About US' ? 
                    <About />
                :
                    undefined
                }
            </Segment>
            
            <SemanticToastContainer position="top-right"/>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : localStorage.name,
    }
}

export default connect(mapStateToProps)(Users);
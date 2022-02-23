import React, { Component } from 'react';
import { Button, Divider, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import axios from 'axios';
import logo from './logo.png';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { NavLink, Redirect } from 'react-router-dom';
import { setUserDetails } from './userAction';
import { connect } from 'react-redux';

class Login extends Component{

    state={
        isValidUser : undefined,
        isAdmin : this.props.user ? this.props.user.type : undefined,
        name : undefined,
        email : undefined,
        password : undefined,
        user : undefined,
        loginVisible : false,
        registerVisible : false,
        isValidTrader : undefined,
        type : undefined,
    }

    valuesChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    onLogin = () => {
        const url = 'http://localhost:8080/api/user.php'
        axios.get(url).then(response => response.data)
        .then((data) => {
            for(var i=0; i<data.length; i++){
                if(data[i]['email'] === this.state.email && data[i]['password'] === this.state.password){
                    this.saveStateToLocalStorage(data[i])
                    this.setState({ isValidUser : true })
                }
            }
            if(!this.state.isValidUser && !this.state.isAdmin && !this.state.isValidTrader){
                this.setState({ loginVisible : true })
            }
        })
    }

    saveStateToLocalStorage(arr) {
        for (let key in arr) {
            localStorage.setItem(key, arr[key]);
        }
        console.log(localStorage)
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        this.saveStateToLocalStorage(this.props.users);
    }

    onRegister= () => {
        const url = 'http://localhost:8080/api/user.php'
        axios.get(url).then(response => response.data)
        .then((data) => {
            for(var i=0; i<data.length; i++){
                if(data[i]['email'] === this.state.email && data[i]['password'] === this.state.password){
                    this.setState({ registerVisible : true })
                }
            }
            if(this.state.registerVisible == false){
                const url = 'http://localhost:8080/api/user.php'
                axios.post(url, { name : this.state.name, email : this.state.email, password : this.state.password, type : this.state.type})
                .then(response => response.data)
                .then((data) => {
                    toast({
                        type: 'success',
                        description: 'User Successfully Created.',
                        animation: 'bounce',
                        time: 2000,
                    });
                    if(this.state.type === 'Trader'){
                        const trader_url = 'http://localhost:8080/api/traders.php'
                        axios.post(trader_url, { name : this.state.name, email : this.state.email, password : this.state.password, type : this.state.type, gender : null, age : 0, address : null, profession : null, active : 0})
                        .then(()=>{
                            window.location.reload(false)
                        })
                    }
                    if(this.state.type === 'Customer'){
                        const trader_url = 'http://localhost:8080/api/customers.php'
                        axios.post(trader_url, { name : this.state.name, email : this.state.email, password : this.state.password, type : this.state.type, gender : null, age : 0, address : null})
                        .then(()=>{
                            window.location.reload(false)
                        })
                    }
                })
            }
        })
    }

    render(){
        const options = [
            { key: 1, text: 'Trader', value: 'Trader' },
            { key: 2, text: 'Customer', value: 'Customer' },
        ]

        return(
            <>
            {!this.state.isValidUser && !this.state.isAdmin && !this.state.isValidTrader && !this.props.users ?
                <Segment inverted style={{ height : '100%', margin : '0px'}}>
                <Segment style={{ height : '100px', marginTop : '0', marginBottom : '20px'}}>
                <div style={{float : 'left'}}>
                    <Header style={{ fontFamily : 'GE Inspira Sans', fontSize : '30pt'}}>
                        <Image circular src={logo} /> FRESH POINT
                    </Header>
                </div>
                <div style={{ fontFamily : 'GE Inspira Sans', fontSize : '25pt', float : 'right', marginTop : '25px', color : 'green'}}>
                    WELCOME!!!
                </div>
                </Segment>
                <Segment style={{paddingTop : '140px', height : '100%', backgroundColor : '#F5FFFA'}}>
                <Grid textAlign='center' verticalAlign='middle' columns={2}>
                    <Grid.Column style={{ maxWidth : '450px', marginRight : '40px' }}>
                        <Header as='h2' color='teal' textAlign='center' style={{fontFamily : 'GE Inspira Sans'}}>Log-in to your account</Header>
                        <Form size='large' style={{fontFamily : 'GE Inspira Sans'}}>
                            <Segment stacked>
                            <Form.Input fluid icon='user' name='email' iconPosition='left' placeholder='E-mail address' onChange={this.valuesChange} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={this.valuesChange}
                            />
                            <Button color='gray' fluid size='large' disabled={this.state.email && this.state.password && !this.state.name ? false : true} onClick={this.onLogin}>
                                Login
                            </Button>
                            </Segment>
                        </Form>
                        {this.state.loginVisible == false ? undefined : <p style={{color : 'red'}}>Invalid EmailId or Passowrd</p>}
                    </Grid.Column>
                    <Divider vertical style={{height : '250px'}}>OR</Divider>
                    <Grid.Column style={{ maxWidth : '450px', marginLeft : '40px' }}>
                        <Header as='h2' color='teal' textAlign='center' style={{fontFamily : 'GE Inspira Sans'}}>Register</Header>
                        <Form size='large' style={{fontFamily : 'GE Inspira Sans'}}>
                            <Segment stacked>
                            <Form.Input fluid placeholder='Name' name='name' onChange={this.valuesChange} />
                            <Form.Input fluid icon='user' iconPosition='left' name='email' placeholder='E-mail address' onChange={this.valuesChange} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={this.valuesChange}
                            />
                            <Form.Dropdown options={options} selection onChange={(event) => { this.setState({ type : event.target.innerText }) }} fluid placeholder='Type' name='type'/>
                            <Button color='gray' fluid size='large' disabled={this.state.email && this.state.password && this.state.name && this.state.type ? false : true} onClick={this.onRegister}>
                                Register
                            </Button>
                            </Segment>
                        </Form>
                        {this.state.registerVisible === false ? undefined : <p style={{color : 'red'}}>User with same EmailId/Name already exist</p>}
                    </Grid.Column>
                </Grid>
                </Segment>
                </Segment>
            : 
                <Redirect to='/' />
            }
            <SemanticToastContainer position="top-right"/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : state.user.user_details ? state.user.user_details : undefined
    }
}

export default connect(mapStateToProps, {setUserDetails})(Login);
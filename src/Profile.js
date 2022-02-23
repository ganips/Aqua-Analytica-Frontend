import React from 'react';
import { Form, Segment, Input, Button, TextArea, Loader, Dimmer } from 'semantic-ui-react';
import profile from './profile.png';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import axios from 'axios';

class Profile extends React.Component{

    state = {
        data : undefined,
        loader : true,
    }

    componentDidMount(){
        const url = 'http://localhost:8080/api/' + this.props.name + '.php'
        axios.get(url).then(response => response.data)
        .then((data) => { 
            data.map((row) => {
                if(row['name'] === this.props.user){
                    this.setState({ data : row })
                }
            })
        })
        setTimeout(() => this.setState({ loader : false }), 1500);
    }

    handleChange = (event, name) => {
        if(name === 'category'){
            this.state.data[name] = event.target.innerText
        }
        else{
            this.state.data[name] = event.target.value
        }
    }

    onSubmit = () => {
        if(this.props.name === 'traders'){
            axios.put('http://localhost:8080/api/traders.php', { ...this.state.data}).then(response => response)
            .then((response) => {
                if(response.status === 200){
                    toast({
                        type: 'success',
                        description: 'Record Successfully Updated',
                        animation: 'bounce',
                        time: 5000,
                    });
                    axios.put('http://localhost:8080/api/user.php', { name : this.state.data.name, email : this.state.data.email, password : this.state.data.password, old_name : this.props.user})
                }
            })
        }
        if(this.props.name === 'customers'){
            axios.put('http://localhost:8080/api/customers.php', { ...this.state.data}).then(response => response)
            .then((response) => {
            if(response.status === 200){
                toast({
                    type: 'success',
                    description: 'Record Successfully Updated',
                    animation: 'bounce',
                    time: 5000,
                });
                axios.put('http://localhost:8080/api/user.php', { name : this.state.data.name, email : this.state.data.email, password : this.state.data.password, old_name : this.props.user})
            }
        })
        }
    }

    render(){
        if(this.state.loader){
            return  <Segment basic style={{marginTop : '200px'}}>
                        <Dimmer active inverted>
                            <Loader size='big'>Getting Profile Data....</Loader>
                        </Dimmer>
                    </Segment>
        }
        else{
            return(
                <Segment basic>
                    <Button color='teal' style={{bottom : '90px', float : 'left', position : 'fixed', left : '140px'}} onClick={this.onSubmit}>Update</Button>
                    <Form size='small' style={{fontFamily : 'GE Inspira Sans', width : '600px', float : 'right', marginRight : '500px'}}>
                        <Form.Field required>
                            <label>Name</label>
                            <Input placeholder='Name' onChange={(event) => this.handleChange(event, 'name')} defaultValue={this.state.data ? this.state.data['name'] : null}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Age</label>
                            <Input placeholder='Age' type='number' onChange={(event) => this.handleChange(event, 'age')} defaultValue={this.state.data ? this.state.data['age'] : null}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Gender</label>
                            <Input placeholder='Gender' onChange={(event) => this.handleChange(event, 'gender')} defaultValue={this.state.data ? this.state.data['gender'] : null}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Email Id</label>
                            <Input placeholder='Email Id' onChange={(event) => this.handleChange(event, 'email')} defaultValue={this.state.data ? this.state.data['email'] : null}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <Input placeholder='Password' type='password' onChange={(event) => this.handleChange(event, 'password')} defaultValue={this.state.data ? this.state.data['password'] : null}/>
                        </Form.Field>
                        { this.props.name !== 'customers' ? 
                            <Form.Field required>
                                <label>Profession</label>
                                <Input placeholder='Profession' onChange={(event) => this.handleChange(event, 'profession')} defaultValue={this.state.data ? this.state.data['profession'] : null}/>
                            </Form.Field>
                        :
                            undefined
                        }
                        <Form.Field required>
                            <label>Phone Number</label>
                            <Input placeholder='Number' onChange={(event) => this.handleChange(event, 'phone')} defaultValue={this.state.data ? this.state.data['phone'] : null}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Address</label>
                            <TextArea placeholder='Address' type='text area' onChange={(event) => this.handleChange(event, 'address')} defaultValue={this.state.data ? this.state.data['address'] : null}/>
                        </Form.Field>
                    </Form>
                    <Segment basic style={{float : 'left', width : '200px', height : '200px', marginLeft : '10px'}} circular>
                        <img src={profile} circular/>
                    </Segment>
                    <SemanticToastContainer position="top-right"/>
                </Segment>
            )
        }
    }
}

export default Profile;
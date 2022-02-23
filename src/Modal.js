import React from 'react'
import { Button, Dropdown, Form, Input, Modal, TextArea } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import axios from 'axios';

class Modalv1 extends React.Component{
    state={
        open : false,
        file : undefined,
        fileUpload : false,
        file_name : undefined
    }

    componentDidMount(){
        if(this.props.user === 'products'){
            const url = 'http://localhost:8080/api/traders.php'
            axios.get(url).then(response => response.data)
            .then((data) => { 
                data.map((row) => {
                    console.log(row)
                    if(row['name'] === this.props.user_name){
                        this.setState({ traders_id : row['id'] })
                    }
                })
            })
        }
    }

    handleChange = (event, name) => {
        if(name === 'category'){
            this.setState({ [name] : event.target.innerText })
            if(this.props.name === 'Update')
                this.props.data[name] = event.target.innerText
        }
        else{
            this.setState({ [name] : event.target.value }) 
            if(this.props.name === 'Update')
                this.props.data[name] = event.target.value
        }
    }

    onSubmit = () => {
        const url = 'http://localhost:8080/api/' + this.props.user + '.php'
        if(this.props.name === 'Create'){
            axios.post(url, { ...this.state}).then(response => response)
            .then((response) => {
                if(response.status == 200){
                    toast({
                        type: 'success',
                        description: 'Record Successfully ' + this.props.name + 'ed',
                        animation: 'bounce',
                        time: 5000,
                    });
                }
            })
            .then(() => {
                this.setState({open : false, file : undefined, fileUpload : false, file_name : undefined})
            })
        }
        if(this.props.name === 'Update'){
            axios.put(url, { ...this.props.data, id : this.props.data.id}).then(response => response)
            .then((response) => {
                if(response.status === 200){
                    toast({
                        type: 'success',
                        description: 'Record Successfully ' + this.props.name + 'ed',
                        animation: 'bounce',
                        time: 5000,
                    });
                }
                else{
                    toast({
                        type: 'error',
                        description: 'There was an error while ' + this.props.name + 'ing'  + 'Record',
                        animation: 'bounce',
                        time: 5000,
                    });
                }
            })
            .then(() => {
                this.setState({open : false, file : undefined, fileUpload : false, file_name : undefined})
            })
        }
        if(this.props.name === 'Delete'){
            axios.delete(url + '?' + 'id=' + this.props.data.id).then(response => response)
            .then((response) => {
                if(response.status === 200){
                    toast({
                        type: 'success',
                        description: 'Record Successfully ' + this.props.name + 'ed',
                        animation: 'bounce',
                        time: 5000,
                    });
                }
                else{
                    toast({
                        type: 'error',
                        description: 'There was an error while ' + this.props.name + 'ing'  + 'Record',
                        animation: 'bounce',
                        time: 5000,
                    });
                }
            })
            .then(() => {
                this.setState({open : false})
            })
        }
    }

    fileUpload = () => {
        const formData = new FormData();
        formData.append('avatar',this.state.file)
        axios.post('http://localhost:8080/api/file_upload.php', formData,{headers: {'content-type': 'multipart/form-data'}}).then(response=>response)
        .then((response) => response.data.status === 'success' ? this.setState({ fileUpload : true, file_name : response.data.name}) : this.setState({ fileUpload : false}))
    }

    render(){
        const options = [
            { key: 1, text: 'Meat', value: 'Meat' },
            { key: 2, text: 'Vegetables', value: 'Vegetables' },
            { key: 3, text: 'Dry Fruits', value: 'Dry' },
            { key: 3, text: 'Flowers', value: 'Flowers' },
            { key: 3, text: 'Fruits', value: 'Fruits' },
            { key: 3, text: 'Milk Products', value: 'Milk' },
        ]
        if(this.props.type === 'create' || this.props.type === 'update'){
            return <Modal
                        onClose={() => this.setState({open : false})}
                        onOpen={() => this.setState({open : true})}
                        open={this.state.open}
                        size='small'
                        trigger={<Button color={this.props.color} disabled={this.props.disabled}>{this.props.name}</Button>}
                    > 
                <Modal.Header>{this.props.name} Record</Modal.Header>
                <Modal.Content>
                    {this.props.user === 'traders' || this.props.user === 'customers' ? 
                        <Form style={{fontFamily : 'GE Inspira Sans'}}>
                            <Form.Field required>
                                <label>Name</label>
                                <Input placeholder='Name' onChange={(event) => this.handleChange(event, 'name')} defaultValue={this.props.data ? this.props.data['name'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Age</label>
                                <Input placeholder='Age' type='number' onChange={(event) => this.handleChange(event, 'age')} defaultValue={this.props.data ? this.props.data['age'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Gender</label>
                                <Input placeholder='Gender' onChange={(event) => this.handleChange(event, 'gender')} defaultValue={this.props.data ? this.props.data['gender'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Email Id</label>
                                <Input placeholder='Email Id' onChange={(event) => this.handleChange(event, 'email')} defaultValue={this.props.data ? this.props.data['email'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <Input placeholder='Password' type='password' onChange={(event) => this.handleChange(event, 'password')} defaultValue={this.props.data ? this.props.data['password'] : null}/>
                            </Form.Field>
                            { this.props.user !== 'customers' ? 
                                <Form.Field required>
                                    <label>Profession</label>
                                    <Input placeholder='Profession' onChange={(event) => this.handleChange(event, 'profession')} defaultValue={this.props.data ? this.props.data['profession'] : null}/>
                                </Form.Field>
                            :
                                undefined
                            }
                            <Form.Field required>
                                <label>Address</label>
                                <TextArea placeholder='Address' type='text area' onChange={(event) => this.handleChange(event, 'address')} defaultValue={this.props.data ? this.props.data['address'] : null}/>
                            </Form.Field>
                        </Form>
                    :
                        undefined
                    }
                    {this.props.user === 'products' ? 
                        <>
                        <Form style={{fontFamily : 'GE Inspira Sans'}}>
                            <Form.Field required>
                                <label>Name</label>
                                <Input placeholder='Name' onChange={(event) => this.handleChange(event, 'name')} defaultValue={this.props.data ? this.props.data['name'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Category</label>
                                <Dropdown selection options={options} placeholder='Category' onChange={(event) => this.handleChange(event, 'category')} defaultValue={this.props.data ? this.props.data['category'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Description</label>
                                <TextArea placeholder='Description' onChange={(event) => this.handleChange(event, 'description')} defaultValue={this.props.data ? this.props.data['description'] : null}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Amount</label>
                                <Input placeholder='Amount' type='number' onChange={(event) => this.handleChange(event, 'amount')} defaultValue={this.props.data ? this.props.data['amount'] : null}/>
                            </Form.Field>
                        </Form>
                        <Form style={{marginTop : '20px'}}>
                            <Form.Field required inline>
                                <label>Image</label>
                                <Input placeholder='Select a file' name='file' type='file' onChange={(e) => this.setState({file:e.target.files[0]})} disabled={this.props.data ? this.props.data['file_name'] ? true : false : false}/>
                                <Button color='green' disabled={this.state.fileUpload || !this.state.file} floated='right' style={{marginTop : '6px'}} onClick={this.fileUpload}>{this.state.fileUpload ? 'Uploaded' : 'Upload'}</Button>
                            </Form.Field>
                        </Form>
                        </>
                    :
                        undefined
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button color='gray' onClick={() => this.setState({open : false})}>Cancel</Button>
                    <Button content={this.props.name} disabled={(!this.state.fileUpload || !this.state.file) && this.props.name === 'Create'} labelPosition='right' icon='checkmark' onClick={this.onSubmit} color='teal' />
                </Modal.Actions>
                <SemanticToastContainer position="top-right"/>
            </Modal>
        }
        else if(this.props.type === 'delete'){
            return <Modal
                onClose={() => this.setState({open : false})}
                onOpen={() => this.setState({open : true})}
                open={this.state.open}
                size='small'
                trigger={<Button color={this.props.color} disabled={this.props.disabled}>{this.props.name}</Button>}
            > 
                <Modal.Header>{this.props.name} Record</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <p>
                        Do you want to delete the record with name {this.props.data ? this.props.data['name'] : undefined}
                    </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({open : false})}>Back</Button>
                    <Button content={this.props.name} onClick={this.onSubmit} color='red' labelPosition='right' icon='trash'/>
                </Modal.Actions>
                <SemanticToastContainer position="top-right"/>
            </Modal>
        }
        else{
            return null
        }
    }
}

export default Modalv1;
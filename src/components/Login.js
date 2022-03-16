import React from 'react';
import logo from './images/bwssb-logo.jpg';
import { Modal, Button, Form, Image } from 'semantic-ui-react';

class Login extends React.Component{

    state={
        open : false
    }

    setOpen = (value) => {
        this.setState({ open : value })
    }

    render(){
        return(
            <Modal size = 'small' onClose={() => this.setOpen(false)} onOpen={() => this.setOpen(true)} open={this.state.open} trigger={<button className='button-home'>Login</button>}>
                <Modal.Header style={{fontFamily : "GE Inspira Sans", float : "center"}}>BWSSB Login</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={logo} wrapped />
                    <Modal.Description style={{margin : "auto", width : "50%"}}>
                        <Form size='small'>
                            <Form.Input label='Username' placeholder='First name' />
                            <Form.Input label='Password' type='password' placeholder='Last name' />
                            <Form.Checkbox label='I agree to the Terms and Conditions' />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setOpen(false)}>Cancel</Button>
                    <Button content="Login" labelPosition='right' icon='checkmark' onClick={() => this.setOpen(false)} color='blue' />
                </Modal.Actions>
            </Modal>
        )
    }

}

export default Login;
import React from 'react';
import HeaderBar from './HeaderBar';
import { Grid, Form, Header, Icon, Segment, Container } from 'semantic-ui-react';
import Arsalan from './images/Arsalan.png';
import Devraj from './images/Devraj.jfif';
import Dhanush from './images/Dhanush.jfif';
import Ganesh from './images/Ganesh.png';

class Contact extends React.Component{

    render(){
        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
            { key: 'o', text: 'Other', value: 'other' },
        ]
        return(
            <>
            <HeaderBar />
            <div>
                <Grid style={{padding : "50px 50px 50px 50px", marginRight : "60px"}}>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <center><Header style={{fontFamily : "GE INspira Sans", fontSize : "25pt", marginBottom : "20px"}} color='blue'>Conatct Us</Header></center>
                            <Segment basic>
                            <span style={{fontSize : "20px"}}>
                                <center>
                                    <Icon name='building outline' size='big'/>
                                    <b>Company :</b>: Aqua Analytica Systems
                                </center>
                            </span>
                            <br />
                            <br />
                            <span style={{fontSize : "20px"}}>
                                <center>
                                    <Icon name='map marker alternate' size='big'/>
                                    <b>Location :</b>: Bengaluru, IN
                                </center>
                            </span>
                            <br />
                            <br />
                            <span style={{fontSize : "20px"}}>
                                <center>
                                    <Icon name='phone' size='big'/>
                                    <b>Phone :</b>: 9999999999
                                </center>
                            </span>
                            <br />
                            <br />
                            <span style={{fontSize : "20px"}}>
                                <center>
                                    <Icon name='envelope' size='big'/>
                                    <b>Email :</b>: aquaanalytica@gmail.com
                                </center>
                            </span>
                            <br />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <center><Header style={{fontFamily : "GE INspira Sans", fontSize : "25pt", marginBottom : "20px"}} color='blue'>Provide us Feedback</Header></center>
                            <Segment basic>
                            <Form size='large'>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='First name' placeholder='First name' />
                                    <Form.Input fluid label='Last name' placeholder='Last name' />
                                    <Form.Select
                                        fluid
                                        label='Gender'
                                        placeholder='Gender'
                                        options={options}
                                    />
                                </Form.Group>
                                <Form.Group inline>
                                    <label>Size</label>
                                    <Form.Radio
                                        label='Small'
                                        value='sm'
                                    />
                                    <Form.Radio
                                        label='Medium'
                                        value='md'
                                    />
                                    <Form.Radio
                                        label='Large'
                                        value='lg'
                                    />
                                </Form.Group>
                                <Form.TextArea label='About' placeholder='Tell us on how we can improve...' />
                                <Form.Button color='blue'>Submit &nbsp;<span><Icon name='paper plane' /></span></Form.Button>
                            </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment basic textAlign='center'>
                    <Header style={{fontFamily : "GE Inspira Sans", fontSize : "25pt"}} color='blue'>Developers</Header>
                    <br />
                    <Grid>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <img src={Arsalan} style={{height : "400px", width:"400px"}}/>
                                <center style={{fontFamily : "GE Inspira Sans", fontSize : "20pt"}}>Arsalan Anwar</center>
                            </Grid.Column>
                            <Grid.Column>
                                <img src={Devraj} style={{height : "400px", width:"400px"}}/>
                                <center style={{fontFamily : "GE Inspira Sans", fontSize : "20pt"}}>Devraj</center>
                            </Grid.Column>
                            <Grid.Column>
                                <img src={Dhanush} style={{height : "400px", width:"400px"}}/>
                                <center style={{fontFamily : "GE Inspira Sans", fontSize : "20pt"}}>Dhanush R</center>
                            </Grid.Column>
                            <Grid.Column>
                                <img src={Ganesh} style={{height : "400px", width:"400px"}}/>
                                <center style={{fontFamily : "GE Inspira Sans", fontSize : "20pt"}}>Ganesh Prasad</center>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
            </>
        )
    }

}

export default Contact;
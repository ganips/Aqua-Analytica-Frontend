import React from 'react';
import { Segment, Header, Container, Button, Rating, Icon, Form, TextArea } from 'semantic-ui-react';

class About extends React.Component{
    render(){
        return(
            <>
            <div>
                <Container textAlign='justified' style={{float : 'left'}}>
                    <Header style={{ fontFamily : 'GE Inspira Sans', fontSize : '30pt'}}>About Us</Header>
                    <p style={{ fontFamily : 'GE Inspira Sans', fontSize : '18pt'}}>
                        About us is a little introduction about our application Fresh Point. 
                        Fresh point is an e-commerce site that will be capable of providing every kind of goods and products from every sector to every consumer all over the India. 
                        The world’s marketplace will be only finger-tips away for any customer in possession of a smartphone/computer and an internet connection. 
                        They will be able to hire everything from a safety-pin to an apartment building from our website. 
                        We have gathered the brightest minds and given them the platform to perform to their fullest extent. 
                        All the data-mining and optimization has been done in-house and no outsourcing from any organization has taken place. 
                        It is a platform where people can hire all kinds of goods from a single website. We hire no outsourcing outlets and that ensures the security of all our users. 
                        There is absolutely no chance of any information being leaked thanks to our dedicated team who are working all the time to ensure that our website is the most secure e-commerce platform. 
                    </p>
                    <p style={{ fontFamily : 'GE Inspira Sans', fontSize : '18pt'}}>
                        What separates us from other platforms of such sorts is the diversity of our product range and the security that we provide to our users. 
                        It is absolutely cutting-edge and state-of-the-art and we can guarantee that no other platform has this much diversity in its product range. 
                        Our website is going to be so convenient and user-friendly for our customers that, they would rather hire from our website than go to the shop which is 100 meters away from his/her home. 
                        That is the kind of target Fresh Point has set for itself. And once we achieve our targets, we will start expanding towards other countries and 
                        present ourselves on a much broader and global scale and encompass the entire world with our website in a short amount of time.
                    </p>
                    <Header style={{ fontFamily : 'GE Inspira Sans', fontSize : '30pt'}}>Feedback</Header>
                    <Form>
                        <Rating style={{marginLeft : '450px'}} maxRating={5} defaultRating={1} icon='star' size='massive' />
                        <TextArea placeholder='Please submit your feedback' type='text area' onChange={(event) => this.handleChange(event, 'feedback')}></TextArea>
                        <br />
                        <br />
                        <Button color='teal' basic>Submit</Button>
                    </Form>
                </Container>
                <Icon.Group size='massive' style={{marginLeft : '150px', marginTop : '200px', position : 'fixed'}}>
                    <Icon size='big' loading name='circle notch' />
                    <Icon name='open cart' />
                </Icon.Group>
            </div>
            </>
        )
    }
}

export default About;
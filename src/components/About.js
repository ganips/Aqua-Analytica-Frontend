import React from 'react';
import HeaderBar from './HeaderBar';
import { Grid, Header, Icon, Card, Container, Statistic, Divider, Segment } from 'semantic-ui-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class About extends React.Component{

    render(){
        const percentage = 66;
        return(
            <>
            <HeaderBar />
            <div>
                <Container fluid style={{padding : "30px 30px 30px 30px", fontFamily : 'GE Inspira Sans'}}>
                    <Header as='h1' style={{fontFamily : 'GE Inspira Sans'}} color='blue'>AIM</Header>
                    <p style={{fontSize : "15pt"}}>
                        Aqua Analytica aims at simplifying the process of analyzing and interpreting graphs to obtain critical information.
                        It aims at managing the water resources efficiently.
                        It also aims at forecasting the water consumption demand with the highest confidence possible.
                    </p>
                </Container>
                <Header as='h1' style={{fontFamily : 'GE Inspira Sans', marginLeft : "30px"}} color='blue'>FEATURES</Header>
                <Segment raised padded style={{marginRight : "30px", marginLeft : "30px"}}>
                <Grid divided>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                            <Segment raised basic fluid style={{padding : "10px 10px 10px 10px"}}>
                                <Header size='large' as='h3' style={{fontFamily : 'GE Inspira Sans'}}>
                                    <Icon name='handshake outline' color='blue' />
                                    <Header.Content>
                                    User Friendly
                                    <Header.Subheader>The system is dynamic, sophisticated, straight-forward, user friendly and easy to use.</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic raised fluid style={{padding : "10px 10px 10px 10px"}}>
                                <Header size='large' as='h3' style={{fontFamily : 'GE Inspira Sans'}}>
                                    <Icon name='sort amount up' color='blue' />
                                    <Header.Content>
                                    Scalable
                                    <Header.Subheader>The system is highly scalable and the user should only configure at the ward level</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic raised fluid style={{padding : "10px 10px 10px 10px"}}>
                                <Header size='large' as='h3' style={{fontFamily : 'GE Inspira Sans'}}>
                                    <Icon name='shield alternate' color='blue' />
                                    <Header.Content>
                                    Secure
                                    <Header.Subheader>The system is highly secure as the upload access is given only to authorized officials</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic raised fluid style={{padding : "10px 10px 10px 10px"}}>
                                <Header size='large' as='h3' style={{fontFamily : 'GE Inspira Sans'}}>
                                    <Icon name='stopwatch' color='blue' />
                                    <Header.Content>
                                    Accurate
                                    <Header.Subheader>Each model goes under a strict scrutiny to tune it in such a way that gives highest accuracy.</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
                <Grid style={{marginRight : "90px", marginTop : "20px"}}>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Grid verticalAlign='middle' columns={4} centered>
                                <Grid.Row>
                                    <Grid.Column>
                                        <span style={{fontFamily : 'GE Inspira Sans', fontSize : "20pt"}}><center>Confidence</center></span>
                                        <br />
                                        <CircularProgressbar value={95} text={`95%`} />
                                        <br />
                                        <br />
                                        <span style={{fontFamily : 'GE Inspira Sans', fontSize : "20pt"}}><center>User Appreciation</center></span>
                                        <br />
                                        <CircularProgressbar value={85} text={`85%`} />
                                    </Grid.Column>
                                    <Grid.Column style={{marginLeft : "60px"}}>
                                        <span style={{fontFamily : 'GE Inspira Sans', fontSize : "20pt"}}><center>Accuracy</center></span>
                                        <br />
                                        <CircularProgressbar value={84.5} text={`84.5%`} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column style={{ margin : "auto", width : "50%"}}>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Grid style={{padding : "5px 5px 5px 5px"}} textAlign='center'>
                                            <Grid.Row>
                                                <Card raised fluid style={{padding : "15px 15px 15px 15px", border : "none", borderRadius : "5px"}}>
                                                    <Statistic size='big'>
                                                        <Statistic.Value>
                                                            <Icon name='building outline' color='blue' />32+
                                                        </Statistic.Value>
                                                        <Statistic.Label>Sub Stations</Statistic.Label>
                                                    </Statistic>
                                                </Card>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Card  raised color='blue' style={{padding : "15px 15px 15px 15px", border : "none", borderRadius : "5px"}}>
                                                    <Statistic size='huge'>
                                                        <Statistic.Value>
                                                            <Icon name='sitemap' color='blue' />10
                                                        </Statistic.Value>
                                                        <Statistic.Label>Wards</Statistic.Label>
                                                    </Statistic>
                                                </Card>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Grid textAlign='center' style={{padding : "5px 5px 5px 5px"}}>
                                            <Grid.Row>
                                                <Card raised color='blue' style={{padding : "15px 15px 15px 15px", border : "none", borderRadius : "5px"}}>
                                                    <Statistic size='huge'>
                                                        <Statistic.Value>
                                                            <Icon name='spy' color='blue'/>4
                                                        </Statistic.Value>
                                                        <Statistic.Label>Developers</Statistic.Label>
                                                    </Statistic>
                                                </Card>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Card raised fluid style={{padding : "15px 15px 15px 15px", border : "none", borderRadius : "5px"}}>
                                                    <Statistic size='big'>
                                                        <Statistic.Value>
                                                            <Icon name='tachometer alternate' color='blue'/>145+
                                                        </Statistic.Value>
                                                        <Statistic.Label>DMA's</Statistic.Label>
                                                    </Statistic>
                                                </Card>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            </>
        )
    }

}

export default About;
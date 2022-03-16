import React from 'react';
import { Header, Segment, Grid, Image, Icon, Button } from 'semantic-ui-react';
import './styles.css';
import {Link} from "react-router-dom";
import Login from './Login';

class Home extends React.Component{

    state={
        images : undefined
    }

    componentDidMount(){
        this.importAll(require.context('./images/', false, /\.(png|jpg|svg|jfif)$/));
    }

    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        this.setState({images : images })
        console.log(this.state);
    }

    render(){
        return(
            <>
            {this.state.images ? 
                <Segment style={{height : "100vh", backgroundImage : `url(${this.state.images['background.jpg'].default})`, backgroundRepeat : "no-repeat", backgroundSize : "cover", backgroundPosition : "center"}}>
                    <Grid style={{padding : "20px 20px 20px 20px"}}>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Link to="/home"><Header style={{fontFamily : 'GE Inspira Sans', fontSize : "30pt"}}>AQUA ANALYTICA</Header></Link> 
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <Login />
                                <Link to="/contact"><button className='button-home'> Contact </button></Link>
                                <Link to="/about"><button className='button-home'>About</button></Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid verticalAlign='center' style={{margin : "auto", width : "50%", marginTop : "25vh"}}>
                        <Grid.Row>
                            <Header icon="line graph" content="Let's digitize the undigital!" style={{fontFamily : 'GE Inspira Sans', fontSize : "50pt"}} />
                        </Grid.Row>
                        <Grid.Row>
                            <Header style={{fontFamily : 'GE Inspira Sans', fontSize : "15pt"}}>One stop solution to analyze and manage water resources</Header>
                        </Grid.Row>
                        <Grid.Row>
                            {/* <a href="http://aqua-analytica-bengaluru.herokuapp.com/home" ><button className='button-home'>Get Started <span><Icon name={'arrow right'}/></span></button></a> */}
                            <Link to="/dashboard"><button className='button-home'>Get Started <span><Icon name={'arrow right'}/></span></button></Link>
                        </Grid.Row>
                    </Grid>
                    <div style={{position : "fixed", bottom : "0", right : "0"}}>
                        <Icon name='facebook' />
                        <Icon name='instagram'/>
                        <Icon name='facebook messenger' />
                        <Icon name='google' />
                        <Icon name='youtube' />
                        <Icon name='whatsapp' />
                        <Icon name='snapchat ghost' />
                        <Icon name='linkedin' />
                        <Icon name='twitter' />
                    </div>
                </Segment> 
            : undefined}
            </>
        )
    }
    
}

export default Home;
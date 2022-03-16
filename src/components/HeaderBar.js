import React from "react";
import { Grid, Header, Sticky } from 'semantic-ui-react';
import header from './images/header1.png';
import {Link} from "react-router-dom";
import Login from "./Login";

class HeaderBar extends React.Component{
    render(){
        return(
            <div style={{ width : "100%", height : "100px", backgroundImage : `url(${header})`, backgroundRepeat : "no-repeat", backgroundSize : "cover", top : 0, position : "sticky", zIndex : "2"}}>
                <Grid style={{padding : "20px 20px 20px 20px"}}>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Link to="/home"><Header style={{fontFamily : 'GE Inspira Sans', fontSize : "30pt"}}>AQUA ANALYTICA</Header></Link>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Link to="/home"><button className='button-home'> Home </button></Link>
                            <Login />
                            <Link to="/contact"><button className='button-home'> Contact </button></Link>
                            <Link to="/about"><button className='button-home'>About</button></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default HeaderBar;
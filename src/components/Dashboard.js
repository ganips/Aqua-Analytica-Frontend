import React from 'react';
import { Grid, Header, Segment, Statistic, Icon, Select, Dropdown, Loader } from 'semantic-ui-react';
import HeaderBar from './HeaderBar';
import { GMap } from 'primereact/gmap';
import { Chart } from 'primereact/chart';
import { CircularProgressbar } from 'react-circular-progressbar';
import { connect } from 'react-redux';
import {setUserDetails} from '../action/getWardDataAction';
import Skeleton from '@mui/material/Skeleton';

class Dashboard extends React.Component{

    state ={
        loading : true
    }

    // componentDidMount(){
    //     this.setData()
    // }

    setData = (ward) => {
        this.props.setUserDetails(ward)
        .then(() => {
            if(this.props.data != null){
                this.setState(this.props.data)
                this.setState({ loading : false })
            }
            else{
                this.setState({ loading : true })
            }
        });
    }

    render(){
        this.mapOptions = {
            center : this.state.map ? {lat : parseFloat(this.state.map[0]), lng : parseFloat(this.state.map[1])} : undefined,
            zoom: 12
        };
        this.areaOptions = [
            { key: 'a', value: 'Bangalore South', text: 'Bangalore South' },
            { key: 'b', value: 'b', text: 'North' },
            { key: 'c', value: 'c', text: 'Basavanagudi' },
        ]
        this.relconData = {
            labels: this.state.legend_1 ? this.state.legend_1 : undefined,
            datasets: [
                {
                    label: 'Release',
                    data: this.state.release ? this.state.release : undefined,
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'Consumption',
                    data: this.state.consumption ? this.state.consumption : undefined,
                    fill: false,
                    borderColor: '#FFA726',
                    tension: .4
                }
            ]
        };
        this.connectionsData= {
            labels: this.state.legend_1 ? this.state.legend_1 : undefined,
            datasets: [
                {
                    label: 'No. of Connections',
                    data: this.state.connections ? this.state.connections : undefined,
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                }
            ]
        }
        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        this.indconData = {
            labels: this.state.legend_1 ? this.state.legend_1 : undefined,
            datasets: [
                {
                    label: 'Individual consumption per day',
                    borderColor: '#FFA726',
                    pointBackgroundColor: '#FFA726',
                    data: this.state.ind_consumption ? this.state.ind_consumption : undefined
                }
            ]
        };

        this.radarOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    pointLabels: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                    angleLines: {
                        color: '#ebedef'
                    }
                }
            }
        };
        this.chartData = {
            labels: this.state.legend_2 ? this.state.legend_2 : undefined,
            datasets: [{
                type: 'bar',
                label: 'Demand Forecast',
                backgroundColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                tension: .4,
                data: this.state.demand ? this.state.demand : undefined
            }, {
                type: 'bar',
                label: 'Potential Savings',
                backgroundColor: '#FFA726',
                data: this.state.savings ? this.state.savings : undefined
            }]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.handleChange = (e, { name, value }) => {
            this.setState({ [name] : value })
            this.setData(value)
        }

        return(
                <>
                <HeaderBar />
                <center><Dropdown name='ward' value={this.state.ward} onChange={this.handleChange} options={this.areaOptions} style={{marginTop : "30px", marginBottom : "10px", width : "500px"}} selection placeholder='Select region' /></center>
                <br />
                {this.state.loading ? 
                    <>
                    <Segment basic textAlign='center'>
                        <Grid textAlign='center'>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Skeleton variant='rectangle' height={120}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Skeleton variant='rectangle' height={120} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Skeleton variant='rectangle' height={120}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Skeleton variant='rectangle' height={120} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column width={8}>
                                    <Skeleton variant='rectangle' height={300}/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Skeleton variant='rectangle' height={300} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Skeleton variant='rectangle' height={150}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    </>
                :
                    <>
                    <Grid style={{padding : "10px 30px 10px 30px"}}>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <Segment padded textAlign='center' raised inverted style={{backgroundColor : "#1a75ff", border : "none", borderRadius : "15px"}}>
                                    <Statistic size='large' inverted>
                                        <Statistic.Label style={{fontFamily : "GE Inspira Sans"}}>Consumption</Statistic.Label>
                                        <Statistic.Value style={{fontFamily : "GE Inspira Sans"}}>{this.state.water_consumption ? this.state.water_consumption : undefined} ML</Statistic.Value>
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment padded textAlign='center' raised inverted style={{backgroundColor : "#3385ff", border : "none", borderRadius : "15px"}}>
                                    <Statistic size='large' inverted>
                                        <Statistic.Label style={{fontFamily : "GE Inspira Sans"}}>Release</Statistic.Label>
                                        <Statistic.Value style={{fontFamily : "GE Inspira Sans"}}>{this.state.water_release ? this.state.water_release : undefined} ML</Statistic.Value>
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment padded textAlign='center' raised inverted style={{backgroundColor : "#4d94ff", border : "none", borderRadius : "15px"}}>
                                    <Statistic size='large' inverted>
                                        <Statistic.Label style={{fontFamily : "GE Inspira Sans"}}>Connections</Statistic.Label>
                                        <Statistic.Value style={{fontFamily : "GE Inspira Sans"}}>{this.state.connections ? this.state.connections[this.state.connections.length - 1] : undefined}</Statistic.Value>
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment padded textAlign='center' raised inverted style={{backgroundColor : "#0066ff", border : "none", borderRadius : "15px"}}>
                                    <Statistic size='large' inverted>
                                        <Statistic.Label style={{fontFamily : "GE Inspira Sans"}}>Potential Savings</Statistic.Label>
                                        <Statistic.Value style={{fontFamily : "GE Inspira Sans"}}>{this.state.save ? this.state.save : undefined} ML</Statistic.Value>
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid textAlign='center'>
                        <Grid.Row columns={2}>
                            <Grid.Column width={8}>
                                <Segment padded raised style={{borderStyle: "groove", borderWidth : "2px", borderColor : "#3385ff", height : "600px"}}>
                                    <GMap options={this.mapOptions} style={{width: '100%', height : "100%"}} />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment padded raised style={{borderStyle: "groove", borderWidth : "2px", borderColor : "#3385ff", height : "600px"}} textAlign='center'>
                                    <Header style={{fontFamily : "GE Inspira Sans", fontSize : "20pt"}} color="blue">NRW</Header>
                                    <CircularProgressbar value={36.4} text={this.state.nrw ? this.state.nrw : undefined}/>
                                    <span>
                                        <Header style={{fontFamily : "GE Inspira Sans", fontSize : "15pt", marginTop : "20px"}} color="blue"><Icon name='street view' />Area : {this.state.area ? this.state.area : undefined} sqkm</Header>
                                        <Header style={{fontFamily : "GE Inspira Sans", fontSize : "15pt"}} color="blue"><Icon name='users' />Population : {this.state.population ? this.state.population : undefined}</Header>
                                    </span>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={12}>   
                                <Segment padded raised style={{borderStyle: "groove", borderWidth : "2px", borderColor : "#3385ff"}} >
                                    <Header style={{fontFamily : "GE Inspira Sans", fontSize : "15pt"}} color="blue">Release and Consumption(in million litres)</Header>
                                    <Chart type="line" data={this.relconData} options={this.lineOptions} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column width={6}>
                                <Segment padded raised style={{borderStyle: "groove", borderWidth : "2px", borderColor : "#3385ff"}} textAlign='center'>
                                    <Header style={{fontFamily : "GE Inspira Sans", fontSize : "15pt"}} color="blue">Individual Consumption per Day(in litres)</Header>
                                    <Chart type="radar" data={this.indconData} options={this.radarOptions} style={{ width: '100%'}} />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Segment padded raised style={{borderStyle: "groove", borderWidth : "2px", borderColor : "#3385ff"}} textAlign='center'>
                                    <Header style={{fontFamily : "GE Inspira Sans", fontSize : "15pt"}} color="blue">Connections</Header>
                                    <Chart type="line" data={this.connectionsData} options={this.lineOptions} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={12}>   
                                <Segment padded raised style={{borderStyle: "groove", borderWidth : "2px", borderColor : "#3385ff"}}>
                                    <Header style={{fontFamily : "GE Inspira Sans", fontSize : "15pt"}} color="blue">Future Demand(in million litres)</Header>
                                    <Chart type="bar" data={this.chartData} options={this.chartOptions} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.warddata.data ? state.warddata.data : null
    }
}

export default connect(mapStateToProps, {setUserDetails})(
    Dashboard
);
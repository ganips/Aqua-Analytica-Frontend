import React from 'react';
import logo from './logo.png';
import { Segment, Header, Menu, Button, Image, Icon } from 'semantic-ui-react';
import {Bar, Line } from 'react-chartjs-2';
import Profile from './Profile';
import Tables from './Table ';
import axios from 'axios';
import { connect } from 'react-redux';

class Traders extends React.Component{

    state = {
        activeItem  : 'profile',
    }

    componentDidMount(){
        axios.post('http://localhost:8080/api/custom.php', {query : "select year(sales_date),month(sales_date),count(*) from sales group by year(sales_date),month(sales_date) order by year(sales_date),month(sales_date)"}).then(response => response.data)
        .then((data) => {
            var values = []
            data.map((item) => {
                values.push(item['count(*)'])
            })
            this.setState({ bar : values })
        })
        axios.post('http://localhost:8080/api/custom.php', {query : "select products.category,count(*) from sales left join products on sales.products_id=products.id group by category,year(sales_date),month(sales_date) order by category,year(sales_date),month(sales_date)"}).then(response => response.data)
        .then((data) => {
            var values = {}
            var category = []
            var count = []
            data.map((item) => {
                category.push(item['category'])
                count.push(item['count(*)'])
            })
            values = {category, count}
            this.setState({ line : values })
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    refresh = () => this.setState({ activeItem: 'profile' })

    render(){
        const { activeItem } = this.state
        const line = { 
            labels: this.state.line ? this.state.line.category : null,
            datasets: [
                {
                    label: 'Total Sales based on category of products',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.line ? this.state.line.count : null
                },
            ]
        }
        const bar = { 
            labels: ['August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Total Sales per month',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.bar
                },
            ]
        }
        const products = ['id', 'name', 'category', 'description', 'trader', 'amount']
        return(
            <Segment inverted style={{ height : '100vh', margin : '0px'}}>
            <Segment style={{ height : '100px', marginTop : '0'}}>
                <div style={{float : 'left'}}>
                    <Header style={{ fontFamily : 'GE Inspira Sans', fontSize : '30pt'}}>
                        <Image circular src={logo} /> FRESH POINT
                    </Header>
                </div>
                <div style={{float: 'right', marginTop : '15px', fontFamily : 'GE Inspira Sans', fontSize : '20pt', color : 'green'}}>
                    Welcome Back {this.props.user} !!!
                    <Button positive compact size='big' style={{marginLeft : '30px'}} onClick={() => {localStorage.clear(); window.location.reload(false)}}>Logout</Button>
                </div>
            </Segment>
            <div style={{width : 'fit-content'}}>
                <Menu inverted secondary size='huge' style={{fontFamily : 'GE Inspira Sans'}}>
                    <Menu.Item
                        name='profile'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='sales'
                        active={activeItem === 'sales'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='products'
                        active={activeItem === 'products'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </div>
            <Segment style={{height : '630px'}}>
                {this.state.activeItem === 'sales' ? 
                    <Segment.Group horizontal>
                        <Segment basic style={{width : '800px'}}>
                            <Bar data={bar}
                                options={{ 
                                    title: { 
                                        display:true, 
                                        text:'Average Rainfall per month', 
                                        fontSize:20 
                                    }, 
                                    maintainAspectRatio: false,
                                    legend:{ 
                                        display:true,
                                        position:'right'
                                    }
                                }}
                                height={530}
                            />
                        </Segment>
                        <Segment basic>
                            <Line data={line}
                                options={{ 
                                    title: { 
                                        display:true, 
                                        text:'Total Sales', 
                                        fontSize:20 
                                    }, 
                                    maintainAspectRatio: false,
                                    legend:{ 
                                        display:true,
                                        position:'right'
                                    }
                                }}
                                height={530}
                            />
                        </Segment>
                    </Segment.Group>
                :
                    undefined
                }
                {this.state.activeItem === 'profile' ? 
                    <Profile user={this.props.user} name='traders'/>
                :
                    undefined
                }
                { this.state.activeItem === 'products' ? 
                    <Tables table='products' name='traders' header={products} user_name={this.props.user}/>
                :
                    undefined
                }
            </Segment>
            
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : localStorage.name,
        users : state.user.user_details
    }
}

export default connect(mapStateToProps)(Traders);
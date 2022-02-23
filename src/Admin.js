import React from 'react';
import logo from './logo.png';
import { Segment, Header, Menu, Button, Image, Icon } from 'semantic-ui-react';
import {Bar, Doughnut, Line } from 'react-chartjs-2';
import Tables from './Table ';
import { connect } from 'react-redux';
import Orders from './orders';
import axios from 'axios';

class Admin extends React.Component{

    state = {
        activeItem  : 'sales',
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
        axios.post('http://localhost:8080/api/custom.php', {query : "select year(sales_date),month(sales_date),sum(amount) from sales group by year(sales_date),month(sales_date) order by year(sales_date),month(sales_date)"}).then(response => response.data)
        .then((data) => {
            var values = []
            data.map((item) => {
                values.push(item['sum(amount)'])
            })
            this.setState({ transaction1 : values })
        })
        axios.post('http://localhost:8080/api/custom.php', {query : "select products.category,sum(sales.amount) from sales left join products on sales.products_id=products.id group by category,year(sales_date),month(sales_date) order by category,year(sales_date),month(sales_date)"}).then(response => response.data)
        .then((data) => {
            var values = {}
            var category = []
            var count = []
            data.map((item) => {
                category.push(item['category'])
                count.push(item['sum(sales.amount)'])
            })
            values = {category, count}
            this.setState({ transaction2 : values })
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    refresh = () => this.setState({ activeItem: 'sales' })

    render(){
        console.log(this.state)
        const { activeItem } = this.state
        const line = { 
            labels: this.state.line ? this.state.line.category : null,
            datasets: [
                {
                    label: 'Total Sales sorted based on Date',
                    backgroundColor: 'teal',
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
                    label: 'Total Sales sorted based on Category',
                    backgroundColor: 'gray',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.bar
                },
            ]
        }
        const transaction1 = {
            labels: ['August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
                    hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
                    data: this.state.transaction1
                }
            ]
        }
        const transaction2 = {
            labels: this.state.transaction2 ? this.state.transaction2.category : null,
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
                    hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
                    data: this.state.transaction2 ? this.state.transaction2.count : null
                }
            ]
        }
        const products = ['id', 'name', 'category', 'description', 'trader', 'amount']
        const transactions = ['id', 'product', 'amount', 'category', 'sales_date']
        const traders = ['id', 'name', 'email', 'age', 'gender', 'profession', 'address', 'active']
        const customers = ['id', 'name', 'email', 'age', 'gender', 'address']
        return(
            <Segment inverted style={{ height : '100vh', margin : '0px'}}>
            <Segment style={{ height : '100px', marginTop : '0'}}>
                <div style={{float : 'left'}}>
                    <Header style={{ fontFamily : 'GE Inspira Sans', fontSize : '30pt'}}>
                        <Image circular src={logo} /> FRESH POINT
                    </Header>
                </div>
                <div style={{float: 'right', marginTop : '15px', fontFamily : 'GE Inspira Sans', fontSize : '20pt', color : 'green'}}>
                    ADMIN
                    <Button positive compact size='big' style={{marginLeft : '30px'}} onClick={() => {localStorage.clear(); window.location.reload(false)}}>Logout</Button>
                </div>
            </Segment>
            <div style={{width : 'fit-content'}}>
                <Menu inverted secondary size='huge' style={{fontFamily : 'GE Inspira Sans'}}>
                    <Menu.Item
                        name='sales'
                        active={activeItem === 'sales'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='transactions'
                        active={activeItem === 'transactions'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='traders'
                        active={activeItem === 'traders'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='customers'
                        active={activeItem === 'customers'}
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
                        <Segment basic>
                            <Line data={line}
                                options={{ 
                                    title: { 
                                        display:true, 
                                        text:'Sales per Category of Products', 
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
                {this.state.activeItem === 'transactions' ?
                    <Segment.Group horizontal>
                        <Segment.Group style={{height : '530px', width : '500px'}}>
                            <Segment basic>
                                <Doughnut data={transaction1}
                                    options={{ 
                                        title: { 
                                            display:true, 
                                            text:'Total Revenue generated per month', 
                                            fontSize:20 
                                        }, 
                                        maintainAspectRatio: false,
                                        legend:{ 
                                            display:true,
                                            position:'right'
                                        }
                                    }}
                                    height={230}
                                />
                            </Segment>
                            <Segment basic>
                                <Doughnut data={transaction2}
                                    options={{ 
                                        title: { 
                                            display:true, 
                                            text:'Total Revenue per Category of Product', 
                                            fontSize:20 
                                        }, 
                                        maintainAspectRatio: false,
                                        legend:{ 
                                            display:true,
                                            position:'right'
                                        }
                                    }}
                                    height={230}
                                />
                            </Segment>
                        </Segment.Group>
                        <Segment basic>
                            <Orders admin='admin' />
                        </Segment>
                    </Segment.Group>
                :
                    undefined
                }
                { this.state.activeItem === 'products' ? 
                    <Tables table='products' header={products} />
                :
                    undefined
                }
                { this.state.activeItem === 'traders' ? 
                    <Tables table='traders' header={traders} />
                :
                    undefined
                }
                { this.state.activeItem === 'customers' ? 
                    <Tables table='customers' header={customers} />
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
        users : state.user.user_details
    }
}

export default connect(mapStateToProps)(Admin);
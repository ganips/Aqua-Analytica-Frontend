import React from 'react';
import { Button, Icon, Table, Radio, Segment, Loader, Dimmer } from 'semantic-ui-react';
import axios from 'axios';
import Modalv1 from './Modal';

class Tables extends React.Component{
    state = {
        values : [],
        header : this.props.header,
        row : undefined,
        traders : [],
        loader : true,
    }

    componentDidMount(){
        const url = 'http://localhost:8080/api/' + this.props.table + '.php'
        axios.get(url).then(response => response.data)
        .then((row) => { 
            axios.get('http://localhost:8080/api/traders.php').then(response => response.data)
            .then((data) => { 
                this.setState({ traders : data })
                if(this.props.name === 'traders'){
                    var id;
                    var items = []
                    data.map((item) => {
                        if(item['name'] === this.props.user_name){
                            id = item['id']
                        }
                    })
                    row.map((item) => {
                        if(item['traders_id'] === id){
                            items.push(item)
                        }
                    })
                    this.setState({ values : items })
                }
                else{
                    this.setState({ values : row })
                }
            })
        })
        setTimeout(() => this.setState({ loader : false }), 1000);
    }

    onRowSelect = (e, {value}) => this.setState({ row : value })

    refresh = () => {
        this.setState({values : [], row : undefined, traders : [], loader : true})
        this.componentDidMount()
    }


    render(){
        console.log(this.state)
        if(this.state.loader){
            return  <Segment basic style={{marginTop : '200px'}}>
                        <Dimmer active inverted>
                            <Loader size='big'>Getting Data....</Loader>
                        </Dimmer>
                    </Segment>
        }
        else{
            return(
                <>
                <Button.Group style={{fontFamily : 'GE Inspira Sans', marginBottom : '10px'}} floated='right' size='large'>
                    <Modalv1 name='Create' disabled={this.props.table === 'products' || this.props.table === 'traders' || this.props.table === 'customers' && this.props.name !== 'traders' ? true : false} type='create' color='teal' user={this.props.table} user_name={this.props.user_name}/>
                    <Modalv1 name='Update' disabled={!this.state.row} data={this.state.row} type='update' color='gray' user={this.props.table} user_name={this.props.user_name}/>
                    <Modalv1 name='Delete' disabled={!this.state.row} data={this.state.row} type='delete' color='gray' user={this.props.table} user_name={this.props.user_name}/>
                    <Button animated='vertical' color='teal' onClick={this.refresh}>
                        <Button.Content hidden><Icon name='sync'/></Button.Content>
                        <Button.Content visible>Refresh</Button.Content>
                    </Button>
                </Button.Group>
                <br />
                <br />
                <br />
                <div style={{height : '500px', overflow : 'auto'}}>
                <Table celled fixed singleline textAlign='center' style={{fontFamily : 'GE Inspira Sans'}}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Select</Table.HeaderCell>
                        {this.state.header.map((name) => {
                            return <Table.HeaderCell>{name}</Table.HeaderCell>
                        })}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.values.map((value) => {
                            return <Table.Row>
                                <Table.Cell><Radio value={value} checked={this.state.row ? value.id === this.state.row['id'] ? true : false : false} onChange={this.onRowSelect} /></Table.Cell>
                                {this.state.header.map((name) => {
                                    var id;
                                    if(name === 'trader' && this.props.table === 'products'){
                                        this.state.traders.map((row) => {
                                            if(row['id'] === value['traders_id']){
                                                id = row['name']
                                            }
                                        })
                                        return <Table.Cell>{id}</Table.Cell>
                                    }
                                    else if(name === 'active' && this.props.table === 'traders'){
                                        return  <Table.Cell>
                                                    <Button color={value['active'] === "0" ? 'green' : 'red'}>{value['active'] === "0" ? 'Activate' : 'Deactivate'}</Button>
                                                </Table.Cell>
                                    }
                                    else{
                                        return <Table.Cell>{value[name]}</Table.Cell>
                                    }
                                })}
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
                {this.state.values.length === 0 ? <p style={{fontFamily : 'GE Inspira Sans', fontSize : '18pt', color : 'Highlight'}}><strong><center>No items in the Cart</center></strong></p> : undefined}
                </div>
                </>
            )
        }
    }
}

export default Tables;
import React from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends React.Component {
    state = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }
    
	render() {
        return (
            <div style={{height : '200px'}}>
                <Bar data={this.state}
                    options={{ 
                        title: { 
                            display:true, 
                            text:'Average Rainfall per month', 
                            fontSize:20 
                        }, 
                        legend:{ 
                            display:true,
                            position:'right'
                        }
                    }}
                    height='100px'
                />
            </div>
        );
            
    }
}
export default Chart;
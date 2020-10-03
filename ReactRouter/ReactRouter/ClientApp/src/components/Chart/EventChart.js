import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import axios from "axios";
import { Animation } from '@devexpress/dx-react-chart';
import { Line } from 'react-chartjs-2'


export default function EventChart() {
    const [rows,updateRows] = useState([]);
    const [chartInfo, updateChartInfo] = useState([]);


    useEffect(() => {
        axios.get("/students")
            .then(response => {
                updateRows(response.data)
            })
        let newChartInfo = [];
        let myRows = rows;
        for (let i = 0; i < myRows.length; i++) {
            axios.get("/students/" + myRows[i].studentNumber + "/books")
                .then(response => {
                    newChartInfo[i] = { title: myRows[i].studentNumber, peopleSize: response.data }
                    if (i === myRows.length - 1) {
                        updateChartInfo(newChartInfo);
                    }
                })
        }
    })

    return (
        <Paper>
            <Chart
                data={chartInfo}
            >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                    valueField="participant"
                    argumentField="event"
                />
                <Title text="Distribution of Participants" />
                <Animation />
            </Chart>
        </Paper>
    );
        
 }










//export default function EventChart() {
//    const data = {
//        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//        datasets: [
//            {
//                label: 'sales',
//                data: [3,2,3,2,3,2]
//            }
//        ]
//    }
//    return <Line data={ data}/>
//}













//import axios from "axios";
//import React, { Component } from "react";
//import DialogTitle from "@material-ui/core/DialogTitle";
//import DialogActions from "@material-ui/core/DialogActions";
//import Button from "@material-ui/core/Button";
//import Dialog from "@material-ui/core/Dialog";
//import Paper from '@material-ui/core/Paper';
//import {
//    Chart,
//    ArgumentAxis,
//    ValueAxis,
//    BarSeries,
//    LineSeries,
//    Legend,
//} from '@devexpress/dx-react-chart-material-ui';
//import { ValueScale } from '@devexpress/dx-react-chart';
//import DialogContent from "@material-ui/core/DialogContent";

//class EventChart extends Component {
//    state = {
//        rows: [],
//        chartInfo: []
//    }

//    componentDidMount() {
//        axios.get("/students")
//            .then(response => {
//                this.setState({rows: response.data})
//            })
//    }

//    onDisplayChart = () => {
//        let newChartInfo = [];
//        let myRows = this.state.rows;
//        console.log(myRows.length);
//        for (let i = 0; i < myRows.length; i++) {
//            axios.get("/students/" + myRows[i].studentNumber + "/books")
//                .then(response => {
//                    newChartInfo[i] = { title: myRows[i].studentNumber, peopleSize: response.data }
//                    if (i === myRows.length - 1) {
//                        this.setState({
//                            chartInfo: newChartInfo
//                        })
//                    }
//                })
//        }
//    }

//    render() {
//        return (

//            <Paper>
//                <Chart
//                    data={this.state.chartInfo}
//                >
//                    <ValueScale name="peopleSize" />

//                    <ArgumentAxis />
//                    <ValueAxis scaleName="peopleSize" showLine showTicks />

//                    <BarSeries
//                        name="Participant Numbers"
//                        valueField="peopleSize"
//                        argumentField="title"
//                        scaleName="peopleSize"
//                    />

//                    <Legend />
//                </Chart>
//            </Paper> 
//        )    
//    }
//}

//export default EventChart
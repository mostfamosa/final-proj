import React from "react";
import { Line } from 'react-chartjs-2'



const BarChart2 = (props) => {

    const chartData2 = props.mydata;
    console.log("aaaaaaaaaaa");
    console.log(chartData2);
    return <div>
        <Line
            data={{
                labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM"],
                datasets: [
                    {
                        label: 'Sensor 1',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(5, 70, 240,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 2',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(75,56,210,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 3',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(90,50,200,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 4',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(90,49,200,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 5',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(115,42,190,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 6',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(140,35,180,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 7',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(165,28,170,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 8',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(180,21,160,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 9',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(205,14,150,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Sensor 10',
                        data: chartData2.splice(0,20),
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(250, 7, 140,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                ]
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20,
                                borderColor: "rgb(255,255,255)"
                            },
                            color: "rgb(255,255,255)"
                        }
                    }
                },


            }}
        />


    </div>
}
export default BarChart2
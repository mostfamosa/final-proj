import React from "react";
import { Line } from 'react-chartjs-2'
const BarChart = (props) => {

    const chartData = props.mydata;

    return <div>
        <Line
            data={{
                labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM"],
                datasets: [
                    {
                        label: 'Temperature Change Observed',
                        data: chartData,
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(250,50,50,1)',
                        backgroundColor: "rgba(255,255,255,1)",
                        yAxesID: 'yAxes',
                    },
                ]
            }}
            height={500}
            width={600}
            options={{
                scales: {
                    y: {
                        id: 'yAxes',
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            gridLines: {
                                color: "rgb(210,210,211)"
                            },
                        },
                        max: 400,
                        min: 0,
                        ticks: {
                            stepValue: 50,
                            beginAtZero: true,
                        }
                    },
                },
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
export default BarChart
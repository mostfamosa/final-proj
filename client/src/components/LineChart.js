import React from "react";
import { Line } from 'react-chartjs-2'
const BarChart = (props) => {

    const chartData = props.mydata;
    //chartData.push(10);




    return <div>
        <Line
            data={{
                labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM"],
                datasets: [
                    {
                        label: 'Temperature Change Observed',
                        data: chartData,
                        fill: false,
                        tension: 0.2,
                        borderColor: 'rgba(250,50,50,1)',
                        backgroundColor: "rgba(255,255,255,1)"
                    },
                    {
                        label: 'Temperature Change Expected',
                        data: [10, 9, 7, 60, 18, 10, 9, 7, 60, 18, 10, 9, 7, 60, 18,],
                        fill: false,
                        tension: 0.2,
                        backgroundColor: "rgba(255,255,255,1)",
                        borderColor: "rgba(50,150,255,1)"
                    }
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
export default BarChart
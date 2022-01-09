import React from "react";
import { Line } from 'react-chartjs-2'


//get data with props and dynamiclly process the data and show it in graph
//we use this component to show all the sensors in one graph
const BarChart2 = (props) => {

    const chartData2 = props.mydata;
    const sensorsAmount = props.sensorsCount;
    console.log("aaaaaaaaaaa");
    console.log(chartData2);
    var mydataSet = [];
    let r = 5, g = 70, b = 240;
    for (let index = 1; index <= sensorsAmount; index++) {
        let temp = chartData2.splice(0, 20);
        mydataSet.push({
            label: 'Sensor ' + index,
            data: temp,
            fill: false,
            tension: 0.2,
            borderColor: 'rgba(' + r + ', ' + g + ', ' + b + ',1)',
            backgroundColor: "rgba(255,255,255,1)"
        });
        r += (250 - 5) / sensorsAmount;
        g -= (70 - 7) / sensorsAmount;
        b -= (240 - 140) / sensorsAmount;
    }
    console.log("ssssssssssss");
    console.log(mydataSet);

    return <div>
        <Line
            data={{
                labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM"],
                datasets: mydataSet
            }}
            height={800}
            width={600}
            options={{
                y: {
                    max: 400,
                    min: 0,
                    ticks: {
                        stepValue: 50,
                        beginAtZero: true,
                    }
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
export default BarChart2
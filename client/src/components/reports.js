import React, { useState, useEffect } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './reportPage.css'
import LineChart2 from './LineChart2'
import ProgressFile from './progressfile'


function Reports() {
    const [isLoading, setIsLoading] = useState(true);
    const [chartsData2, setChart2] = useState([]);
    const [reportsList2] = useState([]);

    let mychartsData = [];

    useEffect(() => {
        fetch('https://buildtech-final-project-default-rtdb.firebaseio.com/results.json'
        ).then(response => {
            return response.json();
        }).then((data) => {


            for (const key in data) {
                mychartsData.push({
                    id: key,
                    ...data[key]
                });
                console.log(mychartsData);
            }
            for (let index = 0; index < mychartsData.length; index++) {
                reportsList2.push(<div key={index} className='item3'><h2>{mychartsData[index].resultTime}</h2><h2>Changing of Temperature in {mychartsData[index].sensorNumber}</h2><div className="graph"><LineChart2 mydata={mychartsData[index].result[0]} sensorsCount={(mychartsData[index].result[0].length) / 20} /></div></div>);
            }
            setChart2(reportsList2);
        });


        setIsLoading(false);
        // eslint-disable-next-line
    }, [])


    if (isLoading) {
        return (
            <ProgressFile />
        );
    }
    return (
        <div className='container pa4 tc'>
            <img className='f1' src={logo} alt='App logo' />
            <h2 className='f1 i serif black'>Reports</h2>
            {chartsData2}
            <p className='ph3 pa6'>
                <Link to="" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
            </p>
        </div>
    );

}
export default Reports;
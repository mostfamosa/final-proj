import React, { Component, useState,useEffect } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './reportPage.css'
import LineChart from './LineChart'
import ProgressFile from './progressfile'


function ReportPage() {
  const [message] = useState("");
  //const [chartData, setChartData] = useState([12, 9, 5, 77, 22, 12, 9, 5, 77, 22, 12]);
  const [chartData, setChartData] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  


  useEffect(()=>{
    setIsLoading(true);
    fetch('https://buildtech-final-project-default-rtdb.firebaseio.com/sensors.json'
    ).then(response=>{
      return response.json();
    }).then(data =>{

      const myTempData =[];

      for (const key in data) {
        const temps ={
          id : key,
          ...data[key]
        };
        for (let index = 0; index < data[key].length; index++) {
          myTempData.push(temps[index].Temp);          
        }
      }

      setIsLoading(false);
      setChartData(myTempData);
    });

  },[]);
  

if(isLoading){
  return (
<ProgressFile/>
  );
}

  return (
    <div className='container pa4 tc'>
      <img className='f1' src={logo} alt='App logo' />
      <h2 className='f1 i serif black'>Report Page</h2>

      <div className="graph">
        <LineChart mydata={chartData} />
      </div>
      <p className='ph3 pa6'>
        <Link to="" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
      </p>
    </div>
  );

}
export default ReportPage;
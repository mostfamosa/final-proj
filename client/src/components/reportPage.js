import React, { useState, useEffect } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './reportPage.css'
import LineChart from './LineChart'
import ProgressFile from './progressfile'
import Select from 'react-select'


function ReportPage(props) {
  const [chartData, setChartData] = useState([]);
  const [mypileid] = useState(props.myprops);
  const [serverData] = useState(props.serverData)
  const [isLoading, setIsLoading] = useState(true);
  const [myTempData,setmyTempData] = useState([]);
  const [myTempDataforEachSensor] = useState([]);
  const [myNEWTempDataforEachSensor] = useState([]);
  let Sensoroptions = [];
  
  sensonrsInt(10);//change to moose

  function sensonrsInt(sensorsNumber) {
    for (let index = 1; index <= sensorsNumber; index++) {
        Sensoroptions.push({ value: index, label: index });
    }
}

  const init = () => {
    for (let index = 0; index < serverData.length; index++) {
      for (let index2 = 0; index2 < serverData[index].length; index2++) {

        myTempDataforEachSensor.push(serverData[index][index2]);
      }
    }
    console.log("myTempDataforEachSensor")
    console.log(myTempDataforEachSensor)

  }

  useEffect(() => {
    init();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const inoptionHandler = (event) =>{
    let getsensornumber=event.value;
    setmyTempData([]);
    for (let index = getsensornumber-1; index < myTempDataforEachSensor.length; index+=10) {
      
      myTempData.push(parseFloat(myTempDataforEachSensor[index][2]));
      
    }
    console.log("myTempData");
    console.log(myTempData);
    const resultData = {
      resultTime: Date().toLocaleString(),
      result: [myTempData],
      sensorNumber:event.value
    };
    fetch('https://buildtech-final-project-default-rtdb.firebaseio.com/results.json'
      , {
        method: 'POST',
        body: JSON.stringify(resultData),
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
    setChartData(myTempData);

}



  if (isLoading) {
    return (
      <ProgressFile />
    );
  }

  return (
    <div className='container pa4 tc'>
      <img className='f1' src={logo} alt='App logo' />
      <h2 className='f1 i serif black'>Report Page</h2>
      <div className='ma5 w-50 item2'>
        <Select options={Sensoroptions} onChange={inoptionHandler} placeholder="Sensor Number :" id='sensorAmount' className='item' />
      </div>
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
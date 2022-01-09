import React, { useState, useEffect } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './reportPage.css'
import LineChart from './LineChart'
import LineChart2 from './LineChart2'
import ProgressFile from './progressfile'
import Select from 'react-select'

//functional component that show you the graph of selected sensor temperatue to time and save the results in firebase
function ReportPage(props) {
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [pileDefect] = useState(props.pileDefect);
  const [serverData] = useState(props.serverData);
  const [isLoading, setIsLoading] = useState(true);
  const [myTempData, setmyTempData] = useState([]);
  const [myTempData2] = useState([]);
  const [myTempDataforEachSensor] = useState([]);
  let Sensoroptions = [];

  sensonrsInt(serverData[0].length);

  function sensonrsInt(sensorsNumber) {
    for (let index = 1; index <= sensorsNumber; index++) {
      Sensoroptions.push({ value: index, label: index });
    }
  }

  const init = () => {
    for (let index = 0; index < serverData.length; index++) {
      for (let index2 = 0; index2 < serverData[0].length; index2++) {

        myTempDataforEachSensor.push(serverData[index][index2]);
      }
    }
    console.log("myTempDataforEachSensor")
    console.log(myTempDataforEachSensor)
  }

  const init2 = () => {
    for (let index = 0; index < serverData[0].length; index++) {
      for (let index2 = index; index2 < myTempDataforEachSensor.length; index2 += serverData[0].length) {
        myTempData2.push(parseFloat(myTempDataforEachSensor[index2][2]));
      }
    }
    var comment = "All Sensors";
    if (pileDefect === 'y')
      comment = "All Sensors With Defect";
    else
      comment = "All Sensors";
    const resultData2 = {
      resultTime: Date().toLocaleString(),
      result: [myTempData2],
      sensorNumber: comment
    };
    fetch('https://buildtech-final-project-default-rtdb.firebaseio.com/results.json'
      , {
        method: 'POST',
        body: JSON.stringify(resultData2),
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
    console.log("myTempData2");
    console.log(myTempData2);
    setChartData2(myTempData2);

  }

  useEffect(() => {
    init();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const inoptionHandler = (event) => {
    let getsensornumber = event.value;
    setmyTempData([]);
    for (let index = getsensornumber - 1; index < myTempDataforEachSensor.length; index += serverData[0].length) {

      myTempData.push(parseFloat(myTempDataforEachSensor[index][2]));

    }


    setChartData(myTempData);
    console.log("myTempData");
    console.log(myTempData);
    init2();
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
      <h3 className='f2 serif black'>Changing Temperature of All Sensors</h3>
      <div className="graph">
        <LineChart2 mydata={chartData2} sensorsCount={serverData[0].length} />
      </div>
      <p className='ph3 pa6'>
        <Link to="" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
      </p>
    </div>
  );

}
export default ReportPage;
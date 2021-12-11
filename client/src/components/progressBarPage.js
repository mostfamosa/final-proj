import React, { Component, useEffect, useState } from 'react'
import './SensorsInfo.css'
import './ProgressBar.css'
import ProgressFile from './progressfile'
import ReportPage from './reportPage'
import { useLocation} from 'react-router-dom'


function ProgressBarPage() {

  const location = useLocation()
  //const { pileId } = location.state

  const [redirect, setredirect] = useState(false);
  const [myServerData,setServerData]=useState([{}]);
  const [progressTime,setprogress]=useState(1000);




  useEffect(() => {

    setTimeout(() => {
      if(myServerData.length==1)
      {
        fetch("/calculateData").then(
              res=> res.json()
            ).then(
              data=>{
                  setServerData(data)
                  console.log(myServerData)
              }
          )
        console.log(myServerData);
        setprogress(progressTime+50);

      }
      else{
        console.log(myServerData);

        setredirect(true)
      }    
                
    }, progressTime);
  });


  return redirect ? <ReportPage myprops={22} /> : <ProgressFile />
}
export default ProgressBarPage;
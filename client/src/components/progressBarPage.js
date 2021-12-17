import React, { useEffect, useState } from 'react'
import './SensorsInfo.css'
import './ProgressBar.css'
import ProgressFile from './progressfile'
import ReportPage from './reportPage'
import { useLocation} from 'react-router-dom'



let mySensors = [{pileid: 12,id: 1,outsideTemp:23,x:1,y:1,z: 1,Temp:34,Status:true}];
function ProgressBarPage() {

  const location = useLocation()
  //const { pileId } = location.state

  const [redirect, setredirect] = useState(false);
  const [myServerData,setServerData]=useState([{}]);
  const [progressTime,setprogress]=useState(1000);

  const data=mySensors;


  useEffect(() => {

    setTimeout(() => {
      if(myServerData.length===1)
      {
        fetch("/calculateData"
        , {
          method: 'POST',
          body: JSON.stringify(mySensors),
          headers: {
              'Content-type': 'application/json'
          }
          }             
        ).then(
              res=> res.json()
            ).then(
              data=>{
                  setServerData(data)
                  console.log(myServerData)
              }
          )
        console.log("from server ");
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
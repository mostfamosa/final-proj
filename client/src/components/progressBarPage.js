import React, { useEffect, useState } from 'react'
import './SensorsInfo.css'
import './ProgressBar.css'
import ProgressFile from './progressfile'
import ReportPage from './reportPage'
import { useLocation} from 'react-router-dom'



function ProgressBarPage() {

  const location = useLocation()
  const { pileId ,mySensorsData} = location.state

  const [redirect, setredirect] = useState(false);
  const [myServerData,setServerData]=useState([{}]);
  const [progressTime,setprogress]=useState(1000);



  useEffect(() => {
    console.log("******")
    console.log(mySensorsData);
    setTimeout(() => {
      if(myServerData.length===1)
      {
        fetch("/calculateData"
        , {
          method: 'POST',
          body: JSON.stringify(mySensorsData),
          headers: {
              'Content-type': 'application/json'
          }
          }             
        ).then(
              res=> res.json()
            ).then(
              data=>{
                  setServerData(data)
                  console.log("the data recieved from server: ")
                  console.log(data)
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


  return redirect ? <ReportPage myprops={pileId} serverData={myServerData.data} /> : <ProgressFile />
}
export default ProgressBarPage;
import React, { useEffect, useState } from 'react'
import './SensorsInfo.css'
import './ProgressBar.css'
import ProgressFile from './progressfile'
import ReportPage from './reportPage'
import { useLocation } from 'react-router-dom'



function ProgressBarPage() {

  const location = useLocation()
  const { pileId, mySensorsData, pileheight, pileradius, piledefect } = location.state
  const [redirect, setredirect] = useState(false);
  const [myServerData, setServerData] = useState([{}]);
  const [progressTime, setprogress] = useState(1000);

  const toServer = { height: pileheight, radius: pileradius, Isdefect: piledefect };


  useEffect(() => {
    // console.log("******")
    // console.log(mySensorsData);
    setTimeout(() => {
      if (myServerData.length > 0) {
        fetch("/calculateData"
          , {
            method: 'POST',
            body: JSON.stringify(toServer),
            headers: {
              'Content-type': 'application/json',
              'Accept': 'application/json'
            }
          }
        ).then(
          res => res.json()
        ).then(
          data => {
            setServerData(data)
            console.log("the data recieved from server: ")
            console.log(data)
          }
        )
        setprogress(progressTime + 50);
      }
      else {
        console.log(myServerData);
        setredirect(true)
      }

    }, progressTime);
  }, [myServerData.length]);

  return redirect ? <ReportPage myprops={pileId} pileDefect={piledefect} serverData={myServerData.data} /> : <ProgressFile />
}
export default ProgressBarPage;
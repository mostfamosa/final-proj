import React, { Component, useEffect, useState } from 'react'
import './SensorsInfo.css'
import './ProgressBar.css'
import ProgressFile from './progressfile'
import ReportPage from './reportPage'
import { useLocation} from 'react-router-dom'


function ProgressBarPage() {

  const location = useLocation()
  const { pileId } = location.state

  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setredirect(true)   
                
    }, 1000);
  });

  console.log(redirect);
  return redirect ? <ReportPage myprops={pileId} /> : <ProgressFile />
}
export default ProgressBarPage;
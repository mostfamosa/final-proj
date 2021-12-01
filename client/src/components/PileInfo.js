import React, { Component, useEffect, useState,useRef } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import { Redirect,useHistory  } from 'react-router'
import Select from 'react-select'
import './PileInfo.css'
import { rand } from './helpFunc'

const Mixoptions = [{ value: 'regular', label: 'Regular' }]
const Soiloptions = [{ value: 'regular', label: 'Regular' }]



function PileInfo () {
  const history = useHistory();
   
  const pileInfoRef=useRef();
      const errors=useState({});
      const [sesnsorAmount,setSensorAmount]=useState(0);
      const [pileID,setrandId]=useState(0);
      const pileRadius=useState("");
      const pileHeight=useState("");
      const pileDepth=useState("");
      const [redirect,setRedirect1]=useState(false);
      const [mypath,setMypath]=useState("/PileInfo")
    
 

  const setRedirect = () => {
    setRedirect1(true);
  }
  const changeMypath=()=>{
    setMypath("/SensorsInfo");
  }


  useEffect(()=>{
    setTimeout(() => {
      setrandId(rand(1,100));
    }, 1000  );
  },[])
  //check info than redirect to the next page
  const renderRedirect = () => {
    var pileRadius1 =  document.getElementById("pileRadius");
    var pileHeight1 = document.getElementById("pileHeight");
    var pileDepth1 = document.getElementById("pileDepth");
    //console.log(pileRadius1.value);
    if(!redirect)
    {
      if (pileRadius1.value==="" || pileHeight1.value === "" || pileDepth1.value === "") {
        alert("Missing operand!");
      }
      else{
        console.log("move bitch " +redirect);
        alert("All Good Carry on!");

        setRedirect(); 
        changeMypath();
        //history.push("/SensorsInfo");
        //return <Redirect to={{ pathname: "/SensorsInfo", state: { moose: sesnsorAmount } }} />

      }
    }
  }


  //a function to find the numbers of sensors in a pile
  const findSensorsAmount = (event) => {
    if (event.target.value > 50) {
      console.log(event.target.value);
      const res = parseInt((event.target.value / 10 + 5) - (event.target.value / 10 + 5) % 5);
      console.log("res : "+res);
      setSensorAmount(res);
    }
    else  setSensorAmount( 10 );
    if (event.target.value < 50)
    setSensorAmount(5);
    if (event.target.value === "")
    setSensorAmount( 0 );
  }

    return (
      <div className='container pa4 tc' >
        <img className='f1' src={logo} alt='App logo' />
        <h2 className='f1 i serif black'>Pile Information</h2>

        <div className='row'>
          <input placeholder={"ID : "+pileID} id='pileID' required readOnly className='item' type="input" />
          <Select options={Mixoptions} placeholder="Mix :" id='pileMix' className='item' />
        </div>
        <div className='row'>
          <input placeholder="Radius (CM) :" id='pileRadius' required className='item' type="input" ref={pileInfoRef} />
          <Select options={Soiloptions} placeholder="Soil Type :" id='pileMix' className='item' />
        </div>
        <div className='row'>
          <input onChange={findSensorsAmount} placeholder="Height (CM) :" id='pileHeight' required className='item' type="input" />
          <input placeholder={"Sensores Amount :" + sesnsorAmount} id='sensorAmount' required className='item' type="input" readOnly />
        </div>
        <div className='row'>
          <input placeholder="Depth (CM) :" id='pileDepth' required className='item' type="input" />
          <input placeholder="With Defects (y/n)? :" id='pileID' required className='item' type="input" />
        </div>
        <p className='ph3 pa4'>
          <Link to="" type="submit" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
          
          <Link to={{ pathname: mypath, state: { moose: sesnsorAmount } }} onClick={renderRedirect} type="submit" id='next' className='w-25 serif  ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-pink bw2 bl bb i' >Next</Link>
        </p>



      </div>
    );
  
}
export default PileInfo;
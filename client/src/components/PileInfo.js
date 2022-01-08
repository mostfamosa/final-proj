import React, { useEffect, useState, useRef } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import { } from 'react-router'
import Select from 'react-select'
import './PileInfo.css'
import { rand } from './helpFunc'

const Mixoptions = [{ value: 'regular', label: 'Regular' }]
const Soiloptions = [{ value: 'regular', label: 'Regular' }]



function PileInfo(props) {
  const pileInfoRef = useRef();
  const [sesnsorAmount, setSensorAmount] = useState(0);
  const [pileheight, setheight] = useState("");
  const [pileradius, setradius] = useState("");
  const [piledefect, setdefect] = useState("");
  const [pileID, setrandId] = useState(0);
  const [pileMix, setMix] = useState("");
  const [pileSoil, setSoil] = useState("");
  const [redirect, setRedirect1] = useState(false);
  const [mypath, setMypath] = useState("/PileInfo");



  const setRedirect = () => {
    setRedirect1(true);
  }
  const changeMypath = () => {
    setMypath("/SensorsInfo");
  }

  useEffect(() => {
    setTimeout(() => {
      setrandId(rand(1, 100));
    }, 1000);
  }, [])
  //check info than redirect to the next page
  const renderRedirect = () => {
    var pileID1 = pileID;
    var pileMix1 = pileMix;
    var pileSoil1 = pileSoil;
    var pileDefect1 = document.getElementById("pileDefect");
    var pileRadius1 = document.getElementById("pileRadius");
    var pileHeight1 = document.getElementById("pileHeight");
    const enteredpileDefect = pileDefect1.value;
    const enteredpileID = pileID1;
    const enteredpileSoil = pileSoil1;
    const enteredRadius = pileRadius1.value;
    const enteredpileHeight = pileHeight1.value;
    const enteredpileMix = pileMix1;
    setheight(enteredpileHeight);
    setradius(enteredRadius);
    setdefect(enteredpileDefect);
    const pileData = {
      pileid: enteredpileID,
      radius: enteredRadius,
      height: enteredpileHeight,
      mix: enteredpileMix,
      soil: enteredpileSoil,
      sesnsorsCount: sesnsorAmount,
      hasDefect: enteredpileDefect,
    };


    if (!redirect) {
      if (pileRadius1.value === "" || pileHeight1.value === "") {
        alert("Missing operand!");
      }
      else {
        alert("All Good Carry on!");
        addPileHandler(pileData);
        setRedirect();
        changeMypath();
      }
    }
  }

  function addPileHandler(pileData) {
    fetch('https://buildtech-final-project-default-rtdb.firebaseio.com/piles.json'
      , {
        method: 'POST',
        body: JSON.stringify(pileData),
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
  }
  const inoptionHandler = (event) => {

    setMix(Mixoptions[0].value);

  }
  const inoptionHandler2 = (event) => {

    setSoil(Soiloptions[0].value);

  }
  //a function to find the numbers of sensors in a pile
  const findSensorsAmount = (event) => {
    if (event.target.value >= 105) {
      const res = parseInt(((event.target.value / 102) * 10 + 10) - ((event.target.value / 102) * 10 + 10) % 10);
      setSensorAmount(res);
    }
    else setSensorAmount(10);
    if (event.target.value === "")
      setSensorAmount(0);
  }

  return (
    <div className='container pa4 tc' >
      <img className='f1' src={logo} alt='App logo' />
      <h2 className='f1 i serif black'>Pile Information</h2>
      <div className='row'>
        <input placeholder={"ID : " + pileID} id='pileID' required readOnly className='item' type="input" />
        <Select options={Mixoptions} onChange={inoptionHandler} placeholder="Mix :" id='pileMix' className='item' />
      </div>
      <div className='row'>
        <input placeholder="Radius (CM) :" id='pileRadius' required className='item' type="input" ref={pileInfoRef} />
        <Select options={Soiloptions} onChange={inoptionHandler2} placeholder="Soil Type :" id='pileMix' className='item' />
      </div>
      <div className='row'>
        <input onChange={findSensorsAmount} placeholder="Height (CM) :" id='pileHeight' required className='item' type="input" />
        <input placeholder={"Sensores Amount :" + sesnsorAmount} id='sensorAmount' required className='item' type="input" readOnly />
      </div>
      <div className='row'>
        <input placeholder="With Defects (y/n)? :" id='pileDefect' required className='item' type="input" />
      </div>
      <p className='ph3 pa4'>
        <Link to="" type="submit" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
        <Link to={{ pathname: mypath, state: { pileId: pileID, sesnsorsCount: sesnsorAmount, pileheight: pileheight, pileradius: pileradius, piledefect: piledefect, onAddPile: { addPileHandler } } }} onClick={renderRedirect} type="submit" id='next' className='w-25 serif  ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-pink bw2 bl bb i' >Next</Link>
      </p>
    </div>
  );

}
export default PileInfo;
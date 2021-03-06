import React, { useEffect, useState } from 'react'
import logo from './logo.PNG'
import { Link, useLocation } from 'react-router-dom'
import { withRouter } from "react-router";
import Select from 'react-select'
import './SensorsInfo.css'
import Switch from './Switch'




//functional component of sensor information that all the user have to do is set the status to active and click next to start the simulation
//also it can calculate the cuts of the pile and the positioning of the sensors
function Sensorsinfo() {
    const location = useLocation()
    const { pileId, sesnsorsCount, pileheight, pileradius, piledefect } = location.state

    const [mySensors] = useState([]);
    const [sensorID, setrandId] = useState(0);
    const [value, setValue] = useState(false);
    const [sensorsNumber] = useState(sesnsorsCount);
    const [pileID] = useState(pileId);
    const [outsideTemp, setoutsideTemp] = useState("");
    const [Temp, setTemp] = useState("");
    const [sensorStatus, setStatus] = useState(false);
    const [myX, setX] = useState(-1);
    const [myY, setY] = useState(-1);
    const [myZ, setZ] = useState(-1);


    let Sensoroptions = [];
    let MySensorsPlace = [];
    let circleCut = [];
    let cnt2 = 0

    sensorsLocation(pileheight, pileradius);

    function sensorsLocation(pileheight, pileradius) {
        for (let index = 5; index <= pileheight; index += 100) {
            var initX = 5;
            circleCut.push({ x: initX, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 10, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 20, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 30, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 40, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 50, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 60, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 70, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 80, y: 0, z: -1 * index });
            circleCut.push({ x: initX + 90, y: 0, z: -1 * index });
            for (let index2 = 1; index2 <= 10; index2++) {
                MySensorsPlace.push({ cut: circleCut[cnt2++] });
            }


        }
    }

    sensonrsInt(sensorsNumber);

    function sensonrsInt(sensorsNumber) {
        for (let index = 1; index <= sensorsNumber; index++) {
            Sensoroptions.push({ value: index, label: index });
        }
    }

    const saveHandler = (event) => {
        let flag = true;
        if (mySensors.length === 0) {
            mySensors.push({ pileid: pileID, id: sensorID, outsideTemp: outsideTemp, x: myX, y: myY, z: myZ, Temp: Temp, Status: sensorStatus });
        }
        else {
            for (let index = 0; index < mySensors.length; index++) {
                if (sensorID === mySensors[index].id) {
                    console.log("sensor already in");
                    flag = false;
                }

            }
            if (flag)
                mySensors.push({ pileid: pileID, id: sensorID, outsideTemp: outsideTemp, x: myX, y: myY, z: myZ, Temp: Temp, Status: sensorStatus });
        }
        console.log(mySensors);
    }
    const inoptionHandler = (event) => {

        setrandId(event.value);
        setoutsideTemp(25);
        setTemp(20);
        setStatus(value);

        setX(MySensorsPlace[event.value - 1].cut.x);
        setY(MySensorsPlace[event.value - 1].cut.y);
        setZ(MySensorsPlace[event.value - 1].cut.z);

    }
    const renderRedirect = () => {

        fetch('https://buildtech-final-project-default-rtdb.firebaseio.com/sensors.json'
            , {
                method: 'POST',
                body: JSON.stringify(mySensors),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
    }

    useEffect(() => {
        setTimeout(() => {


        }, 1000);
    }, [])

    return (
        <div className='container pa4 tc'>
            <img className='f1' src={logo} alt='App logo' />
            <h2 className='f1 i serif black'>Sensores Information</h2>
            <div className='ma5 w-50 item2'>
                <Select options={Sensoroptions} onChange={inoptionHandler} placeholder="Sensor Number :" id='sensorAmount' className='item' />
            </div>
            <div className='row'>
                <input placeholder={"ID: " + sensorID} id='semsID' required readOnly className='item' type="input" />
                <input placeholder={"Outside Temp: " + outsideTemp} readOnly id='outTemp' className='item' />
            </div>
            <div className='row2'>
                <input readOnly placeholder={"X: " + myX} id='x' className='item2' type='number' />
                <input readOnly placeholder={"Y: " + myY} id='y' className='item2  ' type='number' />
                <input readOnly placeholder={"Z: " + myZ} id='z' className='item2 ' type='number' />
            </div>
            <div className='row3'>
                <label className='status'>Status : </label>
                <Switch
                    isOn={value}
                    onColor="#EF476F"
                    handleToggle={() => setValue(!value)}
                />
            </div>
            <div className='row'>
                <input readOnly placeholder={"Temp Reading: " + Temp} id='temp' required className='item block' type="input" />
            </div>
            <button onClick={saveHandler} className='w-25 serif ma3 w-20 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-green bw2 bl bb i'>Save</button>
            <p className='ph3 pa4'>
                <Link to="" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
                <Link onClick={renderRedirect} to={{ pathname: "/progressBarPage", state: { pileId: pileID, mySensorsData: mySensors, pileheight: pileheight, pileradius: pileradius, piledefect: piledefect } }} className='w-25 serif  ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-pink bw2 bl bb i' >Next</Link>
            </p>
        </div>
    );
}
export default withRouter(Sensorsinfo);
import React, { Component } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import Select from 'react-select'
import './SensorsInfo.css'
import Switch from './Switch'
//import sensorTable from './SensorTable'

var Sensoroptions = []

function sensonrsInt(a) {
    for (let index = 1; index <= a; index++) {
        Sensoroptions.push({ value: index, label: index });

    }
}

class Sensorsinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            sensorsNumber: parseInt(this.props.location.state.moose),

        };

    }

    render() {
        console.log(this.state.sensorsNumber);
        sensonrsInt(this.state.sensorsNumber);
        console.log(Sensoroptions);
        return (
            <div className='container pa4 tc'>
                <img className='f1' src={logo} alt='App logo' />
                <h2 className='f1 i serif black'>Sensores Information</h2>
                <div className='ma5 w-50 item2'>
                    <Select options={Sensoroptions} placeholder="Sensor Number :" id='pileMix' className='item' />

                </div>
                <div className='row'>
                    <input placeholder="ID :" id='semsID' required className='item' type="input" />
                    <input placeholder="Outside Temp :" id='outTemp' className='item' />
                </div>
                <div className='row2'>
                    <input placeholder="X :" id='x' className='item2' type='number' />
                    <input placeholder="Y :" id='y' className='item2  ' type='number' />
                    <input placeholder="Z :" id='z' className='item2 ' type='number' />

                </div>
                <div className='row3'>
                    <label className='status'>Status : </label>
                    <Switch
                        isOn={this.state.value}
                        handleToggle={() => this.state.setValue(!this.state.value)}
                    />
                </div>
                <div className='row'>
                    <input placeholder="Temp Reading :" id='pileRadius' required readOnly className='item block' type="input" />
                </div>

                <p className='ph3 pa4'>
                    <Link to="" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
                    <Link to="/progressBarPage" className='w-25 serif  ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-pink bw2 bl bb i' >Next</Link>
                </p>
            </div>
        );
    }
}
export default withRouter(Sensorsinfo);
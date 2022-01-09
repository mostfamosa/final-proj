import React from 'react';
import logo from './logo.PNG'
import logo2 from './notAviable.PNG'
import { Link } from 'react-router-dom'
import './support.css'

//functional component page for unavaiable pages
function notAvaiable() {


    return (
        <div className='container pa4 tc' >
            <img className='f1' src={logo} alt='App logo' />
            <h2 className='f1 i serif black'>Not Avaiable Yet, Stay Tuned!</h2>
            <div className='item4'>
                <div className='tc'>
                    <img className='f1' src={logo2} alt='App logo' />
                </div>
            </div>
            <p className='ph3 pa7'>
                <Link to="" type="submit" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>

            </p>



        </div>
    );

}
export default notAvaiable;
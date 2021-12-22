import React from 'react';
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './support.css'


function mySupport() {


    return(
        <div className='container pa4 tc' >
        <img className='f1' src={logo} alt='App logo' />
        <h2 className='f1 i serif black'>How Can We Help?</h2>                                                    
        <div className='item4'>
            <h2>
                Hello good Sir,<br/><br/>
                for any question you can contact us via <a href='https://github.com/mostfamosa/final-proj'><b>Our Github</b></a>
                <br/><br/>Also feel free to see the project code
            </h2>
        </div>
        <p className='ph3 pa7'>
          <Link to="" type="submit" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
  
        </p>
  
  
  
      </div>
    );

}
export default mySupport;
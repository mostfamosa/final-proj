import React, { Component} from 'react'
import logo from './logo.PNG'
import './SensorsInfo.css'
import './ProgressBar.css'

class ProgressFile extends Component{
    render() {
        return (
            <div className='container pa4 tc'>
                <img className='f1' src={logo} alt='App logo'/>
                <h2 className='f1 i serif black'>Please Wait ...</h2>
                <div className="row pa6">
                <div className="bar">
                    <div className="in"></div>
                </div>
                </div>

            </div>
    );
  }
}
export default ProgressFile;
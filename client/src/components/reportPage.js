import React, { Component } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './reportPage.css'
import LineChart from './LineChart'

class ReportPage extends Component {
  state = {
    message: "",
    chartData : [12, 9, 5, 77, 22, 12, 9, 5, 77, 22, 12]
  }


  render() {
    return (
      <div className='container pa4 tc'>
        <img className='f1' src={logo} alt='App logo' />
        <h2 className='f1 i serif black'>Report Page</h2>

        <div className="graph">
          <LineChart mydata={this.state.chartData} />
        </div>
        <p className='ph3 pa6'>
          <Link to="" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>
        </p>
      </div>
    );
  }
}
export default ReportPage;
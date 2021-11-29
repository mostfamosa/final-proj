import React, { Component } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className='container pa4 tc'>
        <img className='f1' src={logo} alt='App logo' />
        <h1 className='f1'>BuildTech</h1>

        <p className='ph3 pa4'>
          <Link to={{ pathname: "/PileInfo" }} className='serif w-30 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i'  >Start Simulation</Link>
        </p>
        <p className='ph3 '>
          <Link to="" className='serif w-30 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-pink bw2 bl bb i' >Start Training</Link>
        </p>
        <footer className="pv4 ph3 ph5-m ph6-l mid-gray">
          <p className='f4 white tc i v-top dib'>Created by Mostafa & Saeed, Supervised by Dr. Zeev Frenkel</p>
          <small className="f6 db white tc">© 2022 <b className="ttu">Alpha Team Inc</b>., All Rights Reserved</small>
        </footer>
      </div>
    );
  }
}
export default Home;
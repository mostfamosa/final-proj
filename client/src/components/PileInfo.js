import React, { Component } from 'react'
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import Select from 'react-select'
import './PileInfo.css'
import { rand } from './helpFunc'

const Mixoptions = [{ value: 'regular', label: 'Regular' }]
const Soiloptions = [{ value: 'regular', label: 'Regular' }]



class PileInfo extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      errors: {},
      sesnsorAmount: 0,
      pileID: rand(1, 100),
      pileRadius: "",
      pileHeight: "",
      pileDepth: "",
      redirect: false
    };
  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  //check info than redirect to the next page
  renderRedirect = () => {
    const pileRadius = document.getElementById("pileRadius");
    const pileHeight = document.getElementById("pileHeight");
    const pileDepth = document.getElementById("pileDepth");
    if (this.state.redirect) {
      if (pileRadius.value === "" || pileHeight.value === "" || pileDepth.value === "") {
        alert("Missing operand!");

      }
      else
        return <Redirect to={{ pathname: "/SensorsInfo", state: { moose: this.state.sesnsorAmount } }} />
    }
  }


  //a function to find the numbers of sensors in a pile
  findSensorsAmount = (event) => {
    if (event.target.value > 50) {
      console.log(event.target.value);
      const res = parseInt((event.target.value / 10 + 5) - (event.target.value / 10 + 5) % 5);
      this.setState({ sesnsorAmount: res });
    }
    else this.setState({ sesnsorAmount: 10 });
    if (event.target.value < 50)
      this.setState({ sesnsorAmount: 5 });
    if (event.target.value === "")
      this.setState({ sesnsorAmount: 0 });
  }

  render() {
    console.log(this.props.location);
    console.log("sesnsorAmount= " + this.state.sesnsorAmount);

    return (
      <div className='container pa4 tc' >
        <img className='f1' src={logo} alt='App logo' />
        <h2 className='f1 i serif black'>Pile Information</h2>

        <div className='row'>
          <input placeholder={"ID : " + this.state.pileID} id='pileID' required readOnly className='item' type="input" />
          <Select options={Mixoptions} placeholder="Mix :" id='pileMix' className='item' />
        </div>
        <div className='row'>
          <input placeholder="Radius (CM) :" id='pileRadius' required className='item' type="input" />
          <Select options={Soiloptions} placeholder="Soil Type :" id='pileMix' className='item' />
        </div>
        <div className='row'>
          <input onChange={this.findSensorsAmount} placeholder="Height (CM) :" id='pileHeight' required className='item' type="input" />
          <input placeholder={"Sensores Amount :" + this.state.sesnsorAmount} id='sensorAmount' required className='item' type="input" readOnly />
        </div>
        <div className='row'>
          <input placeholder="Depth (CM) :" id='pileDepth' required className='item' type="input" />
          <input placeholder="With Defects (y/n)? :" id='pileID' required className='item' type="input" />
        </div>
        <p className='ph3 pa6'>
          <Link to="" type="submit" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>

          {this.renderRedirect()}

          <Link to={{ pathname: "/PileInfo" }} onClick={this.setRedirect} type="submit" id='next' className='w-25 serif  ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-pink bw2 bl bb i' >Next</Link>
        </p>



      </div>
    );
  }

}
export default PileInfo;
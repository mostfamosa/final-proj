import React from 'react';
import logo from './logo.PNG'
import { Link } from 'react-router-dom'
import './team.css'


function Team() {


  return (
    <div className='container pa4 tc' >
      <img className='f1' src={logo} alt='App logo' />
      <h2 className='f1 i serif black'>About Us</h2>
      <div className='item4'>
        <h2>Our mission is to simulate and be able to predict the defect (Air Bubbles) in the piles of concrete before pouring the roof of the buildings using an algorithm of temprature changing.<br />
          <br />It was our supervisor's idea "Dr. Zeev Frenkel", this program was proposed as reseach in software engineering project.
          <br /><br />
          The Team composed of two students : "Mustafa Mousa" and "Saeed Ismael".

        </h2>
      </div>
      <p className='ph3 pa7'>
        <Link to="" type="submit" className='w-25 serif ma3 w-10 f2 br4 link dim ph2 pv2 mb2 dib black bg-light-blue bw2 bl bb i' >Home</Link>

      </p>



    </div>
  );

}
export default Team;
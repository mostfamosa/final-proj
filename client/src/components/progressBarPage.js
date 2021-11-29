import React, { Component} from 'react'
import './SensorsInfo.css'
import './ProgressBar.css'
import ProgressFile from './progressfile'
import ReportPage from './reportPage'

class progressBarPage extends Component{
    state = {
        redirect: false
      }
      componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 1000)
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }
    
    render() {
        
        return this.state.redirect ? <ReportPage />:<ProgressFile/>
            
    
  }
}
export default progressBarPage;
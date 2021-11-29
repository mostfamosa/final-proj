import React from 'react';
import './App.css';
import Loading from './Loading'
import Router from './Router'


const Loadtime=3000;
class App extends React.Component {
  
  
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, Loadtime);
  }

  render(){
    return this.state.isLoading ? <Loading /> : <Router />;  
  }
}
export default App;

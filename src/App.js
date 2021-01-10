import React, { Component } from 'react'
import AppNavBar from './components/layout/AppNavBar';
import {BrowserRouter as Router,Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className='container'>
        
        <Router>
            <AppNavBar />
            <Route path='/' render={()=><p>Home</p>} />
        </Router>
      </div>
    )
  }
}
export default  App;
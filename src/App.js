import React, { Component } from 'react'
import AppNavBar from './components/layout/AppNavBar';
import DashBoard from './components/layout/DashBoard';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import store ,{rrfProps } from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className='container'>
              <AppNavBar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={DashBoard} />
                  <Route exact path='/client/add' component={AddClient} />
                  <Route exact path='/client/:id' component={ClientDetails} />
                  <Route exact path='/client/edit/:id' component={EditClient} />

                </Switch>
              </div>

            </div>
          </Router>
        </ReactReduxFirebaseProvider>

      </Provider>
    )
  }
}
export default App;
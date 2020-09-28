/* eslint-disable import/named */
import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createBrowserHistory as History } from 'history';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { AuthProvider, AuthRoute, AuthConsumer, PublicRoute } from './contexts/AuthContext';
import {
  Home,
  Login,
  Appointment,
  CreateAppointment,
  UpdateAppointment,
} from './views';
import './config/Utilities';
 


function App() {
  return (
    <Router history={History()}>
      <AuthProvider>
        <AuthConsumer>
          {
            () => (
              <Switch>
                <AuthRoute exact path={['/Home', '/']} component={Home} />
                <AuthRoute exact path={['/Appointment', '/']} component={Appointment} />
                <AuthRoute exact path={['/CreateAppointment', '/']} component={CreateAppointment} />
                <AuthRoute exact path={['/UpdateAppointment/:id', '/']} component={UpdateAppointment} />
                <Route exact path="/Login" component={Login} />
               
              </Switch>
            )
          }
        </AuthConsumer>
      </AuthProvider>
      <ToastContainer />
    </Router>
  );
}

export default App;

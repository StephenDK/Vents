import React, { Component, Fragment } from 'react';

import './App.css';

//Components
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import EventsDashboard from '../features/events/EventDashboard/EventsDashboard'
import NavBar from '../features/nav/NavBar/NavBar';
import HomePage from '../features/home/HomePage';
import EventDetailedPage from '../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../features/user/PeopleDashboard/PeopleDashboard';
import SettingsDashboard from '../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../features/user/UserDetailed/UserDetailedPage'
import EventForm from '../features/events/EventForm/EventForm';


class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <Route exact path='/' component={HomePage} />
          <Route path='/events' component={EventsDashboard} />
          <Route path='/events/:id' component={EventDetailedPage} />
          <Route path='/people' component={PeopleDashboard} />
          <Route path='/profile/:id' component={UserDetailedPage} />
          <Route path='/settings' component={SettingsDashboard} />
          <Route path='/createEvent' component={EventForm} />
          
        </Container>
      </Fragment>
    );
  }
}

export default App;



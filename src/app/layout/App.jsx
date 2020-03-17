import React, { Component, Fragment } from 'react';

import './App.css';

//Components
import EventsDashboard from '../features/event/EventDashboard/EventsDashboard'
import NavBar from '../features/nav/NavBar/NavBar';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <EventsDashboard />
        </Container>
      </Fragment>
    );
  }
}

export default App;



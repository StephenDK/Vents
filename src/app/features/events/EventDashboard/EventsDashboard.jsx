import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
// CH 8 Step 3: Connect Component to store
import { connect } from "react-redux";
// CH 8 Step 4 Import event Actions and Configure
import { getEventsForDashboard } from "../eventActions";

import EventList from "../EventList/EventList";
import LoadingComponent from "../../../layout/loadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

// 12.29 first get the loading state from redux and pass to
// component as props
const mapStateToProps = (state) => ({
  //events: state.events,
  events: state.events,
  loading: state.async.loading
  
});

// Step 4 ... Create an actions object
const mapDispatchToProps = {
  getEventsForDashboard
};

class EventsDashboard extends Component {
    state = {
      moreEvents: false
    }

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true
      })
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      })
    }
  }

  render() {
    const { events, loading } = this.props;
    // 12.30 if the loading state is true in our store
    // show loading component else load dashboard
    // head to authActions to add redux thunk to loging In
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
          <Button 
            onClick={this.getNextEvents} 
            disabled={!this.state.moreEvents} 
            content='More' 
            color='green' 
            floated='right'
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect([{ collection: 'events' }])(EventsDashboard)); // Step 3...

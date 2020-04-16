import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react' 
// CH 8 Step 3: Connect Component to store
import { connect } from 'react-redux';
// CH 8 Step 4 Import event Actions and Configure
import {createEvent, updateEvent, deleteEvent} from '../eventActions';

import EventList from '../EventList/EventList'


// Step 3...connect to store using mapstatetoprops passing in the state
const mapStateToProps = (state) => ({
    events: state.events
})

// Step 4 ... Create an actions object
const mapDispatchToProps = {
    createEvent,
    updateEvent,
    deleteEvent
}


class EventsDashboard extends Component {
   
    handleDeleteEvent = (id) => {
      this.props.deleteEvent(id);
    };


    render() {
        const { events } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList 
                      events={events} 
                      deleteEvent={this.handleDeleteEvent}  
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                   <h2>Activity Feed</h2> 
                </Grid.Column>
            </Grid>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsDashboard); // Step 3...
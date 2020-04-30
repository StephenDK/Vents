import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react' 
// CH 8 Step 3: Connect Component to store
import { connect } from 'react-redux';
// CH 8 Step 4 Import event Actions and Configure
import {createEvent, updateEvent, deleteEvent} from '../eventActions';

import EventList from '../EventList/EventList'
import LoadingComponent from '../../../layout/loadingComponent';


// 12.29 first get the loading state from redux and pass to 
// component as props
const mapStateToProps = (state) => ({
    events: state.events,
    loading: state.async.loading
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
        const { events, loading } = this.props;
        // 12.30 if the loading state is true in our store 
        // show loading component else load dashboard
        // head to authActions to add redux thunk to loging In
        if (loading) return <LoadingComponent />
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
import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react' 
// CH 8 Step 3: Connect Component to store
import { connect } from 'react-redux';
// CH 8 Step 4 Import event Actions and Configure
import {createEvent, updateEvent, deleteEvent} from '../eventActions';

import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import cuid from 'cuid'


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
    state = {
        isOpen: false,
        selectedEvent: null
    };

    // Handle Opening the Form
    handleCreateFormOpen = () => {
      this.setState({
        isOpen: true,
        selectedEvent: null
      })
    };

    // Handle Canceling the Form
    handleFormCancel = () => {
      this.setState({
        isOpen: false
      })
    }

    // handleIsOpenToggle = () => {
    //     this.setState(({isOpen}) => ({
    //         isOpen: !isOpen
    //     }));
    // };

    // Handle Creating the event
    handleCreateEvent = (newEvent) => {
      newEvent.id = cuid();
      newEvent.hostPhotoURL = '/assets/user.png';
      this.props.createEvent(newEvent);
      this.setState(({events}) => ({
        isOpen: false
      }));
    };

    // Handle selecting the event
    handleSelectEvent = (event) => {
      this.setState({
        selectedEvent: event,
        isOpen: true
      })
    }

    // Handle Updating the event
    handleUpdateEvent = (updatedEvent) => {
      this.props.updateEvent(updatedEvent);
      this.setState(({events}) => ({
        isOpen: false,
        selectedEvent: null
      }));
    };


    handleDeleteEvent = (id) => {
      this.props.deleteEvent(id);
    };


    render() {
        const { isOpen, selectedEvent } = this.state;
        const { events } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList 
                      events={events} 
                      selectEvent={this.handleSelectEvent}
                      deleteEvent={this.handleDeleteEvent}  
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button 
                      onClick={this.handleCreateFormOpen} 
                      positive 
                      content='Create Event'
                    />
                    {isOpen && (
                      <EventForm 
                        key={selectedEvent ? selectedEvent.id : 0}
                        updateEvent={this.handleUpdateEvent}
                        selectedEvent={selectedEvent}
                        createEvent={this.handleCreateEvent} 
                        cancelFormOpen={this.handleFormCancel}
                      />
                    )}
                </Grid.Column>
            </Grid>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsDashboard); // Step 3...
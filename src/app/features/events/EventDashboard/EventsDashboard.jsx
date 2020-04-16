import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react' 
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import cuid from 'cuid'






class EventsDashboard extends Component {
    state = {
        events: eventsFromDashboard,
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
      this.setState(({events}) => ({
        events: [...events, newEvent],
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
      this.setState(({events}) => ({
        events: events.map(event => {
          if (event.id === updatedEvent.id) {
            return {...updatedEvent}
          } else {
            return event
          }
        }),
        isOpen: false,
        selectedEvent: null
      }));
    };


    handleDeleteEvent = (id) => {
      this.setState(({events}) => ({
        events: events.filter((e) => (
          e.id !== id
        ))
      }))
    };


    render() {
        const { events, isOpen, selectedEvent } = this.state;
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

export default EventsDashboard;
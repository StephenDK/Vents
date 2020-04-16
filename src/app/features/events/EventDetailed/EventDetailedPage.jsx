import React from 'react'
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'


// Since this component is wraped in router we can access the 
//method from router and pass it into mapStateToProps as ownProps
const mapStateToProps = (state, ownProps) => {
    // We grab the /:id from the url and save to eventId 
    const eventId = ownProps.match.params.id;

    // Createempty object to store event
    let event = {};

    // if there is an id in params and events array is great than zero
    if (eventId && state.events.length > 0) {
        // filter events in redux state and set empty event object to
        // the event that matches the param id
        event = state.events.filter(event => event.id === eventId)[0];
    }
    // return event object with matching id as param
    return {
        event
    }
}
                    // Pull event from this.props
const EventDetailedPage = ({event}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}

//connect component to store that filterd the event
export default connect(mapStateToProps)(EventDetailedPage);
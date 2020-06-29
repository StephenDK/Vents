import React, { Component }from 'react'
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import { objectToArray } from '../../../common/util/helpers';

// Since this component is wraped in router we can access the 
//method from router and pass it into mapStateToProps as ownProps
const mapStateToProps = (state, ownProps) => {
    // We grab the /:id from the url and save to eventId 
    const eventId = ownProps.match.params.id;

    // Create empty object to store event
    let event = {};

    // if there is an id in params and events array is great than zero
    if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
        // filter events in redux state and set empty event object to
        // the event that matches the param id
        event = state.firestore.ordered.events.filter(event => event.id === eventId)[0];
    }
    // return event object with matching id as param
    return {
        event
    }
}
                    // Pull event from this.props
class EventDetailedPage extends Component {

    // 18.5 First we need to change this component to a class based.
    // Then we must inport withFirestore and export this component connected
    // to firestore. Once our compnent is connected ti firestore
    // we can access through the props the data for our event detail
    // each snapshot of data from firebase comes with exists: true || false
    // make a check for if data exists
    async componentDidMount() {
        const {firestore, match, history} = this.props;
        let event = await firestore.get(`events/${match.params.id}`);
        // console.log(match);
        // console.log(event);
        if (!event.exists) {
            history.push('/events');
            toastr.error('Sorry', 'Event not found');
        }
    }

    render() {
        const {event} = this.props;
        // 18.9 we are now going to setup our helper function so that attendees
        // does not throw an error for being a firebase object after we 
        // use our helper function and turn it into an array
        const attendees = event && event.attendees && objectToArray(event.attendees);
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader event={event} />
                    <EventDetailedInfo event={event} />
                    <EventDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={attendees} />
                </Grid.Column>
            </Grid>
        )
    }    
}

//connect component to store that filterd the event
export default withFirestore(connect(mapStateToProps)(EventDetailedPage));
import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid'

// 9.1 import reduxForm and Field. reduxForm is a HOC and 
// we must pass our form into
import { reduxForm, Field } from 'redux-form';


const mapStateToProps = (state, ownProps) => {
    // Uncomment to see
    // console.log(ownProps.match);
    // console.log(ownProps.match.params.id);
    const eventId = ownProps.match.params.id;

    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
       event =  state.events.filter(event => event.id === eventId)[0]
    }

    return {
        event
    }
}

const mapDispatchToProps =  {
        createEvent,
        updateEvent
    }


class EventForm extends Component {
    state = {...this.props.event};

    // Lifecycle Methods
    componentDidMount() {
        if (this.props.selectEvent !== null) {
            this.setState({
                ...this.props.selectedEvent
            })
        }
    }
    
    handleFormSubmit = (evt) => {
        evt.preventDefault();
        // console.log(this.refs.title.value);
        // console.log(this.state);
        if (this.state.id) {
            this.props.updateEvent(this.state)
            this.props.history.push(`/events/${this.state.id}`);
        } else {
            const newEvent = {
                ...this.state, 
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            }
            this.props.createEvent(newEvent);
            this.props.history.push(`/events`);
        }
    }


    handleTitleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    
    render() {
        const { title, date, city, venue, hostedBy } = this.state;
        return (
            <Segment>
            <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
                {/* 9.3 We can now start replacing the form fields with 
                    redux Field tag imported above. Instead of using the input component
                    we can create our own component with semantic ui styles and pass it in.
                */}
                <Field name='title' component='input' placeholder='Event Title' />
                <Form.Field>
                    <label>Event Date</label>
                    <input 
                    name='date'
                    value={date} 
                    onChange={this.handleTitleChange} 
                    type="date" 
                    placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input 
                    name='city'
                    value={city} 
                    onChange={this.handleTitleChange} 
                    placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input 
                    name='venue'
                    value={venue} 
                    onChange={this.handleTitleChange} 
                    placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                    <label>Hosted By</label>
                    <input 
                    name='hostedBy'
                    value={hostedBy} 
                    onChange={this.handleTitleChange} 
                    placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive type="submit">
                Submit
                </Button>
                <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
            </Segment>
        )
    }
}

// 9.2 reduxForm requires some setup like the name of the form
// Order of operations in this code below matters
// Our connection function below takes two parameters. The redux from and the form component
// Check the event form component in dev tools to see what we access to.
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'eventForm'})(EventForm));
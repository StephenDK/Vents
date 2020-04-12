import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';


class EventForm extends Component {
    state = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    };

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
        this.props.createEvent(this.state);
    }


    handleTitleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    
    render() {
        const { cancelFormOpen } = this.props;
        const { title, date, city, venue, hostedBy } = this.state;
        return (
            <Segment>
            <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
                <Form.Field>
                    <label>Event Title</label>
                    <input 
                    name='title'
                    value={title} 
                    onChange={this.handleTitleChange} 
                    valplaceholder="Event Title" />
                </Form.Field>
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
                <Button type="button" onClick={cancelFormOpen}>Cancel</Button>
            </Form>
            </Segment>
        )
    }
}


export default EventForm
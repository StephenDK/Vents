import React from "react";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {format} from 'date-fns';

// Styles
const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const EventDetailedHeader = ({ event }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                {/* 18.6 one more error appears after fixing the code below
                  the next error can be found on the EventDetailedInfo page
                  head to EventDetailedInfo.jsx
                   18.7 Now the data in firebase is an object and we are trying 
                   to map over an object. map only works on arrays. So we will
                   create a helper function to convery the object into an array
                   Head to common/util/helper.js
                */}
                <p>{event.date && format(event.date.toDate(), 'EEEE do LLLL')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button
          as={Link}
          to={`/manage/${event.id}`}
          color="orange"
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;

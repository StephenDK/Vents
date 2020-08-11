import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from 'react-router-dom';

// 15.7 we are passing in the authenticaed user from firebase as auth
// and displaying their email below
// head back to navbar
// Head over to authactions for 15.8
// 15.19 Start work on the account page. head to AccountPage.jsx
const SignedInMenu = ({signOut, profile, auth}) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />
      <Dropdown pointing="top left" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item 
            text="My Profile" 
            icon="user" 
            as={Link}
            to={`/profile/${auth.uid}`}
          />
          <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;

import React, { Component, Fragment } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { logout } from "../../auth/authActions";

import { withFirebase } from 'react-redux-firebase';

const mapDispatchToProps = {
  openModal,
  logout,
};

// 15.4 our authentication is already stored in firebase so instead of using
// the auth reducer below use firebase
// to handle the logout we also need to import withFirebase from react-redux-firebase
// after importing withFirebase we must connect this component to the withFirebase HOC
const mapStateToProps = (state) => ({
  //auth: state.auth,
  auth: state.firebase.auth
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };
  // 15.7 to logout the user use the firebase logout method below
  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    // 15.5 below is our check to make sure we are authenticated
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Vents
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/events" name="Events" />
          {authenticated && (
            <Fragment>
              <Menu.Item as={NavLink} to="/people" name="People" />
              <Menu.Item as={NavLink} to="/test" name="Test" />
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            </Fragment>
          )}
          {authenticated ? (
            <SignedInMenu
            // 15.6 Head to signed in menu
              signOut={this.handleSignOut}
              auth={auth}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(NavBar)));
// 15.5 wrapping our component withFirebase gives us access to the firebase methods
import React from "react";
import { Grid } from "semantic-ui-react";
import { updatePassword } from "../../auth/authActions";
import { connect } from "react-redux";
import SettingsNav from "./SettingsNav";
import { Route, Redirect, Switch } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./Photos/PhotosPage";
import AccountPage from "./AccountPage";
import { updateProfile } from '../userActions.js'

const mapDispatchToProps = {
  updatePassword,
  updateProfile
};

//16.3 bring in the user data from our state in store
// pass the user data into our component props and then
// down into the BasicPage component
const mapStateToProps = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
});

const SettingsDashboard = ({ updatePassword, providerId, user, updateProfile }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="settings/basic" />
          {/* 16.4 Because BasicPage is a redux form we need to pass user as initialValues */}
          <Route
            path="/settings/basic"
            render={() => <BasicPage initialValues={user} updateProfile={updateProfile}/>}
          />
          <Route 
            path="/settings/about" 
            // 16.16 to pass in the initial values from or redux form state
            // we must pass the component in a render method with initialValues property
            // and the updateProfile action to update the user information
            // head back to the aboutPage and hook up the form
            render={() => <AboutPage initialValues={user} updateProfile={updateProfile}/>}
          />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard);

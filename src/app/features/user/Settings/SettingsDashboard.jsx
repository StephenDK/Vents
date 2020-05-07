import React from "react";
import { Grid } from "semantic-ui-react";
// 12.22 connecting this component to the store
// and then bring in the updatePassword action
import { updatePassword } from "../../auth/authActions";
import { connect } from "react-redux";
import SettingsNav from "./SettingsNav";
import { Route, Redirect, Switch } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";

const mapDispatchToProps = {
  updatePassword,
};

// 15.23 the AccountPage is in a route. How do we pass properties to a
// component in a route? Instead of using the component we need to use
// the render property from route. pass in an arrow function then pass the
// component in with proporties like we normally do.
// now head back to the account page
const SettingsDashboard = ({ updatePassword }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="settings/basic" />
          <Route path="/settings/basic" component={BasicPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => <AccountPage updatePassword={updatePassword} />}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(null, mapDispatchToProps)(SettingsDashboard);

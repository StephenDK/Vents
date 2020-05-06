import React from "react";
import { Button, Icon } from "semantic-ui-react";

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <Button
        type="button"
        onClick={() => socialLogin("facebook")}
        style={{ marginBottom: "10px" }}
        fluid
        color="facebook"
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>

      <Button
        onClick={() => socialLogin("google")}
        type="button"
        fluid
        color="google plus"
      >
        <Icon name="google plus" />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
// 15.13 this is the basic structure for social logins component
// head back to LoginForm.jsx

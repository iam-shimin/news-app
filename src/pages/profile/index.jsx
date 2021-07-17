import React from "react";
import { Typography, Grid, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";
import Page from "../../components/page";
import Label from "../../components/label";
import Password from "./password";
import DisplayNameField from "./displayName";
import userApi from "../../api/user";
import { validatePassword } from "../../helpers/validation";

function ProfilePage() {
  const [profileData, setProfileData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [passwordData, setPasswordData] = React.useState({
    isError: false,
    text: "",
  });

  function handleDisplayNameChange(payload) {
    if (payload.display_name) {
      userApi
        .updateUserById(profileData.id, payload)
        .then((data) => setProfileData(data.data))
        .catch((error) => {
          alert(error.message || "Update Failed");
        });
    }
  }

  function handlePwdChange(payload) {
    const validationError = validatePassword(payload.new_pwd);
    if (validationError) {
      setPasswordData({
        isError: true,
        text: validationError,
      });
      return;
    }
    if (payload.current_pwd && payload.new_pwd) {
      userApi
        .resetPassword(profileData.id, payload)
        .then(() => {
          setPasswordData({
            isError: false,
            text: "Password Updated!",
          });
        })
        .catch((error) => {
          setPasswordData({
            isError: true,
            text: error.message || "Something Went Wrong!",
          });
        });
    }
  }

  React.useEffect(() => {
    const userId = localStorage.getItem("token");
    if (userId) {
      userApi
        .getUserById(Number(userId))
        .then((data) => {
          setProfileData(data.data);
        })
        .catch(() => {
          setError("Failed to Fetch user data!");
        });
    }
  }, []);

  if (!profileData) return null;

  if (error) {
    return (
      <Page direction="column">
        <Typography
          variant="h6"
          style={{
            fontSize: "4rem",
            color: "red",
            marginTop: "2em",
            marginLeft: -5,
          }}
        >
          Fetch Failed
        </Typography>
        <Grid container direction="column">
          <Typography variant="caption">{error}</Typography>
          <Link style={{ marginTop: "2em" }} to="/feeds">
            Back to Feeds
          </Link>
        </Grid>
      </Page>
    );
  }

  return (
    <Page style={{ margin: "3em 0" }} direction="column">
      <Grid item>
        <Typography variant="h2">Profile</Typography>
      </Grid>

      <Grid item>
        <Link style={{ marginTop: "2em" }} to="/feeds">
          Back to Feeds
        </Link>
      </Grid>

      <Grid item container style={{ marginTop: "7em" }}>
        <DisplayNameField
          currentValue={profileData.display_name}
          onChange={handleDisplayNameChange}
        />
      </Grid>

      <Grid item container>
        <Grid item>
          <Label>Email</Label>
        </Grid>
        <Grid item style={{ marginLeft: "1em" }}>
          {profileData.email}
        </Grid>
      </Grid>

      <Grid item container direction="column" style={{ marginTop: "2em" }}>
        <Grid item>
          <Label>Change Password</Label>
        </Grid>
        <Grid item xs={5} style={{ marginTop: "1em" }}>
          <Password onChange={handlePwdChange} />
          {passwordData.text && (
            <FormHelperText error={passwordData.isError}>
              {passwordData.text}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
    </Page>
  );
}

export default ProfilePage;

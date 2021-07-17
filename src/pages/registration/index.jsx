import React from "react";
import { Grid, TextField, Button, withStyles, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";
import userApi from "../../api/user";

const withCustomStyles = withStyles(() => ({
  group: {
    marginTop: "1em",
  },
  input: {
    width: "25%",
  },
}));

function Registration({ classes, history }) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    display_name: "",
  });
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    display_name: "",
    appError: ''
  });

  function handleFieldChange(event) {
    const { name, value } = event.currentTarget;
    setFormData((state) => ({ ...state, [name]: value }));
  }

  function handleValidation(data) {
    const nextErrors = {};
    const names = {
      email: "Email",
      password: "Password",
      display_name: "Display Name",
    };
    Object.entries(data).forEach(([key, value]) => {
      const noSpecialChars = /^[a-zA-Z0-9]+$/;
      if (!value) {
        nextErrors[key] = `The field '${names[key]}' is required`;
        return;
      }

      
      if (key === "password") {
        if (value.length > 20) {
          nextErrors["password"] = `${names[key]} should be max 20 characters`;
        } else if (!noSpecialChars.test(value)) {
          nextErrors[
            "password"
          ] = `${names[key]} should not contain special characters characters`;
        }
      }

      if (key === "display_name" && !noSpecialChars.test(value)) {
        nextErrors[
          "display_name"
        ] = `${names[key]} should not contain special characters characters`;
      }
    });

    return Object.keys(nextErrors).length ? nextErrors : null;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const currentErrors = handleValidation(formData);
    if (currentErrors) {
      setErrors(state => ({...state, ...currentErrors}));
      return;
    }

    userApi.createUser(formData).then(() => {
        history.push('/login');
    }).catch(error => {
        setErrors(state => ({...state, appError: error.message || 'Something Went Wrong!'}));
    });
  }
  return (
    <Grid container style={{ padding: "0 10%", minHeight: "100vh" }}>
      <Grid container alignItems="center">
        <h1>User Registration</h1>
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <Grid className={classes.group} xs={12}>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              placeholder="Your Email"
              value={formData.email}
              className={classes.input}
              onChange={handleFieldChange}
              helperText={errors.email}
              error={errors.email}
            />
          </Grid>
          <Grid className={classes.group} xs={12}>
            <TextField
              name="display_name"
              label="Display Name"
              variant="outlined"
              placeholder="Your Display Name"
              value={formData.display_name}
              className={classes.input}
              onChange={handleFieldChange}
              helperText={errors.display_name}
              error={errors.display_name}
            />
          </Grid>
          <Grid className={classes.group} xs={12}>
            <TextField
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              value={formData.password}
              className={classes.input}
              onChange={handleFieldChange}
              helperText={errors.password}
              error={errors.password}
            />
          </Grid>
          <Grid className={classes.group} xs={12}>
              {errors.appError && <FormHelperText error>{errors.appError}</FormHelperText>}
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </form>

        <Grid item className={classes.group}>
          Already have an Account? <Link to="/login">Login</Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withCustomStyles(Registration);

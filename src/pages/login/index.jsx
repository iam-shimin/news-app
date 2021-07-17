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

function LoginPage({ classes, history }) {
  const [formData, setFormData] = React.useState({
    password: "",
    display_name: "",
  });
  const [errors, setErrors] = React.useState({
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
      if (!value) {
        nextErrors[key] = `The field '${names[key]}' is required`;
        return;
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

    userApi.login(formData).then(data => {
        localStorage.setItem('token', data.token);
        history.push('/feeds');
    }).catch(error => {
        setErrors(state => ({...state, appError: error.message || 'Something Went Wrong!'}));
    });
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        userApi.login({token}).then(data => {
            localStorage.setItem('token', data.token);
            history.push('/feeds');
        }).catch(error => {
            console.error(error);
        });
    }
  }, [history]);

  return (
    <Grid container style={{ padding: "0 10%", minHeight: "100vh" }}>
      <Grid container alignItems="center">
        <h1>Login</h1>
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <Grid item className={classes.group} xs={12}>
            <TextField
              name="display_name"
              label="Display Name"
              variant="outlined"
              placeholder="Your Display Name"
              value={formData.display_name}
              className={classes.input}
              onChange={handleFieldChange}
              helperText={errors.display_name}
              error={!!errors.display_name}
            />
          </Grid>
          <Grid item className={classes.group} xs={12}>
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
              error={!!errors.password}
            />
          </Grid>
          <Grid item className={classes.group} xs={12}>
              {errors.appError && <FormHelperText error>{errors.appError}</FormHelperText>}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </form>

        <Grid item className={classes.group}>
            Don't have an Account? <Link to="/registration">Register</Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withCustomStyles(LoginPage);

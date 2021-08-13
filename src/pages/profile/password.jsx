import React from "react";
import { TextField, IconButton, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

function Password({ onChange }) {
  const [localPwd, setLocalPwd] = React.useState({
    current_pwd: "",
    new_pwd: "",
  });

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    setLocalPwd((state) => ({ ...state, [name]: value }));
  }

  function handleSave() {
    onChange(localPwd);
    setLocalPwd({
      current_pwd: "",
      new_pwd: "",
    });
  }
  return (
    <Grid container>
      <Grid xs>
        <TextField
          label="Current Password"
          type="password"
          name="current_pwd"
          value={localPwd.current_pwd}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs>
        <TextField
          label="New Password"
          type="password"
          name="new_pwd"
          style={{ marginLeft: "2em" }}
          value={localPwd.new_pwd}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={1}>
      <IconButton onClick={handleSave}>
        {localPwd.current_pwd && localPwd.new_pwd && <SaveIcon />}
      </IconButton>
      </Grid>
    </Grid>
  );
}

export default Password;

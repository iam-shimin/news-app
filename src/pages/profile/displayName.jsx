import React from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Label from "../../components/label";

function DisplayName({ currentValue, onChange }) {
  const [localDisplayName, setLocalDisplayName] = React.useState(null);

  function handleDisplaynameChange({ currentTarget }) {
    setLocalDisplayName(currentTarget.value);
  }
  function handleDisplayNameKeyDown({ key }) {
    // eslint-disable-next-line default-case
    switch (key) {
      case "Escape": {
        setLocalDisplayName(null);
        break;
      }
      case "Enter": {
        onChange({ display_name: localDisplayName });
        setLocalDisplayName(null);
        break;
      }
    }
  }
  return (
    <>
      <Grid item>
        {localDisplayName !== null ? (
          <TextField
            label="Display Name"
            value={localDisplayName}
            onChange={handleDisplaynameChange}
            onKeyDown={handleDisplayNameKeyDown}
          />
        ) : (
          <>
            <Label>Display name</Label>
            <span style={{ marginLeft: "1em" }}>{currentValue}</span>
          </>
        )}
      </Grid>
      <Grid item>
        <IconButton
          onClick={() =>
            setLocalDisplayName((state) => (state === null ? currentValue : null))
          }
        >
          {localDisplayName === null ? <EditIcon /> : <SaveIcon />}
        </IconButton>
      </Grid>
    </>
  );
}

export default DisplayName;

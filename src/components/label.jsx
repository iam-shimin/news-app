import { withStyles } from "@material-ui/core";
import React from "react";

const withCustomStyle = withStyles(() => ({
  label: { fontSize: "1.2rem", fontWeight: "bold" },
}));

function Label({ classes, children }) {
  return <span className={classes.label}>{children}</span>;
}

export default withCustomStyle(Label);

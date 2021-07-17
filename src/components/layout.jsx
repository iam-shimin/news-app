import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
  } from "@material-ui/core";
  import AccountCircleIcon from "@material-ui/icons/AccountCircle";
  import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
  import { useHistory } from "react-router";
import newsApi from '../api/news';

function Layout({children}) {
    const history = useHistory();

    function handleLogout() {
        const userId = localStorage.getItem("token");
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('read-later');
            history.push('/login');
        }
          newsApi.getReadLaterList(Number(userId)).then(res => {
            if (res.data.length) {
                const status = window.confirm('You have unread Articles in "Read Later". Loggin out will clear this.');
                if (status) {
                    logout();
                }
            } else {
                logout();
            }
          })
      }
    return (
        <>
        <AppBar
          position="static"
          style={{ height: "6vh", position: "fixed", top: 0 }}
        >
          <Toolbar>
            <Typography variant="h6">News</Typography>
            <IconButton
              color="inherit"
              style={{ marginLeft: "auto" }}
              onClick={() => history.push("/profile")}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton style={{ marginRight: "1em" }} onClick={handleLogout}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container style={{ minHeight: "94vh", marginTop: "6vh" }}>
          {children}
        </Grid>
      </>
    )
}

export default Layout;

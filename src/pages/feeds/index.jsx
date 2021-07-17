import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Sidebar from "./sidebar";
import Articles from "./articles";
import newsApi from "../../api/news";

function FeedsPage({ history }) {
  const [allArticles, setAllArticles] = React.useState({
    isLoading: false,
    data: [],
    error: null,
    page: -1,
  });

  const [filter, setFilter] = React.useState(null);

  const articles = React.useMemo(
    () =>
      filter
        ? allArticles.data.filter((article) => article.section === filter)
        : allArticles.data,
    [filter, allArticles.data]
  );

  const sections = React.useMemo(
    () => [...new Set(allArticles.data.map((article) => article.section))],
    [allArticles.data]
  );

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

  React.useEffect(() => {
    setAllArticles((state) => ({ ...state, isLoading: true }));
    newsApi
      .getArticleList(articles.page + 1)
      .then((res) => {
        setAllArticles((state) => ({
          ...state,
          data: res.results,
          isLoading: false,
        }));
      })
      .catch((error) => {
        setAllArticles((state) => ({
          ...state,
          error: error.message || "Fetch Failed",
          isLoading: false,
        }));
      });
  }, [articles.page]);

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
        <Grid
          item
          lg={3}
          style={{ background: "rgb(227, 224, 224) none repeat scroll 0% 0%" }}
        >
          <Sidebar
            sections={sections}
            onItemClick={(selectedSection) => setFilter(selectedSection)}
          />
        </Grid>
        <Grid item lg={9}>
          <Articles data={articles} />
        </Grid>
      </Grid>
    </>
  );
}

export default FeedsPage;

import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Layout from "../../components/layout";
import newsApi from "../../api/news";

function ReadLaterPage() {
  const [articles, setArticles] = React.useState({
    data: [],
    isLoading: false,
    error: null,
  });

  React.useEffect(() => {
    const userId = localStorage.getItem("token");
    newsApi
      .getReadLaterList(Number(userId))
      .then((res) => {
        setArticles((state) => ({ ...state, data: res.data }));
      })
      .catch((error) => {
        setArticles((state) => ({
          ...state,
          isLoading: false,
          error: error.message || "Fetch Failed",
        }));
      });
  }, []);

  return (
    <Layout>
      {!articles.isLoading && !articles.data.length ? (
        <>
          <Grid item>
            <Typography variant="h6">No Articles</Typography>
          </Grid>
          <Grid item>
            <p>Article added to 'Read Later' will be shown here.</p>
          </Grid>
        </>
      ) : (
        <Grid item container direction="column" style={{padding: '0 10%'}}>
          {articles.data.map((item) => (
            <Grid item key={item.title} style={{marginTop: '2em'}}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}

export default ReadLaterPage;

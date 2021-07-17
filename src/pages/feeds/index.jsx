import React from "react";
import { Grid } from "@material-ui/core";
import Sidebar from "./sidebar";
import Articles from "./articles";
import Layout from "../../components/layout";
import newsApi from "../../api/news";

function FeedsPage() {
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
    <Layout>
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
    </Layout>
  );
}

export default FeedsPage;

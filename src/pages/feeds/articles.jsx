import React from "react";
import { Grid } from "@material-ui/core";
import ArticleCard from "./articleCard";

function Articles({ data }) {
  return (
    <Grid container justifyContent="center">
      {data.map((article) => (
        <Grid key={article.slug_name} style={{ padding: "2em" }}>
          <ArticleCard
            title={article.title}
            multimedia={article.multimedia}
            defaultImg={article.thumbnail_standard}
            url={article.url}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Articles;

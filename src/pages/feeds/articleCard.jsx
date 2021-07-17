import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import newsApi from "../../api/news";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default function ArticleCard({ title, multimedia, url, defaultImg }) {
  const classes = useStyles();
  const [isRl, setIsRl] = React.useState(false);
  const imgWithMaxSize = Array.isArray()
    ? multimedia.reduce((selected, item) => {
        if (item.height > selected.height) {
          return item;
        }
        return selected;
      })
    : { url: defaultImg };

  function handleBookmark() {
    const userId = localStorage.getItem("token");
    newsApi
      .addReadLater(Number(userId), { title, url })
      .then(() => {
        setIsRl(true);
      })
      .catch(console.info);
  }

  React.useEffect(() => {
    const userId = localStorage.getItem("token");
    newsApi
      .getReadLaterList(Number(userId))
      .then((res) => {
        const isAddedToRl = !!res.data.find(
          (article) => article.title === title
        );
        setIsRl(isAddedToRl);
      })
      .catch(console.error);
  }, [title]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={imgWithMaxSize.url}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={url} target="_blank" rel="noreferrer">
          Show
        </Button>
        <Button
          disabled={isRl}
          onClick={handleBookmark}
          size="small"
          color="primary"
        >
          Read Later
        </Button>
      </CardActions>
    </Card>
  );
}

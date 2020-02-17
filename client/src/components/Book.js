import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  placeholder: {
    margin: 'auto',
    fontSize: '6em',
  },
  description: {
    position: 'relative',
    height: '6.2em',
    '&::after': {
      content: "''",
      textAlign: 'right',
      position: 'absolute',
      bottom: '-15px',
      right: 0,
      width: '70%',
      height: '1.2em',
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%)',
    }
  },
}));

const Book = ({ book, renderActionArea }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {book.title}
          </Typography>

          <Typography gutterBottom variant="subtitle1" component="h3" color="textSecondary">
            {book.author} | {book.genre}
          </Typography>
  
          {
            book.description && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.description}>
                {book.description}
              </Typography>
            )
          }
        </CardContent>
      </CardActionArea>
      { renderActionArea && renderActionArea(book) }
    </Card>
  )
};

export default Book;

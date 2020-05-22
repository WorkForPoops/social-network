import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import {InitialStateType} from '../../redux/news-reducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NewsCard from './NewsCard';


type PropsType = {
    newsPage: InitialStateType
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const News: React.FC<PropsType> = (props) => {

    const classes = useStyles();

    let newsElements =
        [...props.newsPage.posts]
            .map(p => <NewsCard key={p.id} text={p.text} name={p.name} avatar={p.avatar} likes={p.likes} img={p.img}/>);


    return (
        <Container>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            { newsElements }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
  );
}

export default News;
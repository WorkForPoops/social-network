import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import AddPostForm, {AddPostFormValuesType} from './AddPostForm/AddPostForm';
import {PostType} from '../../../types/types';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme  } from '@material-ui/core/styles';

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }),
);

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    const classes = useStyles();
    
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} img={p.img} name={p.name}/>);

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h3>My posts</h3>
                        <AddPostForm onSubmit={onAddPost}/>
                        <div className={s.posts}>
                            {postsElements}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>    
    )
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;

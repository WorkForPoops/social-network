// import React from 'react';
// import s from './Post.module.css';

// type PropsType = {
//     message: string
//     likesCount: number
// }

// const Post: React.FC<PropsType> = (props) => {
//   return (
//     <div className={s.item}>
//       <img src='https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg' />
//         { props.message }
//           <div>
//         <span>like</span> { props.likesCount }
//       </div>
//     </div>
//   )
// }

// export default Post;

import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

type PropsType = {
  message: string
  likesCount: number
  img: string
  name: string
}

const Post: React.FC<PropsType> = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.img}/>
        </ListItemAvatar>
        <ListItemText primary={props.name} secondary={props.message} />
      </ListItem>
      <span>like</span> { props.likesCount }
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default Post

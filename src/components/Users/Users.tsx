// import React, {FC} from 'react';
// import Paginator from "../common/Paginator/Paginator";
// import User from "./User";
// import {UserType} from '../../types/types';

// type PropsType = {
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     onPageChanged: (pageNumber: number) => void
//     users: Array<UserType>
//     followingInProgress: Array<number>
//     unfollow: (userId: number) => void
//     follow: (userId: number) => void
// }


// let Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users,
//                                 ...props}) => {
//     return <div>
//         <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
//                    totalItemsCount={totalUsersCount} pageSize={pageSize}/>
//         <div>
//             {
//                 users.map(u => <User user={u}
//                                      followingInProgress={props.followingInProgress}
//                                      key={u.id}
//                                      unfollow={props.unfollow}
//                                      follow={props.follow}
//                     />
//                 )
//             }
//         </div>
//     </div>
// }

// export default Users;




import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import userPhoto from '../../assets/images/user.jpg'
// import userStyles from '../UsersCstyles';
import Pagination from '@material-ui/lab/Pagination';
import { NavLink } from 'react-router-dom';
// import '../../../App.css'
import { UserType } from '../../types/types';
import { makeStyles } from '@material-ui/core/styles';


const userStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      marginTop: 10
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, onPageChanged, users, followingInProgress, unfollow, follow, ...props}) => {
  const classes = userStyles();

  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: any, value: number) => {
    setPage(value);
    onPageChanged(value)
  }; 

  return (
    <div>      
        { 
          users.map( u => <div key={u.id} className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <NavLink to={'/profile/' + u.id}>
                      <Avatar src={ u.photos.small != null ? u.photos.small : userPhoto } className={classes.large} />
                  </NavLink>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {u.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {u.status}
                      </Typography>
                    </Grid>
                    <Grid item>
                      { u.followed 
                        ? <Button disabled={followingInProgress.some(id => id === u.id)} onClick={ () => {
                        unfollow(u.id) } } size="small" color="secondary">Unfollow</Button> 

                        : <Button disabled={followingInProgress.some(id => id === u.id)} onClick={ () => { follow(u.id) } } size="small" color="primary">Follow</Button> }
                    </Grid>
                  </Grid>
                  <Grid item>
                      <Typography variant="subtitle1"> {"u.location.city"}, {"u.location.country"} </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>)
        } 
        <div className={classes.paper}>
          <Pagination count={pagesCount} onChange={handleChange}  variant="outlined" color="secondary"/>
        </div> 
      </div>
  );
}

export default Users
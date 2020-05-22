// import React from 'react';
// import s from './Navbar.module.css';
// import {NavLink} from "react-router-dom";

// const Navbar = () => {
//     return (
//         <nav className={s.nav}>
//             <div className={s.item}>
//                 <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
//             </div>
//             <div className={`${s.item} ${s.active}`}>
//                 <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
//             </div>
//             <div className={`${s.item} ${s.active}`}>
//                 <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
//             </div>

//             <div className={s.item}>
//                 <a>News</a>
//             </div>
//             <div className={s.item}>
//                 <a>Music</a>
//             </div>
//             <div className={s.item}>
//                 <a>Settings</a>
//             </div>
//         </nav>
//     )
// }


import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { withSuspense } from '../../hoc/withSuspense';
import DialogsContainer from '../Dialogs/DialogsContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import UsersContainer from '../Users/UsersContainer';
import LoginPage from '../Login/Login'
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import HeaderContainer from '../Header/HeaderContainer';
import NewsContainer from '../News/NewsContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    linkColor: {
        textDecoration: 'none',
        color: 'black',
    },
    title: {
      flexGrow: 1,
    }
  }),
);

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const iconList = (index: number) => {
      if(index === 0){
        return <PersonIcon />
      }else if(index === 1){
        return <MailIcon />
      }else if(index === 2){
        return <ReceiptIcon />
      }else if(index === 3){
        return <MusicNoteIcon />
      }else{
        return <GroupIcon />
      }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Social-network
          </Typography>
          <Typography>
            <HeaderContainer />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['profile', 'dialogs', 'news', 'music', 'users'].map((text, index) => (
            <NavLink to={`/${text}`} className={classes.linkColor}>    
                <ListItem button key={text}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemIcon>{iconList(index)}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            </NavLink>    
          ))}
        </List>
        <Divider />
        <List>
          {['Settings'].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>{ <SettingsIcon /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
            <Switch>
                <Route exact path='/'
                    render={() => <Redirect to={"/profile"}/>}/>

                <Route path='/dialogs'
                    render={() => <SuspendedDialogs /> }/>

                <Route path='/profile/:userId?'
                    render={() => <SuspendedProfile /> }/>

                <Route path='/users'
                    render={() => <UsersContainer pageTitle={"Users"}/>}/>
                
                <Route path='/news'
                    render={() => <NewsContainer />}/>

                <Route path='/login'
                    render={() => <LoginPage/>}/>

                <Route path='*'
                    render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
      </main>
    </div>
  );
}

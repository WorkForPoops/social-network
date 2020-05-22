import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const useStyles = makeStyles(theme => ({
    loginButton: {
        textDecoration: 'none',
    },
    linkColor: {
        textDecoration: 'none',
        color: 'black'
    }
}));

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div >
            { props.isAuth
                ? 
                // <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                <div className={classes.loginButton}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><NavLink to='/profile' className={classes.linkColor}>My page</NavLink></MenuItem>
                        <Divider variant="middle" />
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={props.logout}>Log out</MenuItem>
                    </Menu>
                </div>
                : 
                // <NavLink to={'/login'}>Login</NavLink> }
                <NavLink className={classes.loginButton} to={'/login'}>
                    <Button style={{color: 'white'}}>Login</Button>
                </NavLink>
            }
 
        </div>
    )
}

export default Header;

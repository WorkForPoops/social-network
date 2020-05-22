import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.jpg";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from '../../../types/types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Divider } from '@material-ui/core';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom: '20px',
    },
    input: {
        display: 'none',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    profileInfo: {
        textAlign: "left"
    }
}));

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const classes = useStyles();

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div className={classes.root}>
                <Grid container spacing={2}>
                    {window.innerWidth >= 600 && 
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                            {isOwner && 
                            <div>   
                                <input className={classes.input} id="icon-button-file" type="file" onChange={onMainPhotoSelected}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                    </IconButton>
                                </label>
                            </div>
                            }
                        </Paper>
                    </Grid>
                    }
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>
                            { editMode
                            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                            : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }
                            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                        </Paper>
                    </Grid>
                </Grid>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    const classes = useStyles();

    return ( 
        <div>
            <Grid container spacing={3}>
                <Grid item xs={10} className={classes.profileInfo}>
                    <div>
                        <b>Full name</b>: {profile.fullName}
                    </div>
                    <Divider light />
                    <div>
                        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
                    </div>
                    {profile.lookingForAJob &&
                    <div>
                        <b>My professional skills</b>: {profile.lookingForAJobDescription}
                    </div>
                    }

                    <div>
                        <b>About me</b>: {profile.aboutMe}
                    </div>
                    <div>
                        <b>Contacts</b>: {
                        Object
                            .keys(profile.contacts)
                            .map((key)  => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
                </Grid>    
            </Grid>
        </div>
    )
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;

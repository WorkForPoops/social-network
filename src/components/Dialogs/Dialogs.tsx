import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from '../../redux/dialogs-reducer';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
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

const Dialogs: React.FC<PropsType> = (props) => {
  const classes = useStyles();

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
  let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id} /> );

  let addNewMessage = (values: NewMessageFormValuesType) => {
      props.sendMessage(values.newMessageBody);
  }

  return (
    <Container>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        { dialogsElements }
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <div>{ messagesElements }</div>
                        <AddMessageForm onSubmit={addNewMessage} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </Container>
  );
}

export default Dialogs;
import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal} from '@mui/material';
import db from './firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
      setOpen(true);
  };

  const updateTodo = () => {
      //update todo with new input text
      //merge option for firebase prevents removing the id but rather append new
      db.collection('todos').doc(props.todo.id).set({
        todo: input
      }, {merge:true})

      setOpen(false);
  }

  return (
    <>
    <Modal
    open={open}
    onClose={e => setOpen(false)}
    >
        <div className={classes.paper}>
        <h1>Edit Modal</h1>
        <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
        <Button onClick={updateTodo}>Update Todo</Button>
    </div>
    </Modal>
    
    <List>
        <ListItem>
            <ListItemAvatar>
              {/* <li>{props.text}</li> */}
              {/* instead of this use MUI list item */}
        <ListItemText primary={props.todo.todo} secondary={props.text}/>
        </ListItemAvatar>
        </ListItem>

        <button onClick={e => setOpen(true)}>Edit</button>
        <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
    </List>
    </>
  )
}

export default Todo;

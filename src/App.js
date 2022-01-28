import './App.css';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {

  // const [todos, setTodos] = useState(['First thing to do', 'second thing to do']);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(''); // set it to be clear
  //console.log(input);

  // when app loads, we need to listen to DB and fetch mew topdos as they get added
 useEffect(() => {
    //what happens on app load
    //every time it changes snaps a snapshot of db and gives it to you
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //map throuhg all the docs and give back all the properties of the doc in object and covert it into string to show it doc.data().todo
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  //on button click do the following
  const addTodo = (event) => {
    console.log('Note:', 'Im working');
    event.preventDefault(); //stop the refresh

    //calls snapshot which then updates our todos
    db.collection('todos').add({
     todo: input,
     //add timestamp so each elements gets on top (add orderBy to useEffect)
     timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //create an array but keep what is in it when pushing new items
    //use spread ...
    setTodos([...todos, input]);
    setInput(''); //clear up the input after adding item
  }

  // maping the input to the state <input val={input}/> 
  //then every time you type update the state
  // use onChange function to capture the event 
  //get the event that was entered and get the value and store it in variable input (event.target.value)
  //setInput will rerender  with the value
  //add to form so we have the submit option
 //add it to form but keep in mind that the submit does not refresh page bcs it will clear
 // add it to the todo -> event.preventDefault(); stop the refresh
 //add MUI components button
 // add disabled to be when no input
 // add form control and name = input label copy the input to Input 
 //add imports (formcontrol, input..)
  return (
    <div className="App">

     <h1>Todo list</h1>
    <form>
      {/* <input val={input} onChange={event => setInput(event.target.value)}/>  */}

      <FormControl>
         <InputLabel>Write a todo</InputLabel>
         <Input val={input} onChange={event => setInput(event.target.value)}/> 
      </FormControl>

      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        Add Todo
      </Button>
      {/* <button type="submit" onClick={addTodo}>Add todo</button> */}
    </form>
    
     <ul>
       {todos.map(todo => (
         <Todo todo={todo}/>
        //  <li>{todo}</li>
       ))}
     </ul>
    </div>
  );
}

export default App;

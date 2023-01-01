import React, { useCallback, useEffect } from "react";
import TodoList from "./component/ToDoList"
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import { useState } from "react";
import { v4 } from "uuid";



function App() {
  const [todoList, setTodoList] = useState([]); //array
  const [textInput, setTextInput] = useState(""); //string

    const TODO_APP_STORAGE_KEY = 'TODO_APP';

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  },[]);

  useEffect(() => {localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))}, [todoList]);


  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value)},[]
    );
  

  const onAddBtnClick = useCallback(
    (e) => {
    setTodoList([
      {id: v4(), name: textInput, isCompleted: false},
      ...todoList]);
      setTextInput("")
    },
      [textInput, todoList]
    );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) => prevState.map((todo) => todo.id === id ? {...todo, isCompleted: true} : todo ));
  },[]);

  return(
    <div>
      <h3>Danh sach can lam</h3>
      <Textfield 
        name="add-todo" 
        placeholder="Them viec can lam"  
        elemAfterInput={
          <Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>
            Add
          </Button>}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>

      <TodoList todoList={todoList}  onCheckBtnClick={onCheckBtnClick}/>
    </div>
  )
}

export default App; 


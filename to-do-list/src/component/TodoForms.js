import React, { useState } from 'react'
import { useTodoContext } from '../context/TodoProvider'

export default function TodoForms() {
    const {getNumberOfTodoItems,addTodo}=useTodoContext();
    const [todoItem,setTodoItem]=useState("")
    const handleOnSubmit=(e) =>{
        e.preventDefault();
        if(!todoItem){
            return;
        }
        addTodo(todoItem);
        setTodoItem("")
        
        // console.log(todoItem);
    }
  return (
    <form onSubmit={handleOnSubmit}>
        <h3>Number of todo items: {getNumberOfTodoItems()}</h3>
        <input type='text' value={todoItem} onChange={e=> setTodoItem(e.target.value)}/>
        <button type='submit'>Submit</button>
    </form>
  )
}

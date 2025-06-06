import {useState} from "react"
import { v4 as uuid } from 'uuid';
import "./Todo.css"
export default function Todo(){
    let [todos , setTodo] = useState([{task:"sample Task", id : uuid() , done: false , createdAt : new Date()}]);
    let [newTodo, setNewtodo] = useState("");
    let newTask = (event)=>{
        setNewtodo(event.target.value);
    }

    let addTask = ()=>{
        setTodo([...todos , {task: newTodo , id: uuid() , done: false , createdAt : new Date()}]);
        setNewtodo("");
    }
   //Deleting To Do
    let deleteTodo = (id)=>{
             setTodo(todos.filter((todo)=>todo.id!=id))
    }

    let editTodo = (id , currText)=>{
       let newText = prompt("Edit your Task");
       console.log(newText);
        if(newText!==null && newText.trim()!== ""){
            setTodo(todos.map((todo)=>{
                if(todo.id === id){
                    return {...todo , task : newText}
                } 
                else{
                     return todo ;
                }
            }))
        }
    }

    let done = (id)=>{
             setTodo( todos.map((todo)=>{
               if(todo.id == id){
                   return {
                      ...todo ,
                      done : true
                   }
               } else {
                return todo
               }
               
             }));
    }
    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <input type="text" placeholder="Add Your Task" value={newTodo} onChange={newTask}/>
            <br />
            <br />
            <button onClick={addTask}>Add</button>
            <br />
            <hr />
            <ul>
                   {
                    todos.map((todo)=>{
                    return <li key={todo.id} >
                           <span style={{textDecoration : todo.done ? "line-through" : "none"}}> {todo.task}:
                            &nbsp; &nbsp;
                            <small>Added at :{new Date(todo.createdAt).toLocaleString()}</small>
                            <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                             &nbsp; &nbsp;
                           <button onClick={()=>editTodo(todo.id , todo.task)}>Edit To DO </button>
                        <button onClick={()=>done(todo.id)}>Mark as Done</button>
                           </span>
                            </li>
                    })
                   }
        
            </ul>
        </div>
    )
}
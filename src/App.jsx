import { useEffect, useState } from "react";
import Nav from "./componanent/Nav";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';

function App() {
const [todo,setTodo]=useState('');
const [todos,setTodos]=useState([]);
const [showFinised,setShowFinised]=useState(true);

useEffect(()=>{
let storedTodos =localStorage.getItem("todos")
if(storedTodos ){
  let todos = JSON.parse(storedTodos)
  setTodos(todos)
}
},[])

const saveTodos=()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

const hendleEdit=(id)=>{
let t = todos.filter(i=>i.id===id)

setTodo(t[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id!==id
  })
  setTodos(newTodos)
  saveTodos()
}
const hendleDelete=(id)=>{
  let newTodos = todos.filter(item=>{
    return item.id!==id
  })
  setTodos(newTodos)
  saveTodos()
}
const hendleAdd=()=>{
  setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
 
  setTodo("")
  saveTodos()
  
}
const handelChange=(e)=>{
  setTodo(e.target.value)
}
const handleCheck = (id)=>{
   
  let index = todos.findIndex((item)=>{
return item.id===id
  })
  let newTodo = [...todos];
  newTodo[index].isCompleted=!newTodo[index].isCompleted;
  setTodos(newTodo)
  saveTodos()
}
const showChecked =()=>{
setShowFinised(!showFinised)

}
  return (
    <>
      <Nav />

      <div className="md:w-3/4 md:mx-auto my-10 shadow-lg shadow-[#333]  bg-purple-200 min-h-[80vh] mx-2 flex flex-col items-center rounded-md ">
        <h1 className="text-center font-bold text-xl my-3 capitalize">iTask Manage your task</h1>
        <div className="w-full flex justify-center">
          <input type="text" onChange={handelChange} value={todo} className="w-2/4 rounded-full p-2 mx-3 " />
          <button onClick={hendleAdd} disabled={todo.length<3}className="bg-purple-600 px-4 text-white mx-3 py-2 disabled:bg-purple-400 font-bold rounded-full hover:bg-purple-700">Add</button>
        </div>
        <div className="mt-3">
          <input type="checkbox" onChange={showChecked} checked={showFinised} /> Show Finised
        </div>
        <div className="w-3/4 border border-[#8b888841] my-4"></div>
        <h1 className="text-center font-bold text-xl my-3 capitalize">Your Todos</h1>
      {todos.length===0?<p className="text-red-500 font-[600]">Todo empty</p>:
        todos.map((item)=>{
          
          return ( (showFinised || !item.isCompleted) &&
            <div key={item.id} className="flex md:w-3/4 mt-10  w-full mx-2 justify-between   p-2">
            <div className="flex  gap-2    w-1/2 p-2">
              <input type="checkbox"  onChange={() => handleCheck(item.id)} checked={item.isCompleted}  id="" />
              <p className={item.isCompleted?"line-through":""}>{item.todo}</p>
            </div>
              <div className="flex gap-2   w-1/2  md:justify-end justify-start items-center">
                <button onClick={()=>hendleEdit(item.id)} className="bg-purple-600 px-4 text-white py-2 font-bold rounded-full hover:bg-purple-700">Edit</button>
                <button  onClick={()=>hendleDelete(item.id)}  className="bg-purple-600 px-4 text-white mx-3 py-2 font-bold rounded-full hover:bg-purple-700">Delete</button>
              </div>
            </div>
          )
        })
      }
   </div>
    </>
  );
}

export default App;

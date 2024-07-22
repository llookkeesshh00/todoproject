import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  //fuctions for JS
  
  useEffect(() => {
     let todostring =localStorage.getItem("todos");
     if(todostring)
     {
      let t= JSON.parse(localStorage.getItem("todos"))
     settodoarray(t);
     }
     
   }, [])
   

  const [todo, settodo] = useState("");
  const [todoarray, settodoarray] = useState([]);
  const [showfinished,setshowfinished] = useState(false);
  const saveToLS= ()=>{
   localStorage.setItem("todos",JSON.stringify(todoarray)) 
  }


  const handleEdit = (e) => {
    let id=e.target.name;
    let ind=todoarray.findIndex((i)=>i.id==id)
    let newtodo=[...todoarray]
    newtodo = newtodo.filter(obj => obj.id !== id);
     settodoarray(newtodo)
    settodo(todoarray[ind].todo);
    saveToLS()
   }



  const handleDelete = (e) => {
    let id = e.target.name;
    console.log(id)
    let newtodo=[...todoarray]
    newtodo = newtodo.filter(obj => obj.id !== id);
     settodoarray(newtodo)
    saveToLS()
  }

  const handleAdd = () => 
  {
    settodoarray([...todoarray, { id: uuidv4(), todo: todo, isCompleted: false }])
    settodo("")
    saveToLS()

  }


  const handleChange = (e) => 
  {
    settodo(e.target.value)
  }
  const togglefinish = (e) => 
  {
  
  }



  const handleCheckbox = (e) => {

    let id = e.target.name;
    console.log(id)
    let index = todoarray.findIndex((item) => {
      return item.id == id;
    })
    let newtodoarray = [...todoarray]
    newtodoarray[index].isCompleted = !newtodoarray[index].isCompleted;
    settodoarray(newtodoarray)
  }


  return (
    <div className="main ">
      <Navbar />
      <div className="container bg-blue-200 p-2 flex-col w-2/3 mx-auto mt-5 rounded-lg">
        <div className="addtodo">
          <h1 className='text-black text-lg font-bold font-serif'>Add Todo</h1>
          <input type="text" onChange={handleChange} value={todo}  className='w-2/3 text-black p-2 font-medium  outline-none' />
          <button onClick={handleAdd} type="button" disabled={todo.length<3} className=" disabled:bg-cyan-500  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mx-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
        </div>


        <h1 className='text-black text-lg font-bold font-serif  mt-5'>Your Todos</h1>
        <div className="todos"> 
        {/* <input type="checkbox" name="" id=""  className='ml-4' onChange={togglefinish} /> Show finished */}
          <div className="yourtodos flex-col  p-2 border-black rounded-lg bg-blue-300  ">
            {todoarray.length==0  && <div className='m-5 '> NO TODOS TO DISPLAY </div>}
            
            
            
            
            {todoarray.map(t => {
              return <div key={t.id} className="todolist flex gap-2 p-2 justify-between mx-auto">
                <div className="v flex gap-4">
                <input name={t.id} type="checkbox" onClick={handleCheckbox} value={t.isCompleted} id="" />
                <div className={t.isCompleted ? "line-through font-medium" : " font-bold"}>{t.todo}</div>
                </div>
                <div className="f flex gap-4">
                  <button type="button" name={t.id} onClick={handleEdit} className="text-white bg-blue-700 p-3  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3 py-1 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><FaEdit /></button>
                  <button type="button" name={t.id} onClick={handleDelete} className="text-white bg-blue-700 p-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><MdDelete /></button>
                </div>

              </div>
            })}

          </div>
        </div>

      </div>
    </div>
  )
}

export default App

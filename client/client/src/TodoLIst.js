import axios from 'axios'
import {Modal, Form} from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"


function TodoLIst() {
  const [todos, setTodos] = useState([]) // saving todo from db to local state todos
  const [show, setShow] = useState(false);
  const [updatedTodo,setUpadtedTodo]= useState({})

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then(res => {
        console.log(res)
        setTodos(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  // const handleUpdate =() =>setUpadtedTodo(updatedTodo);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const onClickHandler = () => navigate("/create")
  const handleChange=(e)=>{


     const { name, value}=e.target
      
     setUpadtedTodo((pre)=>{
      
      return{
        ...pre,
         [name]:value,
      }
     })
     console.log(updatedTodo)
     
  }
  const deleteTodo = (id) => {
    // console.log(id);
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(res => res.data)// refresh page OR window.location.reload()
      .catch(err => console.log(err))
      window.location.reload()
  }
  //  navigate('/delete' )

  const openModel = (todo) => {
    handleShow();
    console.log(todo);
     setUpadtedTodo(todo)
  
  }
   const updateTodo=()=>{
    axios.put(`http://localhost:3000/update/${updatedTodo._id}`, updatedTodo)
        .then(res => console.log(res))
        .catch(err => console.log(err))
     handleClose()
     window.location.reload()
   }

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <Button style={{ margin: "1.5rem", width: "rem" }} variant="outline-secondary" onClick={onClickHandler}>back</Button>
      <h1>TodoList</h1>


      {todos.map(item => {
        return (
          <div key={item._id} style={{ border: '2px soild red ', marginBottom: " 1rem", borderRadius: "8px", padding: '10px' }} >
            <h4>{item.title}</h4>
            <p>{item.description}</p>

            <div style={{ padding: "10px" }}>
              <Button variant='outline-info' style={{ marginRight: "12px" }} onClick={()=>openModel(item) }>Update
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Form>
                  
                  <FormControl style={{ marginBottom:"1rem"}} 
                   type="text" 
                
                   name="title"
                   value={updatedTodo.title ? updatedTodo.title :""}
                   onChange={ handleChange} />
                  <FormControl placeholder='New Description'
                  name="description"
                   value={updatedTodo.description ? updatedTodo.description :""}  
                     onChange={ handleChange}  />
              
                  </Form>
                  </Modal.Body>
               
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={updateTodo}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button variant='outline-danger' onClick={() => deleteTodo(item._id)}> Delete</Button></div>
          </div>)

      })}




    </div>
  )
}

export default TodoLIst
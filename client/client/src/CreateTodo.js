import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
export default function Todo() {
  const [todo, setTodo] = useState({
    title: "",
    description: " "
  })
  
 
  const navigate = useNavigate()
  const onClickHandler = () => navigate(-1)
   const handleChange=(e)=>{
     const { name, value}= e.target
      setTodo((prev )=> {
        return{
          ...prev,
          [name]:value
        }
      }
       
      )
      //setTodo({...todo, [name]:value})   safe after react 17
   }
    const handleClick=(e)=>{
       e.preventDefault()
      console.log(" submit")
      axios.post("/create", todo)
       .then(res=> console.log(res))
       .catch(err=> console.log(err))
       navigate('/todos')

}  
 //check input value
  //  useEffect(()=>{
  //   console.log(todo);
  // },[todo])
  
  return (
    <div  >
      <Button style={{ margin: "1.5rem", width: "rem" }} variant="outline-secondary" onClick={onClickHandler}>back</Button>
      <div style={{margin:"0 auto", width: "90%" , display: 'flex', flexDirection:"column", alignContent:"center", justifyContent:"center"}} >
        <h1 style={{  textAlign: "center" }} > Create Todo</h1>
        <Form style={{ marginLeft:"20%", width: "60%" }}>
          <Form.Group >
            <Form.Label>Tittle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title" style={{ marginBottom: " 1rem" }}
              value={todo.title}
              onChange={handleChange} />

            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
             placeholder="Todo" 
             name="description" 
             value={todo.description}
             style={{ marginBottom: " 1rem" }} 
             onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={ handleClick}>
            Submit
          </Button>
        </Form></div>
    </div>
  )
}

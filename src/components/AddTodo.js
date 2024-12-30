import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { TODO_ADD } from '../api-routes';
import constants from '../constants';
import { toast, Toaster } from 'react-hot-toast';


function TodoForm({getTodoList}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors,setErrors]=useState('');
  const initialFormData = {
    title: "",
    description: "",
  }
  const [todoData, setTodoData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  const todoSave=async(event)=>{
    
    event.preventDefault()
    await axios.post(`${constants.baseURL}${TODO_ADD}`,todoData)
    .then((response) => {
          getTodoList()
          setShow(false)
          setErrors('')
          setTodoData(initialFormData)
          toast.success('Todo added successfully!', {
            autoClose: 3000,
          });

        })
        .catch((error) => {
            setErrors((error.response.data.errors)[0]); 
            console.log(errors) 
        });

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Todo
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={todoSave}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Todo Name</Form.Label>
              <Form.Control
                className={`${errors.title ? 'is-invalid' : ''}`} 
                onChange={handleChange}
                name='title'
                type="text"
                placeholder=""
                autoFocus
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </Form.Group>
            <Form.Group
              
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                 name='description'
                 onChange={handleChange}
                 as="textarea"
                 className={`${errors.description ? 'is-invalid' : ''}`} 
                  rows={3} />
                   {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
                 <Button variant="primary" type='submit'>
            Save 
          </Button>
            </Form.Group>
          </Form>
         
        </Modal.Body>
      </Modal>
      <Toaster  />

    </>
  );
}

export default TodoForm;
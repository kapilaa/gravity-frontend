import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { TODO_UPDATE } from '../api-routes';
import constants from '../constants';
import { toast, Toaster } from 'react-hot-toast';

function EditModal({itemData,getTodoList}) {
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error,setError]=useState('');
  const [text, setText] = useState(itemData.description);
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

  const todoUpdate=async(event)=>{
    console.log(text)
    event.preventDefault()
    await axios.put(`${constants.baseURL}${TODO_UPDATE}${itemData._id}`,todoData,{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then((response) => {
          getTodoList()
          setShow(false)
          toast.success('Todo updated successfully!', {
            autoClose: 3000,
          });
        })
        .catch((error) => {
          setError('Error fetching data');  
        });

  }
  const handleChanges = (event) => {
    setText(event.target.value);
  };

useEffect(()=>{
    setTodoData(itemData)
},[])
  return (
    <>
      <Button  className='btn btn-success' variant="primary" onClick={handleShow}>
       Update
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={todoUpdate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Todo Name</Form.Label>
              <Form.Control
                value={todoData.title}
                name='title'
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Todo Description</Form.Label>
              <Form.Control onChange={handleChanges}  name='desceription' value={text} as="textarea" rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
                 <Button variant="primary" type='submit'>
            Update 
          </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
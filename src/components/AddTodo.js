import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { AUTH_LOGOUT, TODO_ADD, TODO_SEARCH,TODO_STATUS_FILTER } from '../api-routes';
import constants from '../constants';
import { toast, Toaster } from 'react-hot-toast';
import { Row, Col } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';

function TodoForm({getTodoList,setTodoList}) {
  const navigate=useNavigate()
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedOption, setSelectedOption] = useState('');
  
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

  
/**
 * Start
 * Search todo with name/title
 */
  const handleSearch=async(e)=>{
    const searchVal= e.target.value;
    if(searchVal!=''){
    setErrors(''); 
    await axios.post(`${constants.baseURL}${TODO_SEARCH}`,{search:searchVal},{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then((response) => {
         if(response.data.success==false){  
            setTodoList({}) 
            setErrors(response.data.message); 
         }else{
            setTodoList(response.data.data)
         }
        })
        .catch((error) => {
            setErrors(errors); 
            console.log(errors) 
        });
    }else{
        getTodoList()
    }
  }
  /**
 * Search todo with name/title
 * End
 */


  /**
 * Start
 * Status Filter todo with completed/pending
 */
  const handleStatus=async(e)=>{
    
    const getStatusVal=e.target.value;
    setSelectedOption(getStatusVal)
        if(getStatusVal=='all'){
            getTodoList()
        }else{
            await axios.post(`${constants.baseURL}${TODO_STATUS_FILTER}`,{status:getStatusVal},{headers:{
                Authorization:`Bearer ${token}`
            }})
            .then((response) => {
                
                
                 if(response.data.success==false){  
                    setTodoList({}) 
                 }else{
                    setTodoList(response.data.data)
                 }
                })
                .catch((error) => {
                    setErrors(errors); 
                    console.log(errors) 
                });

        }

  }

 /**
 * Status Filter todo with completed/pending
 * End
 */


 /**
 * Start
 * Save todo 
 */
  const todoSave=async(event)=>{
    
    event.preventDefault()
    await axios.post(`${constants.baseURL}${TODO_ADD}`,todoData,{headers:{
        Authorization:`Bearer ${token}`
    }})
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

/**
 * Save Todo
 * End
 */


 /**
 * Start
 * Logout User
 */
  const logoutFunction=async()=>{

    await axios.post(`${constants.baseURL}${AUTH_LOGOUT}`,{},{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then((response) => {
        toast.success('You have logged out successfully!', {
            autoClose: 3000,
          });
    setTimeout(() => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')  
        navigate('/login'); 
    }, 1000);

        })
        .catch((error) => { 
            console.log(errors) 
        });
  }


/**
 * Save todo 
 * End
 */

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Todo
      </Button>

      <Button style={{float:"right"}} variant="primary" onClick={logoutFunction}>
        Logout
      </Button>
      <Row>
        <Col md={6}> 
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                className='search' 
                onChange={handleSearch}
                name='search'
                type="text"
                placeholder="Type to search todo...."
                autoFocus
              />
              
              {errors && <div style={{display:'block'}} className="invalid-feedback">{errors}</div>}
              </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group controlId="dropdownForm">
          <Form.Label></Form.Label>
          <Form.Select
            value={selectedOption}
            onChange={handleStatus}
            aria-label="Select an option"
          >
            <option value="">Select Status</option>
            <option value="all">Show All</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </Form.Select>
        </Form.Group>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} size="lg">
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
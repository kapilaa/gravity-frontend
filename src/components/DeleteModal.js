import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import constants from '../constants';
import { TODO_DELETE } from '../api-routes';
import { toast, Toaster } from 'react-hot-toast';

function DeleteModal({idToDelete,getTodoList}) {
  const [show, setShow] = useState(false);
  const [error,setError]=useState('');
  const deleteTodo=async(delete_id)=>{
    
    await axios.delete(`${constants.baseURL}${TODO_DELETE}${delete_id}`)
    .then((response) => {
          getTodoList()
          setShow(false)
          toast.error('Todo deleted successfully!', {
            autoClose: 3000,
          });
        })
        .catch((error) => {
          setError('Error fetching data');  // Set error state in case of failure
        });
       
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='btn btn-danger' variant="primary" onClick={handleShow}>
       Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you really want to delete this Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
          <Button variant="primary" onClick={()=>deleteTodo(idToDelete)}>
            Yes 
          </Button>
          <Button className="btn btn-danger" >
            No 
          </Button>
          </Form>
       
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
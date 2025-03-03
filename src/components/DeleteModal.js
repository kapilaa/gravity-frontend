import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import constants from '../constants';
import { PRODUCT_DELETE } from '../api-routes';
import { toast, Toaster } from 'react-hot-toast';

function DeleteModal({idToDelete,getproductList}) {
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const [error,setError]=useState('');
  const deleteProduct=async(delete_id)=>{
    
    await axios.delete(`${constants.baseURL}${PRODUCT_DELETE}${delete_id}`,{headers:{
      Authorization:`Bearer ${token}`
  }})
    .then((response) => {
          getproductList()
          setShow(false)
          toast.error('Product deleted successfully!', {
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
          <Modal.Title>Do you really want to delete this Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
          <Button variant="primary" onClick={()=>deleteProduct(idToDelete)}>
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
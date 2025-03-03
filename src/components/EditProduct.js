import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { PRODUCT_UPDATE } from '../api-routes';
import constants from '../constants';
import { toast, Toaster } from 'react-hot-toast';

function EditModal({itemData,getproductList}) {
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error,setError]=useState('');
  const [errors,setErrors]=useState('');
  const [text, setText] = useState(itemData.description);
  const initialFormData = {
    title: "",
    price: "",
    category:"",
    description: "",
  }
  
  const [productData, setProductData] = useState(initialFormData);
  useEffect(() => {
    if (itemData) {
      setProductData({
        name: itemData.name,
        price: itemData.price,
        category:itemData.category,
        description:itemData.description
      });
    }
  }, [itemData]);

  const [imageBase64, setImageBase64] = useState("");
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert image to Base64
      reader.onload = () => {
        setImageBase64(reader.result); // Store Base64 string in state
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const productUpdate=async(event)=>{
    event.preventDefault()
    await axios.patch(`${constants.baseURL}${PRODUCT_UPDATE}${itemData._id}`,productData,{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then((response) => {
          getproductList()
          setShow(false)
          toast.success('product updated successfully!', {
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
    setProductData(itemData)
},[])
  return (
    <>
      <Button  className='btn btn-success' variant="primary" onClick={handleShow}>
       Update
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={productUpdate}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                className={`${errors.title ? 'is-invalid' : ''}`} 
                onChange={handleChange}
                name='title'
                type="text"
                placeholder=""
                autoFocus
                value={productData.title}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                className={`${errors.price ? 'is-invalid' : ''}`} 
                onChange={handleChange}
                name='price'
                type="number"
                placeholder=""
                autoFocus
                value={productData.price}
              />
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Category</Form.Label>
              <Form.Control
                className={`${errors.category ? 'is-invalid' : ''}`} 
                onChange={handleChange}
                name='category'
                type="text"
                placeholder=""
                autoFocus
                value={productData.category}
              />
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                className={`${errors.image ? 'is-invalid' : ''}`} 
                onChange={handleImageChange}
                name='image'
                type="file"
                placeholder=""
                autoFocus
              />
              {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              <img src={itemData.image} height="100" width="100" />
            </Form.Group>
            <Form.Group
              
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                 value={productData.description}
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
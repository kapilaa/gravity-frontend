import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { AUTH_REGISTER } from "../api-routes";
import axios from "axios";
import constants from "../constants";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  const [toaster,setToaster]=useState('')
  
  const handleSubmit =async (e) => {
    setError('')
    e.preventDefault();
    await axios.post(`${constants.baseURL}${AUTH_REGISTER}`,{name:name,email:email,password:password})
    .then((response) => {
         console.log(response.data.success)
          if(response.data.success==false){
            setError(response.data.message)
          }else{
            setError('')
            setToaster(response.data.message+' Please wait....')
            setTimeout(()=>{
                navigateFunc()
            },2000)
          }
        })
        .catch((error) => {
        });
  };
   
  const navigateFunc=()=>{
        navigate('/login');
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  return (
    <>
    
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh",backgroundImage: 'url("https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg")',backgroundRepeat  : 'no-repeat',backgroundSize: 'cover' }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="login-form p-4 border rounded shadow-sm">
            <h3 className="text-center mb-4">Register</h3>
            {error &&
              <div style={{display:'block'}} className="invalid-feedback">{error}</div>
            }
            {toaster &&
              <h5 className="text text-success">{toaster}</h5>
            }
            
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Login
              </Button>
            </Form>
            <Link to='../login' >Login</Link>
          </div>
        </Col>
      </Row>
    </Container>
    </>
   
  );
};

export default Register;


import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import EditModal from '../components/EditProduct';
import DeleteModal from '../components/DeleteModal';
import { Badge, Form } from 'react-bootstrap';
import { PRODUCT_CHANGE_STATUS } from '../api-routes';
import axios from 'axios';
import constants from '../constants';
import toast from 'react-hot-toast';

function ProductList({productListData,getProductList}) {
    const token = localStorage.getItem('authToken');
    const [selectedOption, setSelectedOption] = useState('');

    const updateStatus=async(e,changeId)=>{
        const getStatusVal=e.target.value;
        const productData={change_by:getStatusVal}
        await axios.post(`${constants.baseURL}${PRODUCT_CHANGE_STATUS}${changeId}`,productData,{headers:{
            Authorization:`Bearer ${token}`
        }})
        .then((response) => {
          getProductList()
              toast.success('product updated successfully!', {
                autoClose: 3000,
              });
            })
            .catch((error) => { 
            });
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Description</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
{
   Array.isArray(productListData) && (productListData).length > 0 ? (
    productListData.map((item)=>(
          <tr key={item._id}>
            <td>1</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td><img src={item.image} height="100" width="100" /></td>
            <td>{item.description}</td>
            <td>
                <div style={{padding: '22px'}}>
                {item.isCompleted?<Badge bg="success">Completed</Badge>:<Badge bg="warning">Pending</Badge>}
                </div>
           </td>
            <td>
        <Form.Group controlId="dropdownForm">
          <Form.Label></Form.Label>
          <Form.Select
            value={selectedOption}
            onChange={(e)=>updateStatus(e,item._id)}
            aria-label="Select an option"
          >
            <option value="">Select Status</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </Form.Select>
        </Form.Group>
            </td>
           
            <td><EditModal getproductList={getProductList} itemData={item} /> <DeleteModal getproductList={getProductList} idToDelete={item._id} /></td>
          </tr>
                ))
            )
            : (
                <tr>
                <td colSpan={6} style={{textAlign:"center"}}>   <p>No data available.</p></td>
                </tr>
            )
            }
          
         
        </tbody>
      </Table>
    );
  }
  
  export default ProductList;
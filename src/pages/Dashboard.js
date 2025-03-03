import '../App.css';
import ProductList from '../pages/Products';
import ProductForm from '../components/AddProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../constants';
import { PRODUCT_LISTS } from '../api-routes';
import PageLoader from '../components/page-loader';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_CHECK } from '../api-routes';

function Dashboard() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([])
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');

  const getProductList = async () => {

    await axios.get(`${constants.baseURL}${PRODUCT_LISTS}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data)
        setProductList(response.data.data);
        setLoading(true)
      })
      .catch((error) => {
        setError('Error fetching data');
      });

  }
  const checkValidToken = async () => {
   
    await axios.get(`${constants.baseURL}${AUTH_TOKEN_CHECK}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.status)
        if (response.data.status == false) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
          navigate('/login');
        }
      })
      .catch((error) => {
        setError('Error fetching data');
      });

  }
  useEffect(() => {
    checkValidToken()
    getProductList()

  }, [])

  useEffect(() => {

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (!loading) {
    return <PageLoader />;
  }


  return (
    <div className="container">
      <h5 style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>Hello
         <span style={{ marginLeft: '5px' }}> 
        <strong className='text text-success'> {JSON.parse(userData).name}</strong>
        </span>
      </h5>
      <ProductForm getProductList={getProductList} setProductList={setProductList} />
      <ProductList getProductList={getProductList} productListData={productList} />
    </div>
  );
}

export default Dashboard;

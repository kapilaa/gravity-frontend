import '../App.css';
import TodoList from '../pages/TodoList';
import TodoForm from '../components/AddTodo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../constants';
import { TODO_LISTS } from '../api-routes';
import PageLoader from '../components/page-loader';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_CHECK } from '../api-routes';

function Dashboard() {
  const navigate = useNavigate();
  const [todoList,setTodoList]=useState([])
  const [error,setError]=useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  
  const getTodoList=async()=>{

    await axios.get(`${constants.baseURL}${TODO_LISTS}`,{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then((response) => {
          setTodoList(response.data.data); 
          setLoading(true)
        })
        .catch((error) => {
          setError('Error fetching data');  
        });
       
  }
  const checkValidToken=async()=>{

    await axios.get(`${constants.baseURL}${AUTH_TOKEN_CHECK}`,{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then((response) => {
        console.log(response.data.status)
        if(response.data.status==false){
            localStorage.removeItem('authToken')
            localStorage.removeItem('userData')            
            navigate('/login'); 
        }
        })
        .catch((error) => {
          setError('Error fetching data');  
        });
       
  }
  useEffect(()=>{
    
    getTodoList()
    checkValidToken()
    
  },[])

   useEffect(() => {
      
      if (!token) {
        navigate('/login'); 
      }
    }, [navigate]);

  if (!loading) {
    return<PageLoader />;
  }


  return (
    <div className="container">
        <h5 style={{justifyContent:'center',alignItems:'center',display:'flex'}}>Hello <span style={{marginLeft:'5px'}}> <strong className='text text-success'> {JSON.parse(userData).name}</strong></span></h5>
       <TodoForm getTodoList={getTodoList} setTodoList={setTodoList}  />
       <TodoList  getTodoList={getTodoList}  todoListData={todoList} />
    </div>
  );
}

export default Dashboard;

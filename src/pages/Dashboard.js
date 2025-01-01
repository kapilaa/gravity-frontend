import '../App.css';
import TodoList from '../pages/TodoList';
import TodoForm from '../components/AddTodo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../constants';
import { TODO_LISTS } from '../api-routes';
import PageLoader from '../components/page-loader';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [todoList,setTodoList]=useState([])
  const [error,setError]=useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
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
  useEffect(()=>{
    
    getTodoList()
    
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
       <TodoForm getTodoList={getTodoList} setTodoList={setTodoList}  />
       <TodoList  getTodoList={getTodoList}  todoListData={todoList} />
    
    </div>
  );
}

export default Dashboard;

import logo from './logo.svg';
import './App.css';
import TodoList from './pages/TodoList';
import TodoForm from './components/AddTodo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import constants from './constants';
import { TODO_LISTS } from './api-routes';
import PageLoader from './components/page-loader';

function App() {
  const [todoList,setTodoList]=useState([])
  const [error,setError]=useState('');
  const [loading, setLoading] = useState(true);

  const getTodoList=async()=>{

    await axios.get(`${constants.baseURL}${TODO_LISTS}`)
    .then((response) => {
          setTodoList(response.data.data); 
          console.log(response.data.data);
          setLoading(true)
        })
        .catch((error) => {
          setError('Error fetching data');  // Set error state in case of failure
        });
       
  }
  useEffect(()=>{
    
    getTodoList()
    
  },[])

  if (!loading) {
    return<PageLoader />;
  }


  return (
    <div className="container">
       <TodoForm getTodoList={getTodoList} />
       <TodoList  getTodoList={getTodoList}  todoListData={todoList} />
    
    </div>
  );
}

export default App;

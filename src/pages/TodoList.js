import Table from 'react-bootstrap/Table';
import EditModal from '../components/EditTodo';
import DeleteModal from '../components/DeleteModal';

function TodoList({todoListData,getTodoList}) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
{
   Array.isArray(todoListData) && (todoListData).length > 0 ? (
    todoListData.map((item)=>(
          <tr key={item._id}>
            <td>1</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.isCompleted?'Completed':'pending'}</td>
            <td><EditModal getTodoList={getTodoList} itemData={item} /> <DeleteModal getTodoList={getTodoList} idToDelete={item._id} /></td>
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
  
  export default TodoList;
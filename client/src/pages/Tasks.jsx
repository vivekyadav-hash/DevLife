import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [category , setCategory] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    const fetchTasks =   async () => {
         const response = await axios.get( 'http://localhost:8080/api/tasks' ,{
        headers :{
        Authorization : `Bearer ${token}`
        }
       });
       setTasks(response.data.tasks);
    };

    useEffect(() => {
       
       fetchTasks();
    }, []);



    const handleDelete = async (id) =>{
           await axios.delete(`http://localhost:8080/api/tasks/${id}` , {
            headers : {Authorization: `Bearer ${token}`}
           }
           );fetchTasks();
        }
         
         
    const handleLogout = () => {
        
        // clear token and navigate to login
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:8080/api/tasks' ,
        {title , description ,category  },
       {headers : {Authorization : `Bearer ${token}`
    }})

    const response = await axios.get('http://localhost:8080/api/tasks' , {
        headers: {Authorization : `Bearer ${token}`}
    })
    setTasks(response.data.tasks);
        
        }

    return (
        <div>
            <h1>Tasks</h1>
            <form onSubmit={handleOnSubmit}>
               <input  placeholder='title' onChange={ (e) => setTitle(e.target.value)}></input>
                <input placeholder='description' onChange={ (e) => setDescription(e.target.value)}></input>
                <input placeholder='category' onChange={ (e) => setCategory(e.target.value)}></input> 
                <button>Submit</button>
               
            </form>
            {tasks.map((task) =>(
                <div key={task._id}>
               <h3>{task.title}</h3>
               <p>{task.description}</p>
               <p>{task.category}</p>
               <p>{task.isCompleted ? 'Completed' : 'Not Completed'}</p>
               <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
            ))}
            
        </div>
    );
}

export default Tasks;
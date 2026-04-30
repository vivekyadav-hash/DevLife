import {useEffect , useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Habits(){
    const [habits , setHabits] = useState([]);
    const[name , setName] = useState('');
    const[frequency , setFrequency] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

   useEffect(() => {
       const fetchTasks =   async () => {
         const response = await axios.get( 'http://localhost:8080/api/habits' ,
            {headers :{
        Authorization : `Bearer ${token}`
        }
       });
       setHabits(response.data.habits);
    };
       fetchTasks();
 }, []);


 const handleOnSubmit = async(e) =>{
    e.preventDefault();
    await axios.post('http://localhost:8080/api/habits' ,
        {name , frequency },
        {headers : { Authorization : ` Bearer ${token}`}
    });setName(''),
setFrequency('');

    const response = await axios.get('http://localhost:8080/api/habits' , {
        headers : {Authorization : `Bearer ${token}`}
    });setHabits(response.data.habits);
 }

  return(
        <div>
            <h1>Habits</h1>
            <form onSubmit={handleOnSubmit}>
                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <button>Submit</button>
            </form>
            {habits.map((hab) => (
                <div key={hab._id}>
                    <h3>{hab.name}</h3>
                    <p>{hab.frequency}</p>
                    <p>{hab.isCompleted ? 'Completed' : 'Not Completed'}</p>
                </div>
            ))}
        </div>
    );

   
}

 export default Habits;
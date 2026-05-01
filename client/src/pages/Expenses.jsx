import {useState , useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Expenses(){
    const[expense , setExpense] = useState([]);
    const [title , setTitle] = useState('');
    const[amount , setAmount] = useState('');
    const[purpose ,setPurpose] = useState('');
  const navigate = useNavigate();
    const token = localStorage.getItem('token');

     const fetchExpenses =   async () => {
         const response = await axios.get( 'http://localhost:8080/api/expenses' ,{
        headers :{
        Authorization : `Bearer ${token}`
        }
       });
       setExpense(response.data.expenses);
    };

useEffect(() => {
      
       fetchExpenses();
 }, []);

const handleDelete = async (id) =>{
    await axios.delete(`http://localhost:8080/api/expenses/${id}` , {
        headers: {Authorization : `Bearer ${token}`}
    })
    fetchExpenses();
}

const handleOnSubmit =async (e) =>{
e.preventDefault();
await axios.post('http://localhost:8080/api/expenses' ,
     { title , amount , purpose} , 
    {headers: {Authorization : `Bearer ${token}`}
})
const response = await axios.get('http://localhost:8080/api/expenses' ,
    {headers : {Authorization: `Bearer ${token}`}}
);setExpense(response.data.expenses);
}

    return(
        <div>
            <h1>Expenses</h1>
            <form onSubmit={handleOnSubmit}>
                <input placeholder='title' onChange={(e) => setTitle(e.target.value)} />
                <input placeholder='amount' onChange={(e) => setAmount(e.target.value)} />
                <input placeholder='purpose' onChange={(e) => setPurpose(e.target.value)} />
                <button>Submit</button>
            </form>
            {expense.map((exp) => (
                <div key={exp._id}>
                    <h3>{exp.title}</h3>
                    <p>{exp.amount}</p>
                    <p>{exp.purpose}</p>
                    <button onClick={() => handleDelete(exp._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Expenses ;
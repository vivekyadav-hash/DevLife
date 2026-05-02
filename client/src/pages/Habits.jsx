import {useEffect , useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Habits(){
    const [habits , setHabits] = useState([]);
    const[name , setName] = useState('');
    const[frequency , setFrequency] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

      const fetchHabits =   async () => {
         const response = await axios.get( 'http://localhost:8080/api/habits' ,
            {headers :{
        Authorization : `Bearer ${token}`
        }
       });
       setHabits(response.data.habits);
    };

   useEffect(() => {
     
       fetchHabits();
 }, []);


 const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/habits/${id}` ,{
        headers : {Authorization : `Bearer ${token}`}
    })
    fetchHabits();
 }
 const handleOnSubmit = async(e) =>{
    e.preventDefault();
    await axios.post('http://localhost:8080/api/habits' ,
        {name , frequency },
        {headers : { Authorization : ` Bearer ${token}`}
    });setName(''),
setFrequency('');

    const response = await axios.get('http://localhost:8080/api/habits' , {
        headers : {Authorization : `Bearer ${token}`}
    }); setName('');
        setFrequency('');
        fetchHabits();
 }

  return (
        <div className="min-h-screen bg-gray-950 text-white">
            <div className="max-w-4xl mx-auto px-8 py-10">
                <h1 className="text-3xl font-bold mb-8">Habits</h1>

                <form onSubmit={handleOnSubmit} className="bg-gray-800 rounded-2xl p-6 mb-8 flex flex-col gap-4">
                    <input
                        placeholder="Habit Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        placeholder="Frequency (daily / weekly)"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="bg-purple-500 hover:bg-purple-600 rounded-lg py-2 font-semibold transition">
                        Add Habit
                    </button>
                </form>

                <div className="flex flex-col gap-4">
                    {habits.map((hab) => (
                        <div key={hab._id} className="bg-gray-800 rounded-2xl p-6 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-purple-400">{hab.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">Frequency: {hab.frequency}</p>
                                <p className={`text-sm mt-2 font-medium ${hab.isCompleted ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {hab.isCompleted ? '✅ Completed' : '⏳ Not Completed'}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(hab._id)}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
   
}

 export default Habits;
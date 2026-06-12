import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/api";

function AiPop() {

    const [goal, setGoal] = useState('');
    const [branch, setBranch] = useState('');
    const [skills, setSkills] = useState('');
    const [hrs, setHrs] = useState('');
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState(null);
    const token = localStorage.getItem('token');


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/ai/roadmap`, {
                goal, branch, skills, hoursPerDay: hrs
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRoadmap(response.data.roadmap)
        } catch (err) {
            console.error('AI error', err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-96 h-96">
            {!roadmap && !loading ?  ( <form onSubmit={handleOnSubmit}>
                <input placeholder="Enter your Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
                <input placeholder="Enter your Branch or course" value={branch} onChange={(e) => setBranch(e.target.value)} />
                <input placeholder="Enter your skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                <input placeholder="Enter how many hours you can give to this " value={hrs} onChange={(e) => setHrs(e.target.value)} />
                <button>Submit</button>
            </form>) :roadmap ? (<div className="mt-4 space-y-3">
                <p className="font-semibold">{roadmap.summary}</p>
                 
                 <div>
                    <h3 className="font-bold">Month 1</h3>
                    <p>{roadmap.month1}</p>
                 </div>
                 <div>
                    <h3 className="font-bold">Month 2</h3>
                    <p>{roadmap.month2}</p>
                 </div>
                 <div>
                    <h3 className="font-bold">Month 3</h3>
                    <p>{roadmap.month3}</p>
                 </div>
                 

                 <div>
                    <h3 className="font-bold">Daily Tasks</h3>
                    <ul className="list-disc pl-5">
                        {roadmap.dailyTasks.map((tasks, index)=>(
                            <li key={index} >{tasks}</li> ))}
                            </ul>
                            </div>
            </div>) : null }
           
            {loading && <p>Generating your roadmap...</p>}
        </div>
    )
}

export default AiPop;
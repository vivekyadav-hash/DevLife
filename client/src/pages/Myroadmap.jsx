import { useState , useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/api";

function Myroadmap(){
    const [roadmap , setRoadmap] = useState(null);
    const token = localStorage.getItem('token');


    const fetchRoadMap = async()=>{
        const response = await axios.get(`${API_URL}/api/ai/myroadmap`  , 
       { headers : {Authorization : `Bearer ${token}` }})
       setRoadmap(response.data.roadmap);
    }

    useEffect(() => {
        fetchRoadMap();
    }, []);


return (
    <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
            <h1 className="text-3xl font-bold mb-8 text-blue-400">My Roadmap</h1>
            {roadmap ? (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-2xl p-6">
                        <p className="text-gray-300 leading-relaxed">{roadmap.summary}</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-blue-400 mb-2">Month 1</h3>
                        <p className="text-gray-300">{roadmap.month1}</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-blue-400 mb-2">Month 2</h3>
                        <p className="text-gray-300">{roadmap.month2}</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-blue-400 mb-2">Month 3</h3>
                        <p className="text-gray-300">{roadmap.month3}</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-blue-400 mb-3">Daily Tasks</h3>
                        <ul className="space-y-2">
                            {roadmap.dailyTasks.map((task, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-300">
                                    <span className="text-blue-400 mt-1">▸</span>
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                    <p className="text-gray-400">No roadmap generated yet. Complete the onboarding first.</p>
                </div>
            )}
        </div>
    </div>
);}

export default Myroadmap;
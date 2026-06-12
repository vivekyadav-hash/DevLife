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
    <div className="w-96 max-h-[80vh] overflow-y-auto bg-gray-800 rounded-2xl p-6 text-white">
        {!roadmap && !loading ? (
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-blue-400 mb-2">Let's build your roadmap</h2>
                <input placeholder="Enter your Goal" value={goal} onChange={(e) => setGoal(e.target.value)}
                    className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Enter your Branch or course" value={branch} onChange={(e) => setBranch(e.target.value)}
                    className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Enter your skills" value={skills} onChange={(e) => setSkills(e.target.value)}
                    className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Hours per day" value={hrs} onChange={(e) => setHrs(e.target.value)}
                    className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="bg-blue-500 hover:bg-blue-600 rounded-lg py-2 font-semibold transition">
                    Submit
                </button>
            </form>
        ) : roadmap ? (
            <div className="space-y-3">
                <p className="font-semibold text-blue-400">{roadmap.summary}</p>
                <div><h3 className="font-bold">Month 1</h3><p className="text-gray-300">{roadmap.month1}</p></div>
                <div><h3 className="font-bold">Month 2</h3><p className="text-gray-300">{roadmap.month2}</p></div>
                <div><h3 className="font-bold">Month 3</h3><p className="text-gray-300">{roadmap.month3}</p></div>
                <div>
                    <h3 className="font-bold">Daily Tasks</h3>
                    <ul className="list-disc pl-5 text-gray-300">
                        {roadmap.dailyTasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ) : null}

        {loading && <p className="text-gray-400 mt-4">Generating your roadmap...</p>}
    </div>
);
}

export default AiPop;
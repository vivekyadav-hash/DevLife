import { useState, useEffect } from 'react';
import axios from "axios";
import API_URL from "../utils/api";

function Expenses() {
    const [expense, setExpense] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const token = localStorage.getItem('token');

    const fetchExpenses = async () => {
        const response = await axios.get(`${API_URL}/api/expenses`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setExpense(response.data.expenses);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        // Optimistic — pehle UI se hatao
        setExpense(prev => prev.filter(exp => exp._id !== id));
        try {
            await axios.delete(`${API_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            // Fail hone pe wapas fetch karo
            fetchExpenses();
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Step 1 — Pehle tempExpense banao
        const tempExpense = {
            _id: Date.now().toString(),
            title,
            amount,
            purpose,
        };

        // Step 2 — Instantly UI mein add karo
        setExpense(prev => [...prev, tempExpense]);

        // Step 3 — Ab inputs clear karo
        setTitle('');
        setAmount('');
        setPurpose('');

        try {
            // Step 4 — Background mein API call
            const res = await axios.post(
                `${API_URL}/api/expenses`,
                {
                    title: tempExpense.title,
                    amount: tempExpense.amount,
                    purpose: tempExpense.purpose
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Step 5 — Temp ko real se replace karo
            setExpense(prev => prev.map(exp =>
                exp._id === tempExpense._id ? res.data.expense : exp
            ));

        } catch (err) {
            // Step 6 — Fail hone pe temp hatao
            setExpense(prev => prev.filter(exp => exp._id !== tempExpense._id));
            console.error('Expense add failed', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
                <h1 className="text-3xl font-bold mb-8">Expenses</h1>

                <form onSubmit={handleOnSubmit} className="bg-gray-800 rounded-2xl p-6 mb-8 flex flex-col gap-4">
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        placeholder="Amount"
                        value={amount}
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        placeholder="Purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-500 hover:bg-green-600 rounded-lg py-2 font-semibold transition">
                        Add Expense
                    </button>
                </form>

                <div className="flex flex-col gap-4">
                    {expense.map((exp) => (
                        <div key={exp._id} className="bg-gray-800 rounded-2xl p-6 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-green-400">{exp.title}</h3>
                                <p className="text-2xl font-bold mt-1">₹{exp.amount}</p>
                                <p className="text-gray-500 text-sm mt-1">Purpose: {exp.purpose}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(exp._id)}
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

export default Expenses;
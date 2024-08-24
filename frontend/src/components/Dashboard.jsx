import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [funds, setFunds] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [newFund, setNewFund] = useState('');
    const [newExpense, setNewExpense] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingType, setEditingType] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const fundsRes = await axios.get('http://localhost:5000/api/funds');
            const expensesRes = await axios.get('http://localhost:5000/api/expenses');
            const locationsRes = await axios.get('http://localhost:5000/api/locations');
            setFunds(fundsRes.data);
            setExpenses(expensesRes.data);
            setLocations(locationsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        try {
            let response;
            const url = `http://localhost:5000/api/${type}s`;
            const data = type === 'fund' ? { amount: newFund } :
                type === 'expense' ? { amount: newExpense } :
                    { name: newLocation };

            console.log(`Submitting ${type}:`, data);

            if (editingId && editingType === type) {
                response = await axios.put(`${url}/${editingId}`, data);
            } else {
                response = await axios.post(url, data);
            }

            console.log('Server response:', response.data);
            setEditingId(null);
            setEditingType(null);
            setNewFund('');
            setNewExpense('');
            setNewLocation('');
            fetchData();
        } catch (error) {
            console.error('Error submitting data:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (id, type, value) => {
        setEditingId(id);
        setEditingType(type);
        if (type === 'fund') setNewFund(value);
        if (type === 'expense') setNewExpense(value);
        if (type === 'location') setNewLocation(value);
    };

    const handleDelete = async (id, type) => {
        try {
            console.log(`Deleting ${type} with id:`, id);
            await axios.delete(`http://localhost:5000/api/${type}s/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">Admin Dashboard</h1>

                    {['fund', 'expense', 'location'].map((type) => (
                        <div key={type} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 capitalize">{type}s</h2>
                            <form onSubmit={(e) => handleSubmit(e, type)} className="mb-4">
                                <input
                                    type={type === 'location' ? "text" : "number"}
                                    value={type === 'fund' ? newFund : type === 'expense' ? newExpense : newLocation}
                                    onChange={(e) => type === 'fund' ? setNewFund(e.target.value) : type === 'expense' ? setNewExpense(e.target.value) : setNewLocation(e.target.value)}
                                    placeholder={`${type === 'location' ? 'Location Name' : `${type.charAt(0).toUpperCase() + type.slice(1)} Amount`}`}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    {editingType === type ? 'Update' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            </form>
                            <ul className="space-y-2">
                                {(type === 'fund' ? funds : type === 'expense' ? expenses : locations).map((item) => (
                                    <li key={item._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                        <span>{type === 'location' ? item.name : `${item.amount} BDT`}</span>
                                        <div>
                                            <button onClick={() => handleEdit(item._id, type, type === 'location' ? item.name : item.amount)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(item._id, type)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
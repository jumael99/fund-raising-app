import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaReceipt, FaMapMarkerAlt, FaUserShield } from 'react-icons/fa';

function UserView() {
    const [funds, setFunds] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 100000);
        return () => clearInterval(interval);
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

    const totalFunds = funds.reduce((sum, fund) => sum + fund.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const renderCard = (title, content, icon) => (
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
                {icon}
                <h2 className="text-xl font-bold ml-3">{title}</h2>
            </div>
            {content}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-indigo-800">Disaster Relief Dashboard</h1>
                    <Link to="/admin" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 flex items-center">
                        <FaUserShield className="mr-2" />
                        Admin Login
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderCard("Funds Raised",
                        <p className="text-3xl font-bold text-green-600">{totalFunds.toLocaleString()} BDT</p>,
                        <FaMoneyBillWave className="text-3xl text-green-500" />
                    )}
                    {renderCard("Total Expenses",
                        <p className="text-3xl font-bold text-red-600">{totalExpenses.toLocaleString()} BDT</p>,
                        <FaReceipt className="text-3xl text-red-500" />
                    )}
                    {renderCard("Rescue Team Locations",
                        <div className="space-y-4">
                            {locations.map((location, index) => (
                                <div key={location._id} className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg shadow-md">
                                    <div className="flex items-center text-indigo-700">
                                        <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                                        <span className="font-semibold">{location.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">#{index + 1}</span>
                                </div>
                            ))}
                        </div>,
                        <FaMapMarkerAlt className="text-3xl text-indigo-500" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserView;
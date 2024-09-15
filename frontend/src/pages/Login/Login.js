import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        // Ensure name and password are provided
        if (!name || !password) {
            setError('Both username and password are required.');
            return;
        }
        
        setLoading(true); // Start loading state
    
        try {
            const response = await axios.post(
                'http://localhost:5000/login',
                { name, password },
                { headers: { 'Content-Type': 'application/json' } } // Ensure the Content-Type is set
            );
    
            if (response.data.success) {
                console.log('Login successful:', response.data);
                navigate('/profile', { state: { user: response.data.user } });
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false); // End loading state
        }
    };
    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;

// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Home() {
    return (
        <div className="container">
            <h1>Welcome to User Authentication</h1>
            <div>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Signup</button></Link>
                <Link to="/forgot-password"><button>Forgot Password</button></Link>
            </div>
        </div>
    );
}

export default Home;

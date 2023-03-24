import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login({onFormSwitch}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
          const response = await axios.post('https://sinemazone.onrender.com/authenticate', { email, password });
          console.log(response.data);
          navigate('/getmovies')

        } catch (error) {
          setError('Invalid email or password');
        }
      }
    


    return (
        <div className="register_forms">
            <h2>Login</h2>
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input 
             type="email"
             required 
             name="email" 
             id="email" 
             placeholder="youremail@mail.com" 
             value={email} 
             onChange={(e)=>setEmail(e.target.value)} />
            
            <label htmlFor="password">Password</label>
            <input
             type="password"
             required 
             name="password" 
             id="password" 
             placeholder="****" 
             value={password} 
             onChange={(e)=>setPassword(e.target.value)}/>
            {error && <div id="error">{error}</div>}
            <button type="submit">Log In</button>
        </form>
            <button className="toggle-btn" onClick={()=>onFormSwitch('signup')} >Dont have an account? Sign up here!</button> 
        </div>
    )
}

export default Login;

//
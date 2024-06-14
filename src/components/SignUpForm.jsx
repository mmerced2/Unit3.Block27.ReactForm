import React from "react";
import { useState } from "react";



export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event){
        event.preventDefault();

        if (!username){
            setError("Username can't be null!");
            return;
          }
      
          if (password.length < 5) {
            setError("Password must be at least 5 characters long.");
            return;
          }


        
        try{
          
            const addSignUp = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                ,body:JSON.stringify({
                    username: username,
                    password: password
                })
            }
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", addSignUp)
            const result = await response.json();
            console.log(result)
            setToken(result.token)
        }
        catch(err) {
            setError(error.message);
        }
    }

    return(
    <div>
        <h2 style={{backgroundColor: "lightblue"}}>Sign Up!</h2>
        {error&& <p>{error}</p>}
        <form onSubmit={handleSubmit}> 
            <label>
                Username: {''}<input value={username} onChange={(e)=>setUsername(e.target.value)} />
            </label>
            <br/>
            <label>
                Password: {''}<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </label>
            <br/>
            <button style={{backgroundColor: "lighblue"}}>Submit</button>
        </form>
    </div> 
  )}
    
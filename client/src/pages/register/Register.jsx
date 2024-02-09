import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {

  //Declaring our set of useState variables
  const [inputs,setInputs] = useState({
    username:"",
    password:""
  })

  const [err, setErr] = useState(null);
  const[msg,setMsg] = useState(null);

  const handleChange = e=>{
    setInputs(prev=>({
      ...prev, [e.target.name]:e.target.value}))
  }

  
  const handleClick = async (e)=>{
    e.preventDefault();
    console.log(inputs);
    try{
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setMsg("Created a user");
    }
    catch(err){
      setErr(err.response.data);
    }

 
  };



  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Cine Tracker</h1>
          <p>
            From classics to new releases, we've got your movie cravings covered.
            Movies, movies, and more movies - what's not to love?
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />

            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <b><p className="success">{msg && msg}</p></b>
            <p className="error">{err && err}</p>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

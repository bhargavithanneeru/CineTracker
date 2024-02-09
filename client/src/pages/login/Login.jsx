import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { useState } from "react";



const Login = () => {
  //useState function to maintain user data
   const [inputs,setInputs] = useState({
    username:"",
    password:""
  });
  //state variables to maintain error data
  const [err, setErr] = useState(null);
  
  const handleChange = e=>{
      setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  } 


  const { login } = useContext(AuthContext);

  // Using the navigation hooks 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
     try{
      await login(inputs);
      navigate("/");

      
    }
    catch(err)
    {
      setErr(err.response.data);
    } 
    
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Cine Tracker.</h1>
          <p>
          From classics to new releases, we've got your movie cravings covered.
            Movies, movies, and more movies - what's not to love?
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}  />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}  />
            <p className="error">{err && err}</p>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

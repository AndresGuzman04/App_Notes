import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/input/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const SignUp = () => {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);


  const handleSignUp = (e) => {
    e.preventDefault()
    if (!name && !email && !password) {
      setError("All fields are required");
      return;
    }
    if (!name){
      setError("Name must be provided");
    }
    if (!validateEmail(email) ){
      setError("Please enter a valid email");
      return;
    };
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    // Call API to sign up
  }

 

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
          <div className="w-96 border rounded bg-white px-7 py-10">
              <form onSubmit={handleSignUp}>
                <h4 className="text-2xl mb-7">SignUp</h4>

                  <input 
                  type="text" 
                  placeholder='Name' 
                  className="input-box" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}  
                  />

                  <input type="text" placeholder='Email' className="input-box" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}  
                  />

                  <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />  

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type='submit' className="btn-primary">Create Account</button>
                  <p className="text-sm text-center mt-4">
                      Are you already registered? {""}

                      <Link to="/login" className='font-medium text-primary underline'>
                      Log In
                      </Link>
                  </p>

                </form>
          </div>
      </div> 
    </> 
  )
}

export default SignUp
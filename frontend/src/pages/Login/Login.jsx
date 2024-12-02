import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'

const Login = () => {
  return (
    <div>
        <Navbar />

        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <h4 className="text-2xl mb-7">Login</h4>
                <input type="text" placeholder='Email' className="input-box" />

                <PasswordInput/>

                <button type='submit' className="btn-primary">Login</button>
                <p className="text-sm text-center mt-4">
                    Not regidtered yet? {""}

                    <Link to="/signUp" className='font-medium text-primary underline'>
                    Create Acount
                    </Link>
                </p>
            </div>
        </div>

    </div>
  )
}

export default Login
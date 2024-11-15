import React from 'react';
import {Link} from 'react-router-dom';

function SignUp() {
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-2xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' id='username' className='p-2 border rounded-lg' />
        <input type="email" placeholder='email' id='email' className='p-2 border rounded-lg' />
        <input type="password" placeholder='password' id='password' className='p-2 border rounded-lg' />
        <button className='p-2 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-60'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account? </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
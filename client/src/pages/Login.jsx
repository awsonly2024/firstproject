import React from 'react';
import Header from '../components/Header/Header';
import LoginForm from '../components/Login/LoginForm';

const Login = () => {
   return (
      <>
         <Header/>
         <div className='container' style={{marginTop:100}}>
         <LoginForm/>
         </div>
      </>
   );
};

export default Login;
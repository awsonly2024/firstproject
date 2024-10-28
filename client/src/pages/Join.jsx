import React from 'react';
import Header from '../components/Header/Header';
import JoinForm from '../components/Join/JoinForm';

const Join = () => {
   return (
      <>
         <Header/>
         <div className='container'>
            <JoinForm/>
         </div>
      </>
   );
};

export default Join;
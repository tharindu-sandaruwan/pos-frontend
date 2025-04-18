import React from 'react'
import HeaderComponent from '../../components/Header/Header';
import FooterComponent from '../../components/Footer/Footer';
import RegisterComponent from '../../components/Register/Register';
const Register = () => {
    return (
      <>
        <div>
          <HeaderComponent/>
            <RegisterComponent/>
          <FooterComponent/>  
        </div>
      </>
    );
  };
  
  export default Register;
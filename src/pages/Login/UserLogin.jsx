import React from 'react'
import HeaderComponent from '../../components/Header/Header';
import FooterComponent from '../../components/Footer/Footer';
import LoginComponent from '../../components/Login/UserLogin';
const UserLogin = () => {
    return (
      <>
        <div>
            <HeaderComponent/>
            <LoginComponent/>
            <FooterComponent/>
        </div>
      </>
    );
  };
  
  export default UserLogin;
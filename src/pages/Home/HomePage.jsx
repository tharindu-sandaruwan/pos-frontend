import React from 'react'
import HeaderComponent from '../../components/Header/Header';
import FooterComponent from '../../components/Footer/Footer';
import HomePageComponent from '../../components/Home/HomePage';
const HomePage = () => {
    return (
      <>
        <div>
            <HeaderComponent/>
            <HomePageComponent/>
            <FooterComponent/>
        </div>
      </>
    );
  };
  
  export default HomePage;

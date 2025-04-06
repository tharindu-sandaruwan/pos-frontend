import React from 'react'
import HeaderComponent from '../../components/Header/Header';
import FooterComponent from '../../components/Footer/Footer';
import AddProductComponent from '../../components/AddProduct/AddProduct';
const AddProduct = () => {
    return (
      <>
        <div>
            <HeaderComponent/>
            <AddProductComponent/>
            <FooterComponent/>
        </div>
      </>
    );
  };
  
  export default AddProduct;

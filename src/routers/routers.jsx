import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddProduct from "../pages/AddProduct/AddProduct";
import Register from "../pages/Register/Register";
import HomePage from "../pages/Home/HomePage";
import UserLogin from "../pages/Login/UserLogin";

const Routers = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/UserLogin" element={<UserLogin />} />
          </Routes>
        </Router>
      </div>
    );
  };
  
  export default Routers;

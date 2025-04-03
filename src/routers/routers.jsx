import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddProduct from "../pages/AddProduct/AddProduct";
import Register from "../pages/Register/Register";
const Routers = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    );
  };
  
  export default Routers;

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddProduct from "../pages/AddProduct/AddProduct";
const Routers = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </Router>
      </div>
    );
  };
  
  export default Routers;

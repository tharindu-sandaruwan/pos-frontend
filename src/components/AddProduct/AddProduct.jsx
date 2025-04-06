import { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '' // Match backend field name
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      setMessage('Error: Please select an image file');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('category', product.category);
      
      // The backend expects 'imageUrl' field name for the file
      formData.append('imageUrl', imageFile);
      
      // Debug what's in the FormData
      console.log("Form data contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post('http://localhost:8090/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Success response:", response);
      setMessage('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
      });
      setImageFile(null);
      
      // Reset the file input
      document.getElementById('imageUrl').value = '';
      
    } catch (error) {
      console.error("Error details:", error);
      let errorMsg = 'Error adding product';
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        errorMsg += ': ' + (error.response.data.message || error.message);
      } else {
        errorMsg += ': ' + error.message;
      }
      
      setMessage(errorMsg);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8090/categories');
      console.log("Categories data:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="my-10">
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>
  
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes('Error')
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}
        >
          {message}
        </div>
      )}
  
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
              Price:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <div className="form-group">
            <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
  
        <div className="form-group">
          <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-1">
            Product Image:
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default AddProduct;
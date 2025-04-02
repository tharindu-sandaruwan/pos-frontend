import { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
    category: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert price to number since it's coming as string from form
      const productData = {
        ...product,
        price: parseFloat(product.price)
      };
      await axios.post('http://localhost:8090/products', productData);
      setMessage('Product added successfully!');
      
      // Clear the form
      setProduct({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: '',
        category: ''
      });
    } catch (error) {
      setMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name:</label>
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
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description:</label>
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
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price:</label>
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
            <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">Stock:</label>
            <input
              type="text"
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
          <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-1">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
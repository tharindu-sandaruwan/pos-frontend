import React from 'react';
import { ProductCard } from '../ProductCart/ProductCart';
import { Search, ShoppingBag, Loader2, Filter } from 'lucide-react';

function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch products from backend API
    setIsLoading(true);
    
    const minLoadingTime = 1000; // 1 second
    const loadingStartTime = Date.now();
    
    fetch('http://localhost:8090/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Debug output

        const loadingElapsedTime = Date.now() - loadingStartTime;
        const remainingLoadTime = Math.max(0, minLoadingTime - loadingElapsedTime);
        
        // Safely extract product list
        const productList = Array.isArray(data) ? data : data.products;

        // If still not an array, fallback to empty array
        const safeProductList = Array.isArray(productList) ? productList : [];
        setProducts(safeProductList);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(safeProductList.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setTimeout(() => {
          setIsLoading(false);
        }, remainingLoadTime);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        const loadingElapsedTime = Date.now() - loadingStartTime;
        const remainingLoadTime = Math.max(0, minLoadingTime - loadingElapsedTime);
        setTimeout(() => {
          setIsLoading(false);
        }, remainingLoadTime);
      });
  }, []);

  // Safe fallback if products is not an array
  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = safeProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || 
      product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    // Add your cart logic here
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Catalog</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || categoryFilter) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: {searchTerm}
                </span>
              )}
              {categoryFilter && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Category: {categoryFilter}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading Animation */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your filters</p>
                <button 
                  onClick={handleClearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
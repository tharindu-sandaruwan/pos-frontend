import React from 'react';
import { ProductCard } from '../ProductCart/ProductCart';
import { Search, ShoppingBag, Loader2 } from 'lucide-react';

function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
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
        setProducts(Array.isArray(productList) ? productList : []);
        
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

  const filteredProducts = safeProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    // Add your cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
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
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;

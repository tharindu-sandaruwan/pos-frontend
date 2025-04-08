import React from 'react';
import { ShoppingCart, Store, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-emerald-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8" />
            <span className="text-2xl font-bold">POS System</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-emerald-200" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>

            <div className="flex space-x-4">
              {/* Login button (optional navigation) */}
              <Link to="/UserLogin">
              <button className="bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors">
                Login
              </button>
              </Link>

              {/* Sign Up button navigates to /register */}
              <Link to="/register">
                <button className="bg-white text-emerald-600 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>

            <UserCircle className="h-8 w-8 cursor-pointer hover:text-emerald-200" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground font-bold text-xl px-3 py-1 rounded">GG</span>
              <span className="font-bold text-xl">GigGrow</span>
            </Link>
            <p className="mt-2 text-gray-600">
              Connect with top freelancers and clients worldwide. Your next opportunity is just a click away.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/jobs" className="text-gray-600 hover:text-primary">Browse Jobs</Link></li>
              <li><Link to="/freelancers" className="text-gray-600 hover:text-primary">Find Freelancers</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-primary">How it Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 hover:text-primary">Help Center</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} GigGrow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

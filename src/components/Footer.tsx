import React from 'react';
import { Link } from 'react-router';
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PrimeEstate</span>
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              We provide the most exclusive listings of luxury homes, commercial spaces, and land for development. Your dream property is just a click away.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-primary transition-colors">Browse Listings</Link></li>
              <li><Link to="/listings?type=sale" className="hover:text-primary transition-colors">Properties for Sale</Link></li>
              <li><Link to="/listings?type=rent" className="hover:text-primary transition-colors">Properties for Rent</Link></li>
              <li><Link to="/list" className="hover:text-primary transition-colors">List Your Property</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4">
              <li><Link to="/listings?category=home" className="hover:text-primary transition-colors">Residential Homes</Link></li>
              <li><Link to="/listings?category=land" className="hover:text-primary transition-colors">Land & Plots</Link></li>
              <li><Link to="/listings?category=commercial" className="hover:text-primary transition-colors">Commercial Space</Link></li>
              <li><Link to="/listings?category=other" className="hover:text-primary transition-colors">Other Properties</Link></li>
              <li><Link to="/listings" className="hover:text-primary transition-colors">Luxury Collection</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Real Estate Ave, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@primeestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} PrimeEstate Real Estate Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>

    
    <div className="py-20 px-4 max-w-6xl mx-auto bg-transparent">
      <h1 className="text-4xl font-bold mb-6 text-slate-800 leading-tight sm:text-5xl text-center">
        About <span className="text-customBlue">EstateEase</span>
      </h1>
      <div className="space-y-6 text-lg text-slate-700 leading-relaxed mt-10">
        <p >
          EstateEase is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
        </p>
        <p >
          Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
        </p>
        <p >
          Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
        </p>
      </div>
    </div>
    <footer className="bg-customBlue text-white py-10 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Company</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Careers</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Help Center</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Connect with Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-75" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-75" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-75" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-75" aria-label="LinkedIn">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">123 Real Estate St.</p>
            <p className="mb-2">City, Country 12345</p>
            <p className="mb-2">Email: contact@estateease.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EstateEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}

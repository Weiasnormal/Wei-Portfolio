import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-black bg-black text-white">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Wei Portfolio</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#home" className="text-white hover:opacity-70 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:opacity-70 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white hover:opacity-70 transition-opacity">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:opacity-70 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/">MyApp</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/createuser">
            <p className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300">Create User</p>
          </Link>
          <Link href="/users">
            <p className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300">Users List</p>
          </Link>
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-white focus:outline-none">
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <Link href="/createuser">
            <p className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300">Create User</p>
          </Link>
          <Link href="/users">
            <p className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300">Users List</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

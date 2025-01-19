import { useState } from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router';

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="header p-3 flex justify-between items-center px-5 relative">
      <img src={logo} alt="Logo" className="logo w-[60px] h-auto" />
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="elegant-button relative text-black border-b border-black px-3 py-2 text-sm font-medium transition-transform duration-400 transform hover:scale-95"
        >
          <Link to="/Auth">Sign In as HCP</Link>
        </button>

        
      </div>
    </div>
  );
}

export default Header;
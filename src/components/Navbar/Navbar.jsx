import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file if it's in a separate file

const Navbar = () => {
  return (
    <div>
      {/* Navbar section */}
      <div className="navbar">
        <div className="left">
          <Link to="/" className="active">Home</Link>
        </div>
        <ul>
          <li>
            <Link to="/AddProduct">Add Product</Link>
          </li>
          {/* Additional links can be added here */}
        </ul>
      </div>

     
        
       
      </div>
    
  );
}

export default Navbar;

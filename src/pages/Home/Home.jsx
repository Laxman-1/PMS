import { useEffect, useState } from 'react';
import '../../App.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://6740bb16d0b59228b7f127a3.mockapi.io/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="card-container">
        
        {products.map((product) => (
          <div key={product.id} className="card">
            <div class="img">
            <img src={product.ProductImage || 'placeholder-image-url.jpg'} alt={product.ProductName || 'Product'} />
           </div>
            <h2 className="product-name">{product.ProductName}</h2>
          {/* <p className="product-des">{product.ProductDescription}</p>*/}
            <p className="product-material">{product.ProductMaterial}</p>
            <p className="product-material">{product.ProductPrice}</p>
            <button onClick={() => navigate(`/SingleProduct/${product.id}`)}>See More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams(); // Extract `id` from URL
  const [product, setProduct] = useState(null); // State to hold product data
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Navigation handler

  // API for delete
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`https://6740bb16d0b59228b7f127a3.mockapi.io/products/${id}`);
      console.log(response);
      if (response.status === 200) {
        alert('Product deleted successfully.');
        navigate('/'); // Redirect to home page
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete the product. Please check your connection and try again.');
    }
  };

  // Fetch single product
  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(`https://6740bb16d0b59228b7f127a3.mockapi.io/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar />
        <p className="error-message">{error}</p>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="single-product-container">
        <img
          src={product.ProductImage || 'https://via.placeholder.com/150'}
          alt={product.ProductName || 'Product'}
          className="single-product-image"
        /><br></br>
        
        <div className='single-left'>
        <h2 className="single-product-name">{product.ProductName || 'Unnamed Product'}</h2>
        <h3>Material:</h3>
        <p className="single-product-material"> {product.ProductMaterial || 'Not specified'}</p>
        <h3>Description:</h3>
        <p className="single-product-description">{product.ProductDescription || 'No description available.'}</p>
       <div className='button-container'>
        <button onClick={deleteProduct} className="deletebutton">Delete Product</button>
        <button onClick={() => navigate(`/Editproduct/${product.id}`)}className="EditButton">Edit Product</button>
        </div>

         </div>
      </div>
      
    </>
  );
};

export default SingleProduct;

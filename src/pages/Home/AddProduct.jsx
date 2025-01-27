import React, { useState } from 'react';
import axios from 'axios'; 
import Navbar from '../../components/Navbar/Navbar';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate(); // Navigation hook

  // State to manage form data
  const [data, setData] = useState({
    ProductName: '',
    ProductDescription: '',
    ProductMaterial: '',
    ProductImage: '',
  });

  const [message, setMessage] = useState(''); // State to show feedback messages
  const [isError, setIsError] = useState(false); // State to differentiate error/success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message
    setIsError(false);

    // Ensure required fields are not empty
    if (!data.ProductName || !data.ProductDescription || !data.ProductMaterial || !data.ProductImage) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(
        'https://6740bb16d0b59228b7f127a3.mockapi.io/products',
        {
          ...data,
          createdAt: new Date().toISOString(), // Add createdAt timestamp if needed
        }
      );
      if (response.status === 201) {
        // Product successfully added
        setMessage('Product added successfully!');
        setIsError(false);
        setData({
          ProductName: '',
          ProductDescription: '',
          ProductMaterial: '',
          ProductImage: '',
        }); // Reset form
        setTimeout(() => {
          navigate('/'); // Redirect to homepage after 1 second
        }, 1000);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage(
        error.response
          ? error.response.data.message || 'Failed to add product.'
          : 'Network error. Please try again later.'
      );
      setIsError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <form onSubmit={addProduct}><h1>Input Product details</h1>
          <div className="form-group">
            
            <label htmlFor="ProductName">Product Name</label>
            <input
              type="text"
              id="ProductName"
              name="ProductName"
              placeholder="Enter product name"
              aria-label="Enter product name"
              required
              value={data.ProductName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ProductDescription">Product Description</label>
            <textarea
              id="ProductDescription"
              name="ProductDescription"
              placeholder="Enter product description"
              aria-label="Enter product description"
              required
              value={data.ProductDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="ProductMaterial">Product Material</label>
            <input
              type="text"
              id="ProductMaterial"
              name="ProductMaterial"
              placeholder="Enter product material"
              aria-label="Enter product material"
              required
              value={data.ProductMaterial}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ProductImage">Product Image URL</label>
            <input
              type="url"
              id="ProductImage"
              name="ProductImage"
              placeholder="Enter image URL"
              aria-label="Enter product image URL"
              required
              value={data.ProductImage}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Product" />
          </div>
        </form>
        {message && (
          <p
            className={`feedback-message ${isError ? 'error-message' : 'success-message'}`}
          >
            {message}
          </p>
        )}
      </div>
      
    </div>
  );
};

export default AddProduct;

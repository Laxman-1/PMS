import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import '../../../src/App.css';

const EditProduct = () => {
  const { id } = useParams(); // Correct useParams
  const navigate = useNavigate(); // Navigate hook to redirect after update
  const [product, setProduct] = useState({
    productName: '',
    ProductDescription: '',
    ProductMaterial: '',
    ProductImage: '',
  });

  // Fetch product by ID
  const fetchProduct = async () => {
    const response = await axios.get(
      `https://6740bb16d0b59228b7f127a3.mockapi.io/products/${id}`
    );

    // Normalize API response to match the state structure
    setProduct({
      productName: response.data.ProductName,
      ProductDescription: response.data.ProductDescription,
      ProductMaterial: response.data.ProductMaterial,
      ProductImage: response.data.ProductImage,
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://6740bb16d0b59228b7f127a3.mockapi.io/products/${id}`,
        {
          ProductName: product.productName, // Map state back to API structure
          ProductDescription: product.ProductDescription,
          ProductMaterial: product.ProductMaterial,
          ProductImage: product.ProductImage,
        }
      );
      alert('Product updated successfully!');
      navigate('/'); // Navigate to homepage after successful update
    } catch (error) {
      alert('Error updating product!');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ProductName">Product Name</label>
            <input
              value={product.productName}
              type="text"
              id="ProductName"
              name="productName"
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ProductDescription">Product Description</label>
            <textarea
              id="ProductDescription"
              name="ProductDescription"
              value={product.ProductDescription}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="ProductMaterial">Product Material</label>
            <input
              type="text"
              id="ProductMaterial"
              name="ProductMaterial"
              value={product.ProductMaterial}
              onChange={handleChange}
              placeholder="Enter product material"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ProductImage">Product Image URL</label>
            <input
              type="url"
              id="ProductImage"
              name="ProductImage"
              value={product.ProductImage}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Product" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

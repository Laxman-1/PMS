import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AddProduct from "./pages/Home/AddProduct";
import SingleProduct from "./pages/Home/SingleProduct";
import EditProduct from "./pages/Home/editproduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/SingleProduct/:id' element={<SingleProduct />} />
        <Route path='/Editproduct/:id' element={<EditProduct />} /> {/* Correct route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

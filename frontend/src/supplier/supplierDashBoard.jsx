import React, { useState, useEffect ,useCallback } from 'react';
import axios from 'axios';
import './supplierDashboard1.css';


const SupplierDashboard = () => {
  const [suppliedProducts, setSuppliedProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const supplierId = localStorage.getItem('supplierId'); // Fetch supplierId from localStorage

 

  const fetchSuppliedProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products`);
      const filteredProducts = response.data.filter(
        product => product.supplier_id === parseInt(supplierId)
      );
      setSuppliedProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching supplied products:', error);
    }
  }, [supplierId]); // Only re-create the function if supplierId changes

  useEffect(() => {
    fetchSuppliedProducts();
  }, [fetchSuppliedProducts]); // Now the dependency is correctly tracked

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?'); // Alert confirmation
    if (confirmLogout) {
      localStorage.removeItem('supplierId'); // Clear supplierId from local storage
      alert('You have been logged out successfully.');
      window.location.href = '/'; // Redirect to homepage or login page
    }
  };
  const handleAddProduct = async () => {
    if (!productName || !productDescription || productPrice <= 0 || stockQuantity <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products`, {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        stock_quantity: parseInt(stockQuantity),
        supplier_id: supplierId
      });

      alert('Product added successfully!');
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setStockQuantity('');
      fetchSuppliedProducts(); // Refresh the supplied products list after adding
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="container_s">
      <h1>Supplier Dashboard</h1>

      <div className="section">
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          min="0"
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          min="0"
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="section">
        <h2>Supplied Products</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Supply Date</th>
            </tr>
          </thead>
          <tbody>
            {suppliedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock_quantity}</td>
                <td>{new Date(product.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SupplierDashboard;

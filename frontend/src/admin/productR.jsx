import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductRecord = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventory, setInventory] = useState([]);
  const [warehouses, setWarehouses] = useState([]); // New state for warehouses

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    // Fetch inventory
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/inventory`);
        setInventory(response.data);
      } catch (error) {
        console.error("There was an error fetching the inventory!", error);
      }
    };

    // Fetch warehouses
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/warehouses`);
        setWarehouses(response.data);
      } catch (error) {
        console.error("There was an error fetching the warehouses!", error);
      }
    };

    fetchProducts();
    fetchInventory();
    fetchWarehouses();
  }, []);

  const handleAddToInventory = async () => {
    try {
      // Check if the warehouse ID is valid
      const warehouse = warehouses.find(w => w.id === parseInt(warehouseId));
      if (!warehouse) {
        alert('Warehouse ID does not exist');
        return;
      }
  
      // Ensure the warehouse has enough capacity for the product
      if (quantity > warehouse.capacity) {
        alert('Quantity exceeds available warehouse capacity');
        return;
      }
  
      // Find the product and its current stock
      const product = products.find(p => p.id === parseInt(productId));
      if (!product) {
        alert('Product not found');
        return;
      }
      if (quantity > product.stock_quantity) {
        alert('Quantity exceeds available stock');
        return;
      }
  
      // Check if the product already exists in the inventory for the selected warehouse
      const inventoryItem = inventory.find(
        item => item.product_id === parseInt(productId) && item.warehouse_id === parseInt(warehouseId)
      );
  
      if (inventoryItem) {
        // Update the quantity of the existing inventory record
        const updatedQuantity = parseInt(inventoryItem.quantity) + parseInt(quantity);
        await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/inventory/${inventoryItem.id}`, {
          quantity: updatedQuantity
        });
  
        // Update the local state of inventory
        setInventory(inventory.map(item =>
          item.id === inventoryItem.id ? { ...item, quantity: updatedQuantity } : item
        ));
  
      } else {
        // Add a new inventory record
        await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/inventory`, {
          product_id: productId,
          warehouse_id: warehouseId,
          quantity: quantity
        });
  
        // Fetch the updated inventory to reflect the new entry
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/inventory`);
        setInventory(response.data);
      }
  
      // Deduct the quantity from the product's stock
      const updatedStockQuantity = product.stock_quantity - quantity;
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/products/${productId}`, {
        stock_quantity: updatedStockQuantity
      });
  
      // Update the local state for products
      setProducts(products.map(p => (p.id === parseInt(productId) ? { ...p, stock_quantity: updatedStockQuantity } : p)));
  
      // Deduct the quantity from the warehouse's capacity
      const updatedWarehouseCapacity = warehouse.capacity - quantity;
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/warehouses/${warehouseId}`, {
        capacity: updatedWarehouseCapacity
      });
  
      // Update the local state for warehouses
      setWarehouses(warehouses.map(w => (w.id === parseInt(warehouseId) ? { ...w, capacity: updatedWarehouseCapacity } : w)));
  
      alert('Product added to inventory and warehouse capacity updated successfully!');
    } catch (error) {
      console.error("There was an error adding the product to inventory!", error);
    }
  };
  

  return (
    <div>
      <h1>Product Records</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Supplier ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock_quantity}</td>
              <td>{product.supplier_id}</td>
              <td>{new Date(product.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Product to Inventory</h2>
      <div>
        <label>
          Product ID:
          <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)}/>
        </label>
        <br />
        <label>
          Warehouse ID:
          <input
            type="number"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleAddToInventory}>Add to Inventory</button>
      </div>
    </div>
  );
};

export default ProductRecord;

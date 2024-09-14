import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CustomerDashBoard.css';

const CustomerDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const [showOrders, setShowOrders] = useState(false);
  const [showOrderItems, setShowOrderItems] = useState(false);
  const [showShipments, setShowShipments] = useState(false);

  const customerId = localStorage.getItem('customerId'); 
  
  // Fetch inventory data
  const fetchInventory = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/inventory`);
      const availableInventory = response.data.filter(item => item.quantity > 0);
      setInventory(availableInventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  }, []);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orders?customer_id=${customerId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [customerId]);

  // Fetch order items
  const fetchOrderItems = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orderItems?customer_id=${customerId}`);
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  }, [customerId]);

  // Fetch shipments
  const fetchShipments = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/shipments?customer_id=${customerId}`);
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  }, [customerId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  const handleOrder = async () => {
    if (!selectedProduct) {
      alert('Please select a product.');
      return;
    }

    const selectedInventoryItem = inventory.find(item => item.Product.id === parseInt(selectedProduct));

    if (!selectedInventoryItem) {
      setErrorMessage('Selected product is not available in inventory.');
      return;
    }

    if (selectedInventoryItem.quantity === 0) {
      setErrorMessage('Out of stock');
      return;
    }

    if (quantity > selectedInventoryItem.quantity) {
      setErrorMessage(`Only ${selectedInventoryItem.quantity} items in stock.`);
      return;
    }

    const { Product } = selectedInventoryItem;
    const totalAmount = Product.price * quantity;

    try {
      // Create order
      const orderResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/orders`, {
        customer_id: customerId,
        order_date: new Date().toISOString(),
        status: 'Pending',
        total_amount: totalAmount,
      });

      const orderId = orderResponse.data.id;

      // Create order item
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/orderItems`, {
        order_id: orderId,
        product_id: Product.id,
        quantity,
        price: Product.price,
        customer_id: customerId,
      });

      // Deduct quantity from inventory
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/inventory/${selectedInventoryItem.id}`, {
        quantity: selectedInventoryItem.quantity - quantity,
      });

      alert('Order placed successfully!');
      setErrorMessage('');
      fetchInventory(); // Fetch updated inventory after the order
      setOrders((prevOrders) => [...prevOrders, orderResponse.data]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container_c">
      <h1>Customer Dashboard</h1>
      
      {/* Display error message if any */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="section">
        <h2>Order Products</h2>
        <select onChange={(e) => handleProductSelect(e.target.value)} value={selectedProduct}>
          <option value="">Select a product</option>
          {inventory.map((item) => (
            <option key={item.Product.id} value={item.Product.id}>
              {item.Product.name} - ${item.Product.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleOrder}>Order</button>
      </div>

      {/* The rest of the component remains unchanged */}
      <div className="section">
        <button onClick={() => { fetchOrders(); setShowOrders(!showOrders); }}>
          {showOrders ? 'Hide Orders' : 'Show Orders'}
        </button>
        <button onClick={() => { fetchOrderItems(); setShowOrderItems(!showOrderItems); }}>
          {showOrderItems ? 'Hide Order Items' : 'Show Order Items'}
        </button>
        <button onClick={() => { fetchShipments(); setShowShipments(!showShipments); }}>
          {showShipments ? 'Hide Shipments' : 'Show Shipments'}
        </button>
      </div>

      {/* Orders Table */}
      {showOrders && (
        <div className="section">
          <h2>Order History</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.order_date).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>${order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Items Table */}
      {showOrderItems && (
        <div className="section">
          <h2>Order Details</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.order_id}</td>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shipments Table */}
      {showShipments && (
        <div className="section">
          <h2>Shipment Tracking</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Shipment Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Tracking Number</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>{shipment.order_id}</td>
                  <td>{new Date(shipment.shipment_date).toLocaleString()}</td>
                  <td>{new Date(shipment.delivery_date).toLocaleString()}</td>
                  <td>{shipment.status}</td>
                  <td>{shipment.tracking_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
};

export default CustomerDashboard;

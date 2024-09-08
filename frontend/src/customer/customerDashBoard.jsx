import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CustomerDashBoard.css';

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // States to show/hide tables
  const [showOrders, setShowOrders] = useState(false);
  const [showOrderItems, setShowOrderItems] = useState(false);
  const [showShipments, setShowShipments] = useState(false);

  const customerId = localStorage.getItem('customer_id'); 

  // Use useCallback to memoize the functions
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/orders?customer_id=${customerId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [customerId]);

  const fetchOrderItems = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/orderItems?customer_id=${customerId}`);
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  }, [customerId]);

  const fetchShipments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/shipments?customer_id=${customerId}`);
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  }, [customerId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOrder = async () => {
    if (!selectedProduct) {
      alert('Please select a product.');
      return;
    }

    const selectedProductDetails = products.find(product => product.id === parseInt(selectedProduct));
    const totalAmount = selectedProductDetails.price * quantity;

    try {
      const orderResponse = await axios.post('http://localhost:3000/api/v1/orders', {
        customer_id: customerId,
        order_date: new Date().toISOString(),
        status: 'Pending',
        total_amount: totalAmount
      });

      const orderId = orderResponse.data.id;

      await axios.post('http://localhost:3000/api/v1/orderItems', {
        order_id: orderId,
        product_id: selectedProduct,
        quantity,
        price: selectedProductDetails.price,
        customer_id: customerId
      });

      alert('Order placed successfully!');
      fetchOrders();
      fetchOrderItems();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container_c">
      <h1>Customer Dashboard</h1>

      <div className="section">
        <h2>Order Products</h2>
        <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct}>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price}
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

      <div className="section">
        {/* Buttons to show tables */}
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

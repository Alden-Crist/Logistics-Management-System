import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderItemsRecord = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orderItems`);
        setOrderItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the order items!", error);
      }
    };

    fetchOrderItems();
  }, []);

  const handleButtonClick = (type, item) => {
    if (type === 'Order') {
      setSelectedOrder(item.Order);
      setSelectedProduct(null);
      setSelectedCustomer(null);
    } else if (type === 'Product') {
      setSelectedProduct(item.Product);
      setSelectedOrder(null);
      setSelectedCustomer(null);
    } else if (type === 'Customer') {
      setSelectedCustomer(item.Customer);
      setSelectedOrder(null);
      setSelectedProduct(null);
    }
  };

  return (
    <div>
      <h1>Order Items Records</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Customer ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <button onClick={() => handleButtonClick('Order', item)}>
                  {item.order_id}
                </button>
              </td>
              <td>
                <button onClick={() => handleButtonClick('Product', item)}>
                  {item.product_id}
                </button>
              </td>
              <td>
                <button onClick={() => handleButtonClick('Customer', item)}>
                  {item.customer_id}
                </button>
              </td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div>
          <h2>Order Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedOrder.id}</td>
                <td>{selectedOrder.customer_id}</td>
                <td>{new Date(selectedOrder.order_date).toLocaleString()}</td>
                <td>{selectedOrder.status}</td>
                <td>{selectedOrder.total_amount}</td>
                <td>{new Date(selectedOrder.created_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <div>
          <h2>Product Details</h2>
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
              <tr>
                <td>{selectedProduct.id}</td>
                <td>{selectedProduct.name}</td>
                <td>{selectedProduct.description}</td>
                <td>{selectedProduct.price}</td>
                <td>{selectedProduct.stock_quantity}</td>
                <td>{selectedProduct.supplier_id}</td>
                <td>{new Date(selectedProduct.created_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedCustomer && (
        <div>
          <h2>Customer Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCustomer.id}</td>
                <td>{selectedCustomer.name}</td>
                <td>{selectedCustomer.email}</td>
                <td>{selectedCustomer.phone}</td>
                <td>{selectedCustomer.address}</td>
                <td>{new Date(selectedCustomer.created_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderItemsRecord;

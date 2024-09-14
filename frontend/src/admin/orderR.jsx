import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderRecord = () => {
  const [orders, setOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div>
      <h1>Order Records</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <button onClick={() => handleCustomerClick(order.Customer)}>
                  {order.customer_id}
                </button>
              </td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>{order.total_amount}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <div>
          <h2>Customer Details</h2>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCustomer.id}</td>
                <td>{selectedCustomer.name}</td>
                <td>{selectedCustomer.email}</td>
                <td>{selectedCustomer.phone}</td>
                <td>{selectedCustomer.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderRecord;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home/home.jsx';
import Admin from './admin/Admin.jsx';
import AdminDashBoard from './admin/adminDashBoard.jsx';
import Driver from './admin/driver.jsx'
import TransportLog from './admin/transportLog.jsx';
import SupplierRecord from './admin/supplierR.jsx';
import Inventory from './admin/inventory.jsx';
import Shipment from './admin/shipment.jsx';
import Warehouse from './admin/Warehouse.jsx';
import CustomerRecord from './admin/customerR.jsx';
import ProductRecord from './admin/productR.jsx';
import VehicleRecord from './admin/vehicleR.jsx';
import OrderItemsRecord from './admin/orderItemsR.jsx';
import OrderRecord from './admin/orderR.jsx';
import Customer from './customer/customer.jsx';
import CustomerSignUp from './customer/customerSignUp.jsx';
import CustomerDashBoard from './customer/customerDashBoard.jsx';
import Supplier from './supplier/supplier.jsx';
import SupplierSignUp from './supplier/supplierSignUp.jsx';
import SupplierDashBoard from './supplier/supplierDashBoard.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/AdminDashBoard' element={<AdminDashBoard/>}/>
        <Route path='/Driver' element={<Driver/>}/>
        <Route path="/TransportLog" element={<TransportLog />} />
        <Route path='/SupplierRecord' element={<SupplierRecord/>}/>
        <Route path='/Inventory' element={<Inventory/>}/>
        <Route path='/Shipment' element={<Shipment/>}/>
        <Route path='/Warehouse' element={<Warehouse/>}/>
        <Route path='/CustomerRecord' element={<CustomerRecord/>}/>
        <Route path='/VehicleRecord' element={<VehicleRecord/>}/>
        <Route path='/ProductRecord' element={<ProductRecord/>}/>
        <Route path='/OrderItemsRecord' element={<OrderItemsRecord/>}/>
        <Route path='/OrderRecord' element={<OrderRecord/>}/>
        <Route path='/Customer' element={<Customer/>}/>
        <Route path='/CustomerSignUp' element={<CustomerSignUp/>}/>
        <Route path='/CustomerDashBoard' element={<CustomerDashBoard/>}/>
        <Route path='/Supplier' element={<Supplier/>}/>
        <Route path='/SupplierSignUp' element={<SupplierSignUp/>}/>
        <Route path='/supplierDashBoard' element={<SupplierDashBoard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

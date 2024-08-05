import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home/home.jsx';
import Admin from './admin/admin.jsx';
import AdminDashBoard from './admin/adminDashBoard.jsx';
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

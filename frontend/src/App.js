import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';
import CustomerSignUp from './customer/customer.jsx';
import CustomerDashBoard from './customer/customerDashBoard.jsx';
import SupplierSignUp from './supplier/supplier.jsx';
import SupplierDashBoard from './supplier/supplierDashBoard.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CustomerSignUp' element={<CustomerSignUp/>}/>
        <Route path='/CustomerDashBoard' element={<CustomerDashBoard/>}/>
        <Route path='/SupplierSignUp' element={<SupplierSignUp/>}/>
        <Route path='/supplierDashBoard' element={<SupplierDashBoard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

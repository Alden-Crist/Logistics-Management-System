import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';
import CustomerSignUp from './customer/customer.jsx';
import CustomerDashBoard from './customer/customerDashBoard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CustomerSignUp' element={<CustomerSignUp/>}/>
        <Route path='/CustomerDashBoard' element={<CustomerDashBoard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

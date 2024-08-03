import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';
import CustomerSignUp from './customer/customer.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CustomerSignUp' element={<CustomerSignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoanPage from './pages/LoanPage';
import PaymentPage from './pages/PaymentPage';
import BalancePage from './pages/BalancePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/balance" element={<BalancePage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App

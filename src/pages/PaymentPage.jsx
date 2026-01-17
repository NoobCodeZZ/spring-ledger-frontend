import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import Button from '../components/Button';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    loanRefId: '',
    amount: '',
    emiNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        loanRefId: formData.loanRefId,
        amount: parseFloat(formData.amount),
        emiNumber: parseInt(formData.emiNumber)
      };

      await axios.post('/v1/payment', payload);
      toast.success("Payment submitted successfully!");
      setFormData({ loanRefId: '', amount: '', emiNumber: '' }); // Reset form
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || typeof error.response?.data === 'string' ? error.response?.data : "Payment failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Make Payment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Loan Reference ID" name="loanRefId" value={formData.loanRefId} onChange={handleChange} required placeholder="Loan ID" />
          <Input label="Amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required placeholder="e.g. 2500.00" />
          <Input label="EMI Number" name="emiNumber" type="number" value={formData.emiNumber} onChange={handleChange} required placeholder="e.g. 5" />
          
          <Button type="submit" className="w-full mt-4 h-12 text-lg" disabled={loading}>
            {loading ? 'Processing...' : 'SUBMIT PAYMENT'}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default PaymentPage;

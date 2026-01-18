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
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      const payload = {
        loanRefId: formData.loanRefId,
        amount: parseFloat(formData.amount),
        emiNumber: parseInt(formData.emiNumber)
      };

      const response = await axios.post('/v1/payment', payload);
      setSuccessMsg(response.data || "Payment successful!");
      toast.success("Payment submitted successfully!");
      setFormData({ loanRefId: '', amount: '', emiNumber: '' }); // Reset form
    } catch (error) {
      console.error(error);
      const backendMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response?.data : "");
      const finalMsg = backendMsg || "Payment failed";
      
      setError(finalMsg);
      toast.error("Payment failed");
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

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-fade-in-up">
            <p className="font-bold whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {successMsg && (
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-fade-in-up">
            <h3 className="text-green-800 dark:text-green-400 font-bold mb-2">Success!</h3>
            <p className="text-green-700 dark:text-green-300 font-medium">{successMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentPage;

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import Button from '../components/Button';

const BalancePage = () => {
  const [formData, setFormData] = useState({
    loanRefId: '',
    emiNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBalance(null);
    setError(null);
    
    try {
      const emi = parseInt(formData.emiNumber);
      if (isNaN(emi)) {
        setError("Please enter a valid EMI Number");
        setLoading(false);
        return;
      }

      const payload = {
        loanRefId: formData.loanRefId,
        emiNumber: emi
      };

      // Changed to Query Params as requested
      const response = await axios.get('/v1/balance', {
        params: {
          loanRefId: formData.loanRefId,
          emiNumber: parseInt(formData.emiNumber)
        }
      });
      
      setBalance(response.data);
      toast.success("Balance retrieved!");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || typeof error.response?.data === 'string' ? error.response?.data : "Failed to fetch balance";
      
      setError(msg);
      toast.error("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Check Balance</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Loan Reference ID" name="loanRefId" value={formData.loanRefId} onChange={handleChange} required placeholder="Loan ID" />
          <Input label="EMI Number" name="emiNumber" type="number" value={formData.emiNumber} onChange={handleChange} required placeholder="e.g. 12" />
          
          <Button type="submit" className="w-full mt-4 h-12 text-lg" disabled={loading}>
            {loading ? 'Checking...' : 'GET BALANCE'}
          </Button>
        </form>

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            <p className="font-bold whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {balance !== null && (
          <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl text-center">

            <p className="text-4xl font-extrabold text-blue-900 dark:text-blue-200">
                {typeof balance === 'object' ? JSON.stringify(balance) : balance}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default BalancePage;

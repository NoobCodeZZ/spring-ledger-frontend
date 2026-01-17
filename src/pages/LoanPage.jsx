import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import Button from '../components/Button';

const LoanPage = () => {
  const [formData, setFormData] = useState({
    bankRefId: '',
    userRefId: '',
    principal: '',
    years: '',
    roi: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    
    try {
      const payload = {
        ...formData,
        principal: parseFloat(formData.principal),
        years: parseInt(formData.years),
        roi: parseFloat(formData.roi)
      };

      const response = await axios.post('/v1/loan', payload);
      setResult(response.data);
      toast.success("Loan created successfully!");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || typeof error.response?.data === 'string' ? error.response?.data : "Failed to create loan";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Loan</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Bank Reference ID" name="bankRefId" value={formData.bankRefId} onChange={handleChange} required placeholder="Bank ID" />
          <Input label="User Reference ID" name="userRefId" value={formData.userRefId} onChange={handleChange} required placeholder="User ID" />
          <Input label="Principal Amount" name="principal" type="number" value={formData.principal} onChange={handleChange} required placeholder="e.g. 50000" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tenure (Years)" name="years" type="number" value={formData.years} onChange={handleChange} required placeholder="e.g. 2" />
            <Input label="Interest Rate (%)" name="roi" type="number" step="0.1" value={formData.roi} onChange={handleChange} required placeholder="e.g. 8.5" />
          </div>
          
          <Button type="submit" className="w-full mt-4 h-12 text-lg" disabled={loading}>
            {loading ? 'Processing...' : 'CREATE LOAN'}
          </Button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl animate-fade-in-up">
            <h3 className="text-green-800 font-bold mb-2">Loan Created!</h3>
            <p className="text-green-700 break-all font-mono bg-green-100/50 p-3 rounded-lg border border-green-200">{result}</p>
            <p className="text-xs text-green-600 mt-2">* Please save this reference ID.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LoanPage;

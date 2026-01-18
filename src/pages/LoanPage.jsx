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
  const [createdLoanId, setCreatedLoanId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCreatedLoanId('');
    setError('');
    
    try {
      const payload = {
        bankRefId: formData.bankRefId,
        userRefId: formData.userRefId,
        principal: parseFloat(formData.principal),
        years: parseInt(formData.years),
        roi: parseFloat(formData.roi)
      };

      const response = await axios.post('/v1/loan', payload);
      const loanId = response.data;
      setCreatedLoanId(loanId);
      toast.success("Loan created successfully!");
    } catch (error) {
      console.error(error);
      const backendMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response?.data : "");
      // Removed status code display as requested
      const finalMsg = backendMsg || "Failed to create loan";
      
      setError(finalMsg);
      toast.error("Loan Creation failed");
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

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-fade-in-up">
            <p className="font-bold whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {createdLoanId && (
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-fade-in-up">
            <h3 className="text-green-800 dark:text-green-400 font-bold mb-2">Loan Created!</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-green-700 dark:text-green-500 uppercase tracking-wider">Loan Reference ID:</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-green-200 dark:border-green-800 rounded-lg">
              <code className="flex-1 text-green-900 dark:text-green-100 font-mono font-bold break-all">
                {createdLoanId}
              </code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(createdLoanId);
                  toast.info("Copied to clipboard!");
                }}
                className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/40 rounded transition-colors"
                title="Copy to clipboard"
              >
                <span className="text-xs font-bold px-1 uppercase">Copy</span>
              </button>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400 mt-4 italic font-medium">
              * Please store this loan reference ID somewhere safe. You will need it for payments and balance checks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LoanPage;

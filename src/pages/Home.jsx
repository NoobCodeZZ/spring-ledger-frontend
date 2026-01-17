import Card from '../components/Card';
import { Landmark, CreditCard, Wallet } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">The Ledger Co</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <Card title="LOAN" to="/loan" icon={Landmark} />
          <Card title="PAYMENT" to="/payment" icon={CreditCard} />
          <Card title="BALANCE" to="/balance" icon={Wallet} />
        </div>
      </div>
    </div>
  );
};
export default Home;

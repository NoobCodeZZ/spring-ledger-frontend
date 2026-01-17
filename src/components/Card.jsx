import { Link } from 'react-router-dom';

const Card = ({ title, to, icon: Icon }) => {
  return (
    <Link to={to} className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full aspect-square md:aspect-auto md:h-64">
      <div className="mb-4 p-4 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:dark:bg-blue-600 group-hover:text-white group-hover:dark:text-white transition-colors duration-300">
        {Icon && <Icon size={40} strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </Link>
  );
};
export default Card;

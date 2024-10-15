import { LayoutList, List, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
const Dashboard = () => {
  const styleCard =
    'flex flex-col gap-4 justify-center items-center border border-black border-solid rounded-sm p-5  bg-gray-500 hover:opacity-75';
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Link className={styleCard} href="/dashboard/products">
        <LayoutList />
        <p>Products</p>
        <p>0</p>
      </Link>
      <Link className={styleCard} href="/dashboard/categories">
        <List />
        <p>Categories</p>
        <p>0</p>
      </Link>
      <Link className={styleCard} href="/dashboard/orders">
        <ShoppingCart />
        <p>Orders</p>
        <p>0</p>
      </Link>
    </div>
  );
};
export default Dashboard;

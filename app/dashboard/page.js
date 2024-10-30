'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCats } from '@/features/slices/categorySlice';
import { allProducts } from '@/features/slices/productSlice';
import { LayoutList, List, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { allUsersOrders } from '@/features/slices/orderSlice';
const Dashboard = () => {
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.categories?.all);
  const products = useSelector((state) => state.products?.all);
  const orders = useSelector((state) => state.orders?.usersOrders);
  const me = useSelector((state) => state.users?.me);
  useEffect(() => {
    dispatch(allCats());
    dispatch(allProducts());
    if (me) {
      dispatch(allUsersOrders(me?.id)); // Fetch orders only if user is logged in
    }
  }, [dispatch, me]);
  const styleCard =
    'flex flex-col gap-4 justify-center items-center border border-black border-solid rounded-sm p-5  bg-gray-500 hover:opacity-75';
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Link className={styleCard} href="/dashboard/products">
        <LayoutList />
        <p>Products</p>
        <p>{products?.length}</p>
      </Link>
      <Link className={styleCard} href="/dashboard/categories">
        <List />
        <p>Categories</p>
        <p>{cats?.length}</p>
      </Link>
      <Link className={styleCard} href="/dashboard/orders">
        <ShoppingCart />
        <p>Orders</p>
        <p>{orders?.length}</p>
      </Link>
    </div>
  );
};
export default Dashboard;

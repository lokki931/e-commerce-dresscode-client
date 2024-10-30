'use client';
import { allUsersOrders, deleteOrder } from '@/features/slices/orderSlice';
import { toast } from '@/hooks/use-toast';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardOredrs = () => {
  const [orders, setOrders] = useState([]);
  const me = useSelector((state) => state.users?.me);
  const ordersAll = useSelector((state) => state.orders?.usersOrders);
  const dispatch = useDispatch();
  const userId = me?.id;
  useEffect(() => {
    if (userId) {
      dispatch(allUsersOrders(userId)); // Fetch orders only if user is logged in
    }
  }, [dispatch, userId]);
  useEffect(() => {
    setOrders(ordersAll);
  }, [ordersAll]);
  const handleRemove = async (id) => {
    const result = await dispatch(deleteOrder(id));

    if (deleteOrder.rejected.match(result)) {
      console.log('Deletion Error:', result);
      toast({
        title: 'Delete order failed',
        description: result.payload || 'Something went wrong',
      });
    } else {
      toast({
        title: 'Delete order',
        description: `Order with ID ${id} has been deleted successfully.`,
      });

      // Update local categories state after deletion
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      dispatch(allUsersOrders(userId));
    }
  };
  return (
    <div>
      {orders?.length === 0 ? (
        <p>You have no orders yet.</p> // Message if no orders are present
      ) : (
        <ul className="space-y-4">
          {orders?.map((order) => (
            <li key={order.id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-semibold inline-flex gap-2 items-center">
                <span>Order ID: {order.id}</span>{' '}
                <Trash
                  className="cursor-pointer text-red-500 hover:text-red-300"
                  onClick={() => handleRemove(order.id)}
                />
              </h2>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
              <h3 className="font-medium">Products:</h3>
              <ul>
                {order.products.map((orderProduct) => (
                  <li key={orderProduct.id}>
                    {orderProduct.product.name} (x{orderProduct.quantity}) - $
                    {orderProduct.product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardOredrs;

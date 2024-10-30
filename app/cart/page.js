'use client';
import { Button } from '@/components/ui/button';
import {
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '@/features/slices/cartSlice';
import { createOrder } from '@/features/slices/orderSlice';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const me = useSelector((state) => state.users?.me);
  const { cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const handleOrderClick = async () => {
    try {
      const orderDetails = {
        userId: me?.id,
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        total: totalAmount,
      };
      const resultAction = await dispatch(createOrder(orderDetails)).unwrap(); // Unwrap the result

      // Show success toast and redirect to orders page
      toast({
        title: 'Order Successful',
        description: 'Your order has been placed successfully.',
        status: 'success',
      });
      dispatch(clearCart());
      // Redirect to the orders page
      router.push('/dashboard/orders');
    } catch (error) {
      // Show error toast
      toast({
        title: 'Order Failed',
        description: error || 'An error occurred while placing the order.',
        status: 'error',
      });
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3 text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. Go to{' '}
          <Link href={'collection'} className="underline hover:no-underline">
            collection
          </Link>
        </p>
      ) : (
        <div className="my-4 flex flex-col items-end gap-4">
          <ul className="flex flex-col gap-4 mb-4 w-full">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 justify-between items-center max-sm:flex-wrap shadow py-2">
                <img src={item.img} style={{ width: '50px', height: '30px' }} alt={item.name} />
                <h2 className="flex-grow">{item.name}</h2>
                <p className="basis-1/6">${item.price}</p>
                <div className="basis-1/6 inline-flex gap-3 items-center">
                  <Button onClick={() => dispatch(decrementQuantity(item.id))}>-</Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => dispatch(incrementQuantity(item.id))}>+</Button>
                </div>
                <p>Total: ${item.totalPrice.toFixed(2)}</p>
                <Button variant="destructive" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <p>Total Items: {totalQuantity}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
          <Button variant="destructive" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
          {me ? (
            <Button onClick={handleOrderClick}>Order</Button>
          ) : (
            <Link href="/signin" className="hover:underline">
              Place login to Order
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;

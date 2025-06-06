import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../redux/features/cartSlice';
import { createOrder, fetchOrders } from '../../redux/features/orderSlice';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from "sonner";

import PaymentForm from '../../components/PaymentForm';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { orders, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user]);

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems,
        totalAmount,
        shippingAddress: user?.address || {},
        paymentMethod: 'stripe'
      };

      const resultAction = await dispatch(createOrder(orderData));
      if (createOrder.fulfilled.match(resultAction)) {
        const newOrder = resultAction.payload;
        setCurrentOrder(newOrder);
        
        // Create payment intent
        const response = await fetch('/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: newOrder._id }),
          credentials: 'include'
        });

        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setIsPaymentDialogOpen(true);
        }
      }
    } catch (error) {
      toast.error('Failed to create order');
      console.error('Checkout error:', error);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await dispatch(clearCart());
      setIsPaymentDialogOpen(false);
      toast.success('Payment successful!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to process payment');
      console.error('Payment success error:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-4">
        <p>Please log in to view your orders</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </Card>

          <Button 
            onClick={handleCheckout}
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm onSuccess={handlePaymentSuccess} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Order History</h3>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Order #{order._id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.totalAmount}</p>
                    <p className={`text-sm ${
                      order.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "../../Components/ui/card"
import { selectTotalAmount, selectTotalQuantity, clearCart, selectCartItems } from '../../redux/features/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { format } from "date-fns";
import { selectOrders, fetchOrders, selectOrdersLoading, selectOrdersError, removeOrderItem, createOrder } from '../../redux/features/orderSlice';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  const orders = useSelector(selectOrders);
  const ordersLoading = useSelector(selectOrdersLoading);
  const ordersError = useSelector(selectOrdersError);
  const [localOrders, setLocalOrders] = useState([]);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const cartItems = useSelector(selectCartItems) || [];

  useEffect(() => {
    console.log('Auth state:', { isAuthenticated, user });
    if (isAuthenticated) {
      console.log('Fetching orders...');
      dispatch(fetchOrders());
    } else {
      console.log('User not authenticated');
      toast.error('Please login to view your orders');
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    console.log('Orders updated:', orders);
    if (orders) {
      setLocalOrders(orders);
    }
  }, [orders]);

  useEffect(() => {
    if (ordersError) {
      console.error('Orders error:', ordersError);
      toast.error(ordersError);
    }
  }, [ordersError]);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      navigate('/payment/:orderId');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading('Creating your order...');

      // Create order with cart items
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image
        })),
        totalAmount: totalAmount || 0,
        totalQuantity: totalQuantity || 0,
        status: 'pending',
        userId: user._id // Add user ID to the order
      };

      const result = await dispatch(createOrder(orderData)).unwrap();
      
      if (result) {
        // Clear cart after successful order creation
        dispatch(clearCart());
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Order created successfully! Redirecting to payment...');
        
        // Small delay to show the success message
        setTimeout(() => {
          // Navigate to payment page with order ID
          navigate(`/payment/${result._id}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to create order. Please try again.');
    }
  };

  const handleRemoveItem = async (orderId, itemId) => {
    try {
      // Optimistically update the UI
      setLocalOrders(prevOrders => 
        prevOrders.map(order => {
          if (order._id === orderId) {
            const updatedItems = order.items.filter(item => item._id !== itemId);
            const newTotalAmount = updatedItems.reduce(
              (sum, item) => sum + (item.price * item.quantity), 
              0
            );
            return {
              ...order,
              items: updatedItems,
              totalAmount: newTotalAmount
            };
          }
          return order;
        })
      );

      // Make the API call
      const result = await dispatch(removeOrderItem({ orderId, itemId })).unwrap();
      
      if (result) {
        toast.success("Item removed successfully");
        // Refresh orders from server to ensure consistency
        dispatch(fetchOrders());
      } else {
        // Revert the optimistic update if the API call fails
        setLocalOrders(orders);
        toast.error("Failed to remove item");
      }
    } catch (error) {
      // Revert the optimistic update if there's an error
      setLocalOrders(orders);
      console.error('Error removing item:', error);
      toast.error(error.message || "Failed to remove item");
    }
  };

  return (
    <div>
      {/* Current Order Summary */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{(totalAmount || 0).toFixed(2)} Birr</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{(totalAmount || 0).toFixed(2)} Birr</span>
            </div>
          </div>
          <Button className="w-full" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>

      {/* Order History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {ordersLoading ? (
          <div className="text-center py-4">Loading orders...</div>
        ) : ordersError ? (
          <div className="text-center py-4 text-red-500">
            Error: {ordersError}
          </div>
        ) : localOrders && localOrders.length > 0 ? (
          <div className="space-y-4">
            {localOrders.slice(0, 3).map((order) => (
              <Card key={order._id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-gray-500">
                        Order #{order._id.slice(-6)}
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item._id} className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2 flex-1">
                          <img
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder.png';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-gray-600">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(order._id, item._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-gray-500 text-right">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-bold">
                        {order.totalAmount.toFixed(2)} Birr
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No recent orders
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderSummary
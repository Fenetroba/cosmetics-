import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
  selectCartLoading,
  selectCartError,
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../../redux/features/cartSlice';
import { fetchOrders, selectOrders, selectOrdersLoading, selectOrdersError } from '../../redux/features/orderSlice';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from 'date-fns';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const orders = useSelector(selectOrders);
  const ordersLoading = useSelector(selectOrdersLoading);
  const ordersError = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // TODO: Implement checkout action
    toast.success("Proceeding to checkout");
  };

  if (loading || ordersLoading) {
    return <div>Loading...</div>;
  }

  if (error || ordersError) {
    return <div>Error: {error || ordersError}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="destructive"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History Summary */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            {orders && orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.slice(0, 3).map((order) => (
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
                          <div key={item._id} className="flex items-center space-x-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-gray-600">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
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
                            ${order.totalAmount.toFixed(2)}
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
        </>
      )}
    </div>
  );
};

export default Cart; 
import React, { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { selectTotalAmount, selectTotalQuantity } from '@/redux/features/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { format } from "date-fns";
import { selectOrders, fetchOrders, selectOrdersLoading, selectOrdersError, removeOrderItem } from '@/redux/features/orderSlice';
import { Trash2 } from 'lucide-react';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  const orders = useSelector(selectOrders);
  const ordersLoading = useSelector(selectOrdersLoading);
  const ordersError = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCheckout = () => {
    // TODO: Implement checkout action
    toast.success("Proceeding to checkout");
  };

  const handleRemoveItem = async (orderId, itemId) => {
    try {
      console.log('Attempting to remove item:', { orderId, itemId });
      const result = await dispatch(removeOrderItem({ orderId, itemId })).unwrap();
      console.log('Remove item result:', result);
      toast.success("Item removed from order");
      // Refresh orders after removal
      dispatch(fetchOrders());
    } catch (error) {
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
              <span>${(totalAmount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${(totalAmount || 0).toFixed(2)}</span>
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
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
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
                      <div key={item._id} className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2 flex-1">
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
    </div>
  )
}

export default OrderSummary
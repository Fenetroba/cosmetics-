import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"
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
} from '../../redux/features/cartSlice'
import OrderSummary from '@/Components/Users/OrderSummary'

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);

  useEffect(() => {
    dispatch(fetchCart());
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

  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart to see them here.</p>
            <Button onClick={() => window.history.back()}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-4 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => handleUpdateQuantity(item.product._id || item.product, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.product._id || item.product, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    {item.discount > 0 && (
                      <p className="text-sm text-red-500">{item.discount}% OFF</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem(item.product._id || item.product)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary/>
          <div className="mt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
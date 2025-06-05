import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { selectTotalAmount, selectTotalQuantity } from '@/redux/features/cartSlice';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
const OrderSummary = () => {
     const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  const handleClearCart = () => {
     dispatch(clearCart());
   };
 
   const handleCheckout = () => {
     // TODO: Implement checkout action
     toast.success("Proceeding to checkout");
   };

  return (
    <div>
     
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
    </div>
  )
}

export default OrderSummary
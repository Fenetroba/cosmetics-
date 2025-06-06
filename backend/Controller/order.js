<<<<<<< HEAD
import Order from '../models/order.js';
import Cart from '../models/cart.js';

// Get user's orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name price images stock');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // Create order from cart items
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalAmount: cart.totalAmount,
      status: 'pending'
    });

    // Clear the cart after order is created
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalAmount: 0, totalQuantity: 0 }
    );

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

// Get specific order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product', 'name price images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message
    });
  }
};

// Remove item from order
export const removeOrderItem = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    console.log('Controller: Removing item with params:', { orderId, itemId });
    console.log('Controller: Request params:', req.params);

    const order = await Order.findOne({ 
      _id: orderId, 
      user: req.user._id 
    });

    if (!order) {
      console.log('Controller: Order not found');
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    console.log('Controller: Found order:', order);

    // Find the item to remove using the product ID
    const itemToRemove = order.items.find(item => item.product.toString() === itemId);
    if (!itemToRemove) {
      console.log('Controller: Item not found in order');
      return res.status(404).json({
        success: false,
        message: "Item not found in order"
      });
    }

    console.log('Controller: Found item to remove:', itemToRemove);

    // Remove the item and update total amount
    order.items = order.items.filter(item => item.product.toString() !== itemId);
    order.totalAmount = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // If no items left, delete the order
    if (order.items.length === 0) {
      console.log('Controller: No items left, deleting order');
      await Order.findByIdAndDelete(orderId);
      return res.status(200).json({
        success: true,
        message: "Order deleted as it has no items left",
        data: null
      });
    }

    // Save the updated order
    await order.save();

    console.log('Controller: Updated order:', order);

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Controller: Error removing item from order:', error);
    res.status(500).json({
      success: false,
      message: "Error removing item from order",
      error: error.message
    });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message
    });
  }
}; 
=======
 
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf

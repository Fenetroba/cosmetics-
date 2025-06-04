import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  totalQuantity: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Method to calculate totals
cartSchema.methods.calculateTotals = function() {
  this.totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return this;
};

// Method to add item to cart
cartSchema.methods.addItem = async function(product, quantity = 1) {
  const existingItem = this.items.find(item => item.product.toString() === product._id.toString());

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      product: product._id,
      quantity,
      price: product.price,
      name: product.name,
      image: product.images[0]
    });
  }

  this.calculateTotals();
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
  const item = this.items.find(item => item.product.toString() === productId.toString());
  
  if (item) {
    item.quantity = quantity;
    this.calculateTotals();
    return this.save();
  }
  
  throw new Error('Item not found in cart');
};

// Method to remove item from cart
cartSchema.methods.removeItem = async function(productId) {
  this.items = this.items.filter(item => item.product.toString() !== productId.toString());
  this.calculateTotals();
  return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = async function() {
  this.items = [];
  this.totalAmount = 0;
  this.totalQuantity = 0;
  return this.save();
};

// Pre-save middleware to ensure totals are calculated
cartSchema.pre('save', function(next) {
  this.calculateTotals();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
<<<<<<< HEAD
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
=======
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
<<<<<<< HEAD
=======
  totalQuantity: {
    type: Number,
    required: true
  },
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
<<<<<<< HEAD
=======
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
  }
}, {
  timestamps: true
});

<<<<<<< HEAD
=======
// Method to calculate totals
orderSchema.methods.calculateTotals = function() {
  this.totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Pre-save middleware to ensure totals are calculated
orderSchema.pre('save', function(next) {
  this.calculateTotals();
  next();
});

>>>>>>> 10f23d6750099568a352848fce4f833512716dcf
const Order = mongoose.model('Order', orderSchema);

export default Order; 
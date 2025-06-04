import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['skincare', 'makeup', 'haircare', 'fragrance', 'bath', 'tools'],
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  features: {
    size: {
      type: String,
      required: true
    },
    ingredients: [{
      type: String
    }],
    skinType: [{
      type: String,
      enum: ['all', 'dry', 'oily', 'combination', 'sensitive']
    }],
    benefits: [{
      type: String
    }],
    size: {
      type: String,
      required: true
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: true
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({
  name: 'text',
  description: 'text',
  brand: 'text',
  category: 'text',
  tags: 'text'
});

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  return this.price - (this.price * (this.discount / 100));
});

// Method to update average rating
productSchema.methods.updateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.ratings.average = totalRating / this.reviews.length;
    this.ratings.count = this.reviews.length;
  }
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

export default Product; 
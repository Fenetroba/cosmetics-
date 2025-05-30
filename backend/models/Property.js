const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
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
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'townhouse', 'land'],
    required: true
  },
  status: {
    type: String,
    enum: ['for-sale', 'for-rent', 'sold', 'rented'],
    required: true
  },
  features: {
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    area: {
      type: Number,
      required: true
    },
    parking: {
      type: Number,
      default: 0
    },
    yearBuilt: {
      type: Number
    }
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String,
    required: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search functionality
propertySchema.index({
  title: 'text',
  description: 'text',
  'location.city': 'text',
  'location.state': 'text'
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 
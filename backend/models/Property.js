import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'boolean', 'select']
  },
  options: {
    type: [String],
    default: []
  },
  required: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    enum: ['skincare', 'makeup', 'haircare', 'fragrance', 'bath', 'tools']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Property = mongoose.model('Property', propertySchema);

export default Property; 
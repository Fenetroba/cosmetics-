import express from 'express';
import { body, param } from 'express-validator';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getNewProducts,
  getProductsByCategory
} from '../Controller/Product.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Basic validation rules
const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['skincare', 'makeup', 'haircare', 'fragrance', 'bath', 'tools'])
    .withMessage('Invalid category'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a positive number'),
  body('features.size').trim().notEmpty().withMessage('Size is required'),
  body('images').isArray().withMessage('Images must be an array')
];

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new', getNewProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Protected routes
router.use(auth);

// Review route
router.post('/:id/reviews', [
  param('id').isMongoId().withMessage('Invalid product ID'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required')
], addReview);

// Admin routes
router.use(adminAuth);
router.post('/', validateProduct, createProduct);
router.put('/:id', [param('id').isMongoId(), ...validateProduct], updateProduct);
router.delete('/:id', param('id').isMongoId(), deleteProduct);

export default router; 
import express from 'express';
import { body, param, query } from 'express-validator';
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

// Validation middleware
const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['skincare', 'makeup', 'haircare', 'fragrance', 'bath', 'tools'])
    .withMessage('Invalid category'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a positive number'),
  body('features.size').trim().notEmpty().withMessage('Size is required'),
  body('features.ingredients').isArray().withMessage('Ingredients must be an array'),
  body('features.skinType').isArray().withMessage('Skin type must be an array'),
  body('features.benefits').isArray().withMessage('Benefits must be an array'),
  body('images').isArray().withMessage('Images must be an array')
];

const validateReview = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required')
];

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new', getNewProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Protected routes (require authentication)
router.use(auth);

// Review routes
router.post(
  '/:id/reviews',
  param('id').isMongoId().withMessage('Invalid product ID'),
  validateReview,
  addReview
);

// Admin routes
router.use(adminAuth);

router.post(
  '/',
  validateProduct,
  createProduct
);

router.put(
  '/:id',
  param('id').isMongoId().withMessage('Invalid product ID'),
  validateProduct,
  updateProduct
);

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid product ID'),
  deleteProduct
);

export default router; 
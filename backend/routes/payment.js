import express from 'express';
import { createPaymentIntent, handleWebhook } from '../Controller/payment.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', isAuthenticated, createPaymentIntent);

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 
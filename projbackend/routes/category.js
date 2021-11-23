import { Router } from 'express';
import { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } from '../controllers/category.js'
import { getUserById } from '../controllers/user.js';
import { isSignedIn, isAuthenticated, isAdmin } from '../controllers/authentication.js'


var router = Router();

//params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//routes
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory);
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory);

export default router;

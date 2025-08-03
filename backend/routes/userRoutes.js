const express = require('express');
const router = express.Router();
const {authUser, getUserProfile, logoutUser, registerUser, updateUserProfile} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).post(protect, updateUserProfile)
router.post('/register', registerUser)
router.post('/logout', logoutUser)

module.exports = router; // ✅ Fixed export

const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth")

router.get('/list', userController.getAllUsers);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
router.put('/profile', authMiddleware.verifyToken, userController.editProfile);
router.delete('/profile', authMiddleware.verifyToken, userController.deleteProfile);

module.exports = router;
const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo
} = require('../controllers/authController');

const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateMe,
  deleteMe,
  getMe
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = require('express').Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), updateReview);

module.exports = router;

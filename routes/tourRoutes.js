const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  aliasTopTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances
} = require('../controllers/tourController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();
// router.param('id', checkID);

// POST /tour/f43f334/reviews
// GET /tour/f43f334/reviews
// GET /tour/f43f334/reviews/f349fhsud
// router
//   .use('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-tours').get(aliasTopTour, getAllTours);

router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;

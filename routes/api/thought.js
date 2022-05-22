const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  terminateReaction,
} = require('../../controllers/thoughtController');

// /api/user
router.route('/').get(getThoughts).post(createThought);

// /api/user/:userId
router.route('/:userId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/user/:userId/reaction
router.route('/:studentId/reaction').post(addReaction);

// /api/user/:userId/reaction/:reactionId
router.route('/:userId/reaction/:reactionId').delete(terminateReaction);

module.exports = router;
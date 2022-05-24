const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendo,
  terminateFriendo,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:friendId/friends
router.route('/:friendId/friends').post(addFriendo);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(terminateFriendo);

module.exports = router;
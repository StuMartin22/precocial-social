const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: ObjectId(req.params.userId) },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

  // Remove user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user has that ID." })
          : res.json ({ message: "That user has been terminated." })
      )
      .catch ((err) => res.status(500).json(err));
},

//add friend
addFriendo(req, res) {
    User.findOne({ _id: req.params.friendId })
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "You sure about that? Try again." })
          : User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { friends: friend } },
              { runValidators: true, new: true }
            )
      )
      .then((user) => res.json({ message: "friend added!" }))
      .catch((err) => res.status(500).json(err));
  },

  //remove friend
terminateFriendo(req,res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No user has that ID." })
            : res.json({ message: "friend terminated!" })
        )
        .catch((err) => res.status(500).json(err));
    },
  };

const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // .select('-__v')
      // .populate('reactions')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts here.' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },

//create a thought
createThought(req, res) {
  Thought.create(req.body)
  .then((thought) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $addToSet: { thoughts: thought._id }},
    { new: true }
)
res.json(thought)})
  .catch((err) => res.status(500).json(err));
},

  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: ObjectId(req.params.thoughtId) },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts here.." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

  // Remove thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought." })
          : res.json ({ message: "This thought has been terminated." })
      )
      .catch ((err) => res.status(500).json(err));
},

//add a reaction
addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
  )
  .then((thought) =>
  !thought
    ? res.status(404).json({ message: 'No thought was given, was it?.'})
    : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
  },

//terminate a reaction
terminateReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          { $pull: { reactions: { _id: req.params.reactionId }}},
          { new: true},
        )
        .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought was bought.'})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};
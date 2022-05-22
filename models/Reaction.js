
const { Schema, model } = require('mongoose');

const reactSchema = new Schema(
  {
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false
  }
);

module.exports = reactSchema;
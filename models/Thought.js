const moment = require('moment');
const User = require('./user');
const thoughSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
      },
      username:{
        type: String,
        required: true,
        ref: 'User',
      },
        friends: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
      ],
  },
    {
      toJSON: {
        virtuals: true,
      //   getters: true,
      },
    }
  );
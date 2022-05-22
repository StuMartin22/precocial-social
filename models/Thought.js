const moment = require('moment');
const User = require('./User');
const reactSchema = require ('./Reaction')

const thoughtSchema = new Schema(
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
      reactions:[reactSchema]
  },
    {
      toJSON: {
        virtuals: true,
      //   getters: true,
      },
    }
  );

thoughtSchema
.virtual('reactionCount')
.get(function (){
    return `this.reactions.length`
})

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
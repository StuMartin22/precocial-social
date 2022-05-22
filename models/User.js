//required up here - Done

// username {} - Done

// email {} - Done

// thoughts Array - Done

// friends Array - Done

// virtual friend count - 

const { Schema, model } = require('mongoose');
const User = model('user', userSchema);

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
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

const user = new User({ email: 'TEST@gmail.com' });
user.email; 

// The raw value of `email` is lowercased
user.get('email', null, { getters: false }); 

user.set({ email: 'NEW@gmail.com' });
user.email; 

userSchema
.virtual('friendCount')
.get(function (){
    return `this.friends.length`
})


module.exports = User;
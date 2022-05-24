const { Schema, model } = require('mongoose');

var emailCheck = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Schema to create user model
const userSchema = new Schema(
  {
      //username info
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    //email info
    email: {
      type: String,
      unique: true,
      validate: true,
      required: true,
      required: 'Email address is required',
      validate: [emailCheck, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    //adding thoughts array
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      //adding friends array
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
    ],
},
  {
      //converting object to json and including virtuals.
    toJSON: {
      virtuals: true,
      // getters: true,
    },
  }
);

const User = model('user', userSchema);

//forces user email to be lower cased.
const user = new User({ email: 'TEST@gmail.com' });
user.email; 

user.get('email', null, { getters: false }); 

user.set({ email: 'NEW@gmail.com' });
user.email; 

//creates virtual for friend count.
userSchema
.virtual('friendCount')
.get(function (){
    return this.friends.length
})



//export User info
module.exports = User;


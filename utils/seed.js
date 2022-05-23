const connection = require("../config/connection");
const { User, Thought } = require("../models");

const realUsers = [
  'Terminator',
  'OptimusPrime',
  'HarryPotter',
  'Kaguya',
  'Fujiwara',
  'Tom'
];


connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const userInfo = [];
  const thoughts = []
  const friends = []

  for (let i = 0; i < realUsers.length; i++) {

    const username = realUsers[i];
    const email = `${username}@testdata.com`
  
    userInfo.push({
      username,
      email,
      friends,
      thoughts,
    });
  }
 
  await User.collection.insertMany(userInfo);

  console.info("Finished inserting totally real data");
  process.exit(0);
});
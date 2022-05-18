const express = require("express");
const router = require("./controllers");
const thoughtcontroller = require('./routes/thoughtcontroller');
const usercontroller = require('./routes/usercontroller');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(PORT, () => console.log(`Listening on PORT: PORT`));


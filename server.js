const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const items = require("./routes/api/items");
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(cors());


// db config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

//Use routes
app.use("/api/items", items);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorMiddleware");
const DB_LINK = process.env.DB_LINK;
mongoose.connect(
    DB_LINK,
    function (err) {
      if (err) console.log(err);
      console.log("DB connected");
    }
  );
const app=express();
app.use(cors());
app.use(errorHandler);
const port=process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req,res)=>{
  res.send("Hello welcome to the red carpet");
});

app.listen(port,()=>console.log(`Server started on port ${port}`));


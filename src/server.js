const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');

const models = require('./database/entities/index.js');

const apiRoutes = require('./routes/index.js');

dotenv.config();

models.seq.sync({
  // alter: true,
})
  .then(() => {
    const app = express();

    // File upload
    app.use(fileUpload());
    app.use(express.json());

    // Routes
    app.use('/api', apiRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`=================  NodeJS Running on port ${process.env.PORT}  =================
          Brought you by Antonio Zayas!
      Github: https://github.com/azayas97`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

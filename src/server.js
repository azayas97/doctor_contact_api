const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

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

    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));

    // Routes
    app.use('/api', apiRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`=================  NodeJS Running on port ${process.env.PORT}  =================
          Brought you by Antonio Zayas!
      Github: https://github.com/azayas97`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

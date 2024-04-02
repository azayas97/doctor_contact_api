import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';

import models from './database/entities/index.js';

import apiRoutes from './routes/index.js';

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

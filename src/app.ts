import express from 'express';
import { connectDB } from './utils';
import { configDotenv } from 'dotenv';
import { corsConfig, dataParser } from './middlewares';
import routes from './routes';
configDotenv();

const app = express();

/* Apply middlewares */
app.use(corsConfig);
app.use(dataParser);
app.use(routes);

/* Start server and connect to DB */
app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on ${process.env.BASE_URL}:${process.env.PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
});

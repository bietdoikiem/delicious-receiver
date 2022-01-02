import express from 'express';
import router from './routers';

const app = express();

/* * Global Middleware declarations * */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* * API Endpoint * */
app.use('/api', router);

// Server Listener
app.listen(Number(process.env.PORT), () => {
  console.log(
    `Receiver Server is running at port ${process.env.PORT} in ${process.env.NODE_ENV} environment`
  );
});

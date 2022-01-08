require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
// connect DB
const connectDb = require('./db/connect')


// routers
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/job')



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



// extra security packages
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

app.set('trust proxy',1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` header
}))

app.use(cors())
app.use(helmet())
app.use(xss())


app.use(express.json());
// extra packages


const authenticateUser = require('./middleware/authentication')



app.get('/',(req,res)=>{
  res.send("Job api")
})


// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/job',authenticateUser,jobRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
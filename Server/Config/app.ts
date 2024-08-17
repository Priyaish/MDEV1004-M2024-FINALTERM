import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';  // Import express-session here

dotenv.config();

// modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT Aliases
let JWTStrategy = passportJWT.Strategy; // alias
let ExtractJWT = passportJWT.ExtractJwt; // alias

// import the Building Model
import Building from '../Models/building';

// import mongoose and related modules
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);

// DB Connection Events
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB Atlas`);
});

// Import routers
import indexRouter from '../Routes/index';
import buildingRouter from '../Routes/building';

// create an express application
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add cors to the config
app.use(cors());

// setup express session
import createMemoryStore from 'memorystore';
const MemoryStore = createMemoryStore(session);

app.use(session({
  cookie: { maxAge: 86400000 }, // 1 day in milliseconds
  store: new MemoryStore({ checkPeriod: 86400000 }), // 1 day in milliseconds
  secret: db.secret,
  saveUninitialized: false,
  resave: false
}));

// initialize passport and session
import passport from 'passport';
app.use(passport.initialize());
app.use(passport.session());

// setup JWT options
let jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: db.secret
};

// setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const building = await Building.findById(jwt_payload.id).exec();
    if (building) {
      return done(null, building);
    }
    return done(null, false);
  } catch (error) {
    return done(error, null);
  }
});

// deploy the strategy
passport.use(strategy);

// Set up routes
app.use('/api', indexRouter);
/* Example: Secure the building routes with JWT authentication */
app.use('/api/building', passport.authenticate('jwt', { session: false }), buildingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error - please use /api as a route prefix for your API requests');
});

export default app;

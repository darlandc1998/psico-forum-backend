import rateLimit from "express-rate-limit";

const TIMER_RATE_LIMIT = 60 * 1000;

const LIMIT_EACH_MINUTES_PER_WINDOW = 1;
const LIMIT_EACH_TO_REQUEST_PER_WINDOW = 10;

const limiter = rateLimit({
  windowMs: TIMER_RATE_LIMIT * LIMIT_EACH_MINUTES_PER_WINDOW,
  max: LIMIT_EACH_TO_REQUEST_PER_WINDOW,
});

export default limiter;

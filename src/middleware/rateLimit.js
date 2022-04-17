import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 1 minute)
  message: 'request limit exceeded, wait one minute',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default apiLimiter;

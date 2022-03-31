import cache from '../util/cache.js';

export const verifyCache = (request, response, next) => {
  try {
    if (cache.has('info')) {
      return response.status(200).json(cache.get('info'));
    }
    return next();
  } catch (err) {
    return next();
  }
};

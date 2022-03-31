import cache from '../config/cache.js';

export const verifyCache = (request, response, next) => {
  try {
    const value = cache.get('info');
    if (value) {
      return response.status(200).json(value);
    }
    return next();
  } catch (err) {
    return next();
  }
};

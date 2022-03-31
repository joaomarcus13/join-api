import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });
console.log(cache.getStats());
export default cache;

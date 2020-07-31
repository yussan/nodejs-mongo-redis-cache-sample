const RedisClient = require("redis").createClient;

const RedisCon = RedisClient(6379, "localhost");

/**
 * get redis cache
 * @param {string} redis_key
 */
function get(redis_key) {
  return new Promise((resolve) => {
    RedisCon.get(redis_key, (err, reply) => {
      if (err) {
        console.err("Redis Con", err);
      } else {
        console.log("Success Redis Get", redis_key);
        resolve({ reply });
      }
    });
  });
}

/**
 * set redis cache
 * @param {string} redis_key
 * @param {string} redis_value
 */
function set(redis_key, redis_value) {
  console.log("Success Redis Set", redis_key, redis_value);
  RedisCon.set(redis_key, redis_value);
}

module.exports.get = get;
module.exports.set = set;

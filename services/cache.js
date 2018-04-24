const redis = require('redis');
const util = require('util');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;

// chainable custom prototype function for Query to set cache flag
mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;

    this.hashKey = JSON.stringify(options.key || '');

    return this;
}

// Patch Mongoose exec for caching purposes with Redis
mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    let key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    // check if there is a value for a 'key' in redis
    const cacheValue = await client.hget(this.hashKey, key);

    // If so, return that
    if (cacheValue) {
        let doc = JSON.parse(cacheValue);

        // hydrate array if parsed value is returned as an array to comply
        // with model instance type/structure requirements
        return Array.isArray(doc) 
            ? doc.map(r => new this.model(r))
            : new this.model(doc);
    }

    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);

    // set query result by key and initialize with a 10 second expiration
    client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

    return result;
}

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};
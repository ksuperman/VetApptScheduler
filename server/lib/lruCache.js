const LRU = require('lru-cache');

const MAX_AGE = {
    '1HOUR': 60 * 60 * 1000,
    '2MINS': 2 * 60 * 1000,
};

const LRU_DEFAULT_CONFIG = {
    // The maximum size of the cache, checked by applying the length function to all values in the cache.
    // Not setting this is kind of silly, since that's the whole purpose of this lib, but it defaults to
    // Infinity.Setting it to a non-number or negative number will throw a TypeError. Setting it to 0
    // makes it be Infinity.
    // Defaulted to 500 Entries
    max: 500,
    // Maximum age in ms. Items are not pro-actively pruned out as they age, but if you try to get an item that is
    // too old, it'll drop it and return undefined instead of giving it to you. Setting this to a negative value
    // will make everything seem old! Setting it to a non-number will throw a TypeError.
    // Defaulted to 1 Hour
    maxAge: MAX_AGE['1HOUR'],
};

/**
 * ES6 wrapper around the LRU Cache library
 **/
class LRUCache {
    constructor(config = {}) {
        // If External Config Overrides have been passed combine it with the default.
        this._config = { ...LRU_DEFAULT_CONFIG, ...config };
        // Create a LRU Cache Instance with the configs passed.
        this._lruCacheInstance = new LRU(this._config);
    }

    /**
     * Method to persist data associated with a key in LRU Cache.
     */
    async set(key, data) {
        return this._lruCacheInstance.set(key, data);
    }

    /**
     * Method to read data associated with a key in LRU Cache.
     */
    async get(key) {
        return this._lruCacheInstance.get(key);
    }

    /**
     * Method to destroy data associated with a key in LRU Cache.
     */
    async del(key) {
        return this._lruCacheInstance.del(key);
    }
}

module.exports.MAX_AGE = MAX_AGE;

module.exports = LRUCache;

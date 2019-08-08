const debug = require('debug')('vetapptschduler:Memoized');
const Cache = require('../lib/lruCache');
const { isObject, isEmpty } = require('../utils/objectUtils');
const { getSH1HashedBase64EncodedString } = require('../helpers/cryptoHelper');

/**
 * Method to generate the Hash string to be used as the Cache key.
 * @param {string} wrappedFunctionName - The name of the current function.
 * @param {array} functionArguments - The function passed to the function call.
 * @returns {string} - The unique hash string which can be used as the key for the caching a particular function call.
 */
const _generateCacheKey = async (wrappedFunctionName, functionArguments) => {
    // Create the preHashCacheKey using the arguments passed to the function.
    const argumentsString = functionArguments.map((functionArgument) => {
        // Better Key Generation Algorithm Required Here !!!
        if (isObject(functionArgument)) {
            return Object.keys(functionArgument).reduce((objectString, key) => {
                const value = functionArgument[key];
                // Append the new Key and Value to the Object String
                // eslint-disable-next-line no-param-reassign
                objectString += `${key}=${value}`;
                // return the objectString to
                return objectString;
            }, '');
        }
        return functionArgument;
    }).join('');

    return getSH1HashedBase64EncodedString(wrappedFunctionName + argumentsString);
};

/**
 * A wrapper function to make any function memoize using LRU Cache.
 * @function
 * @param {function} wrappedFunction - The function to memoize
 * @param {object} cacheInstance - The custom caching instance to memoize the function
 * @param {object} cacheOptions - The caching object options
 * @returns {function} - Memoized function
 */
function memoize(wrappedFunction, cacheInstance, cacheOptions = {}) {
    debug('memoize==>wrappedFunction==>', wrappedFunction.name);
    const cache = cacheInstance || new Cache({ ...cacheOptions });
    return async function memoized() {
        // Get the Argument passed to the function
        // eslint-disable-next-line prefer-rest-params
        const functionArguments = Array.prototype.slice.call(arguments);

        // Get the Wrapper Function name to add the the Cache Key to improve the namespace.
        const wrappedFunctionName = wrappedFunction.name /* istanbul ignore next: name is never going to null */ || '';

        // See if the request object is passed in the function args
        const req = {};

        // Check if Caching is disabled globally for the application from the remote config
        const cacheKey = await _generateCacheKey(wrappedFunctionName, functionArguments);
        debug(req, 'MEMOIZED_CACHE_KEY', { wrappedFunctionName }, cacheKey);
        // Try to Get the cached results.
        let cached;
        try {
            cached = await cache.get(cacheKey);
        } catch (error) {
            debug(req, 'MEMOIZED_CACHE_GET_ERROR', { wrappedFunctionName }, error);
        }

        // Cache HIT - Return the Cached results
        if (!isEmpty(cached)) {
            debug(req, 'MEMOIZED_CACHE_HIT', { wrappedFunctionName });
            return cached;
        }

        debug(req, 'MEMOIZED_CACHE_MISS', { wrappedFunctionName });

        // Cache Miss - Execute the function and get the Results
        const result = await wrappedFunction.call(this, ...functionArguments);

        // Cache the Results for subsequent Requests
        try {
            await cache.set(cacheKey, result);
        } catch (error) {
            debug(req, 'MEMOIZED_CACHE_SET_ERROR', { wrappedFunctionName }, error);
        }

        // Return the Results from the method
        return result;
    };
}

module.exports.CACHE_MAX_AGE = Cache.MAX_AGE;

module.exports = memoize;

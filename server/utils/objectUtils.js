const debug = require('debug')('vetapptschduler:ObjectUtils');
/**
 * The Object Utilities Module contains a set of methods which help common operations on javascript objects.
 * @class ObjectUtils
 */
class ObjectUtils {
    /**
     * Method to check if the passed argument is an `Array`
     * @param {*} object - The object to check if its an Array or not.
     * @returns {boolean} - The flag indicating if the passed object is an instance of an array.
     **/
    static isArray(object) {
        return (Array.isArray(object));
    }

    /**
     * Method to determine if the object is empty
     * @param {*} object - The object to check if its a an empty array/object/string or not.
     * @returns {boolean} - The flag indicating if the passed object is an empty array/object/string.
     **/
    static isEmpty(object) {
        return (!object || ObjectUtils.isEmptyObject(object) || ObjectUtils.isEmptyArray(object));
    }

    /**
     * Method to determine if an Array Object is empty
     * @param {array} object - The object to check if its a an empty array or not.
     * @returns {boolean} - The flag indicating if the passed object is an empty array.
     **/
    static isEmptyArray(object) {
        return (ObjectUtils.isArray(object) && object.length === 0);
    }

    /**
     * Method to determine if an Javascript Object is empty
     * @param {object} object - The object to check if its a an empty object or not.
     * @returns {boolean} - The flag indicating if the passed object is an empty object.
     **/
    static isEmptyObject(object) {
        return (ObjectUtils.isObject(object) && Object.keys(object).length === 0);
    }

    /**
     * Method to check if the passed argument is an `Object`
     * @param {*} object - The object to check if its an error object or not.
     * @returns {boolean} - The flag indicating if the passed object is an instance of an error.
     **/
    static isErrorObject(object) {
        return (object instanceof Error);
    }

    /**
     * Method to check if the passed argument is an `function`
     * @param {*} object - The object to check if its a function or not.
     * @returns {boolean} - The flag indicating if the passed object is an instance of an function.
     **/
    static isFunction(object) {
        return (typeof object === 'function');
    }

    /**
     * Method to check if the passed argument is an `Object`
     * @param {*} object - The object to check if its a object or not.
     * @returns {boolean} - The flag indicating if the passed object is an instance of an object.
     **/
    static isObject(object) {
        return (typeof object === 'object');
    }

    /**
     * Method to check if the given object is a promise
     * @param {*} object - The object to check if its a Promise object or not.
     * @returns {boolean} - The flag indicating if the passed object is an instance of a Promise Object.
     */
    static isPromiseObject(object) {
        return (!ObjectUtils.isEmpty(object) && (ObjectUtils.isObject(object) || ObjectUtils.isFunction(object)) && ObjectUtils.isFunction(object.then));
    }

    /**
     * Method to check if the passed argument is an `Object`
     * @param {*} string - The object to check if its a string or not.
     * @returns {boolean} - The flag indicating if the passed object is an instance of a string.
     **/
    static isString(string) {
        return (typeof string === 'string');
    }

    /**
     * Method to Parse input into JSON safely
     * @param {string} input - The String to be parsed into an object
     * @returns {object} - The Parsed object constructed from the string.
     **/
    static parseToJSON(input) {
        let object = input;
        if (ObjectUtils.isString(input)) {
            try {
                object = JSON.parse(object);
            } catch (e) {
                debug('ObjectUtils :: parseToJSON :: Error Parsing input into JSON :: %e', e);
            }
        }
        return object;
    }

    /**
     * Method to Stringify JSON into String safely.
     * @param {object} object - The object to be stringified into as string.
     * @returns {string} - The stringified object.
     **/
    static stringifyJSON(object) {
        let stringObject = object;
        try {
            stringObject = JSON.stringify(object);
        } catch (e) {
            debug('ObjectUtils :: stringifyJSON :: Error stringify JSON into String :: %e', e);
        }
        return stringObject;
    }
}

module.exports = ObjectUtils;

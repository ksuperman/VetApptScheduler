/**
 * Method to check if the passed argument is an `Array`
 **/
export const isArray = object => Array.isArray(object);

/**
 * Method to check if the passed argument is an `Object`
 **/
export const isObject = object => typeof object === 'object';

/**
 * Method to check if the passed argument is an `function`
 **/
export const isFunction = object => typeof object === 'function';

/**
 * Method to check if the passed argument is an `Object`
 **/
export const isErrorObject = object => object instanceof Error;

/**
 * Method to check if the passed argument is an `Object`
 **/
export const isString = string => typeof string === 'string';

/**
 * Method to determine if an Javascript Object is empty
 **/
export const isEmptyObject = object => isObject(object) && Object.keys(object).length === 0;

/**
 * Method to determine if an Array Object is empty
 **/
export const isEmptyArray = object => isArray(object) && object.length === 0;

/**
 * Method to determine if the object is empty
 **/
export const isEmpty = object => !object || isEmptyObject(object) || isEmptyArray(object);

/**
 * Method to Parse input into JSON safely
 **/
export const parseToJSON = (input) => {
    let object = input;
    if (isString(input)) {
        try {
            object = JSON.parse(object);
        } catch (e) {
            console.error(
                'objectUtils',
                'parseToJSON',
                'Error Parsing input into JSON',
                e,
            );
        }
    }
    return object;
};

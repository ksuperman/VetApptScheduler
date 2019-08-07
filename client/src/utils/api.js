import { isEmpty, parseToJSON } from './object';

const SUCCESS_HTTP_RESPONSE_CODE = [200, 201, 204];

const createAPIErrorObject = (errorMessage = '', details) => {
    const error = new Error(errorMessage);
    error.name = 'API_REQUEST_ERROR';
    error.details = details;
    return error;
};

// eslint-disable-next-line consistent-return
export const makeAPIRequest = ({
    url,
    method = 'POST',
    json = true,
    data,
} = {}) => new Promise((resolve, reject) => {
    try {
        if (isEmpty(url)) {
            throw createAPIErrorObject(
                '"url" and "method" are mandatory to make an API request',
            );
        }
        const { XMLHttpRequest } = window;
        const request = new XMLHttpRequest();
        request.withCredentials = true;
        request.onreadystatechange = () => {
            const {
                readyState, status, statusText, responseText,
            } = request;
            if (readyState === 4) {
                if (SUCCESS_HTTP_RESPONSE_CODE.indexOf(status) !== -1) {
                    let responseData = responseText;
                    /**
                     * if the response is request as JSON object then parse the response
                     **/
                    if (json) {
                        responseData = parseToJSON(responseText);
                    }
                    console.debug(
                        'apiRequestHelper',
                        'makeAPIRequest',
                        'responseText',
                        responseText,
                    );
                    return resolve({
                        status,
                        statusText,
                        data: responseData,
                    });
                }
                // Error Handling
                let errorResponseData = responseText;
                if (json) {
                    errorResponseData = parseToJSON(responseText);
                }
                return reject(
                    createAPIErrorObject(
                        `status: ${status} :: statusText: ${statusText}`,
                        errorResponseData,
                    ),
                );
            }
            return null;
        };

        request.open(method, url);

        if (data && typeof data === 'object') {
            // eslint-disable-next-line no-param-reassign
            data = JSON.stringify(data);
            request.setRequestHeader('Content-Type', 'application/json');
        }

        request.send(data);
    } catch (err) {
        // @TODO - Handle Rejection with Retry !
        console.error(
            'apiRequestHelper',
            'makeAPIRequest',
            'Error making API Request',
            err,
        );
        return reject(err);
    }
});

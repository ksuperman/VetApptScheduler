const QuickBooks = require('node-quickbooks');
const OAuthClient = require('intuit-oauth');
const debug = require('debug')('vetapptschduler:quickbooks');

QuickBooks.setOauthVersion('2.0');

const clientId = 'ABFkUORNmmEolnFaVUgX3JDwlxkBZ3EB4Do3Lo6HhctAtv26rK';

const clientSecret = 'QaXp9x9GvN9IOmDCQng8wwedH4kh9xGedgELkGTL';

let INTUIT_AUTH_CODE = '';

let INTUIT_REALM_ID = '';

let oauthClient;

let qbo;

/**
 * Init Functions
 */
const initOathClient = (req) => {
    if (!oauthClient) {
        oauthClient = new OAuthClient({
            clientId,
            clientSecret,
            environment: 'sandbox', // ‘sandbox’ or ‘production’
            redirectUri: `${req.protocol}://${req.get('host')}/intuit/authredirect`,
            logging: true,
        });
    }
};

const initQuickBooksClient = (accessTokenObj = {}) => {
    if (!qbo) {
        qbo = new QuickBooks(
            clientId,
            clientSecret,
            accessTokenObj.access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            INTUIT_REALM_ID,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessTokenObj.refresh_token, /* refresh token */
        );
    }
};

/**
 * Token Functions
 */
const createAccessToken = async () => {
    if (!INTUIT_AUTH_CODE) {
        return;
    }
    debug('createAccessToken:::INTUIT_AUTH_CODE', INTUIT_AUTH_CODE);
    return oauthClient.createToken(INTUIT_AUTH_CODE)
        .then((authResponse) => {
            const authResponseObj = authResponse.getJson();
            debug(`createAccessToken::::::The Token is  ${JSON.stringify(authResponseObj)}`);
            return authResponseObj;
        })
        .catch((e) => {
            debug(`createAccessToken:::::::The error message is :${e.originalMessage}`, e);
            debug(e.intuit_tid);
        });
};

const getAccessToken = async () => {
    if (!oauthClient) {
        return;
    }
    if (!oauthClient.isAccessTokenValid()) {
        return oauthClient.refresh()
            .then((authResponse) => {
                const authResponseObj = authResponse.getJson();
                debug(`getAccessToken:::Tokens refreshed : ${JSON.stringify(authResponse.json())}`);
                return authResponseObj;
            })
            .catch((e) => {
                debug(`getAccessToken:::The error message is :${e.originalMessage}`);
                debug(e.intuit_tid);
            });
    }
    debug(`getAccessToken:::Tokens are Valid : ${oauthClient.token.getToken()}`);
    debug(`getAccessToken:::Tokens are Valid : ${oauthClient.token}`);
    debug(`getAccessToken:::Tokens are Valid : ${oauthClient}`);
    return oauthClient.token.getToken();
};

/**
 * Auth Handlers
 */
const saveAuthorizationCodeFromIntuit = async (req, res, next) => {
    INTUIT_AUTH_CODE = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    INTUIT_REALM_ID = req.query.realmId;
    debug('saveAuthorizationCodeFromIntuit:::INTUIT_AUTH_CODE', INTUIT_AUTH_CODE);
    debug('saveAuthorizationCodeFromIntuit:::req.query.realmId', req.query.realmId);
    initOathClient(req);
    await createAccessToken();
    res.redirect('/');
};

const getAuthorizationCodeFromIntuit = (req, res, next) => {
    initOathClient(req);

    debug('getAuthorizationCodeFromIntuit:::INTUIT_AUTH_CODE', INTUIT_AUTH_CODE);

    const authUri = oauthClient.authorizeUri({
        scope: [
            OAuthClient.scopes.Accounting,
            OAuthClient.scopes.OpenId,
        ],
        state: 'testState',
    });

    res.redirect(authUri);
};

/**
 * Entity Functions
 */
const findCustomersInQuickBooks = ({ name: DisplayName } = {}) => new Promise(async (resolve, reject) => {
    if (!INTUIT_AUTH_CODE) {
        debug('findCustomersInQuickBooks::::::INTUIT_AUTH_CODE ___NOT FOUND::::', INTUIT_AUTH_CODE);
        return resolve();
    }
    // Get Access Token
    const accessTokenObj = await getAccessToken();
    debug('findCustomersInQuickBooks::::::accessTokenObj::::', accessTokenObj);
    // Init Client if not already init.
    initQuickBooksClient(accessTokenObj);
    debug('qbo.findCustomersInQuickBooks:::name:::', DisplayName);
    // Create Customer
    qbo.findCustomers({
        DisplayName,
    }, (err, queryResponse = {}) => {
        if (err) {
            debug('qbo.findCustomersInQuickBooks:::ERROR:::%e', err);
            reject(err);
        }
        const {
            Customer: [
                customer,
            ] = [],
        } = queryResponse.QueryResponse || {};
        debug('qbo.findCustomersInQuickBooks:::CUSTOMER FOUND:::', customer);
        resolve(customer);
    });
});

const createCustomerInQuickBooks = ({ name: DisplayName, email: Address } = {}) => new Promise(async (resolve, reject) => {
    if (!INTUIT_AUTH_CODE) {
        debug('createCustomerInQuickBooks::::::INTUIT_AUTH_CODE ___NOT FOUND::::', INTUIT_AUTH_CODE);
        return resolve();
    }
    const existingCustomer = await findCustomersInQuickBooks({ name: DisplayName });
    if (existingCustomer) {
        debug('createCustomerInQuickBooks::::::existingCustomer::::', existingCustomer);
        resolve(existingCustomer);
    }
    // Get Access Token
    const accessTokenObj = await getAccessToken();
    debug('createCustomerInQuickBooks::::::accessTokenObj::::', accessTokenObj);
    // Init Client if not already init.
    initQuickBooksClient(accessTokenObj);
    debug('qbo.createCustomerInQuickBooks:::name:::', DisplayName);
    debug('qbo.createCustomerInQuickBooks:::email:::', Address);
    // Create Customer
    qbo.createCustomer({
        DisplayName,
        PrimaryEmailAddr: {
            Address,
        },
    }, (err, customer) => {
        if (err) {
            debug('qbo.createCustomerInQuickBooks:::ERROR:::%e', err);
            reject(err);
        }
        debug('qbo.createCustomerInQuickBooks:::CUSTOMER CREATED:::', customer);
        resolve(customer);
    });
});

const createEstimateInQuickBooks = ({ customer, amount } = {}) => new Promise(async (resolve, reject) => {
    if (!INTUIT_AUTH_CODE) {
        debug('createEstimateInQuickBooks::::::INTUIT_AUTH_CODE ___NOT FOUND::::', INTUIT_AUTH_CODE);
        return resolve();
    }
    // Get Access Token
    const accessTokenObj = await getAccessToken();
    debug('createEstimateInQuickBooks::::::accessTokenObj::::', accessTokenObj);
    // Init Client if not already init.
    initQuickBooksClient(accessTokenObj);
    debug('qbo.createEstimateInQuickBooks:::customer:::', customer);
    debug('qbo.createEstimateInQuickBooks:::amount:::', amount);
    // Create Estimate
    qbo.createEstimate({
        TotalAmt: amount,
        BillEmail: {
            Address: customer.PrimaryEmailAddr.Address,
        },
        CustomerMemo: {
            value: 'Thank you for choosing vet appointment, we look forward to seeing you on-site for your appointment!',
        },
        Line: [
            {
                Description: 'Vet Services',
                DetailType: 'SalesItemLineDetail',
                SalesItemLineDetail: {
                    Qty: 1,
                    UnitPrice: amount,
                    ItemRef: {
                        name: 'Vet Services',
                        value: '22',
                    },
                    TaxCodeRef: {
                        value: 'TAX',
                    },
                },
                LineNum: 1,
                Amount: amount,
            },
        ],
        CustomerRef: {
            name: customer.DisplayName,
            value: customer.Id,
        },
    }, (err, estimate = {}) => {
        if (err) {
            debug('qbo.createEstimateInQuickBooks:::ERROR:::%e', err);
            reject(err);
        }
        debug('qbo.createEstimateInQuickBooks:::ESTIMATE Created:::', estimate);
        resolve(estimate);
    });
});

const sendEstimatePdf = ({ estimateId, sendTo } = {}) => new Promise(async (resolve, reject) => {
    if (!INTUIT_AUTH_CODE) {
        debug('sendEstimatePdf::::::INTUIT_AUTH_CODE ___NOT FOUND::::', INTUIT_AUTH_CODE);
        return resolve();
    }
    // Get Access Token
    const accessTokenObj = await getAccessToken();
    debug('sendEstimatePdf::::::accessTokenObj::::', accessTokenObj);
    // Init Client if not already init.
    initQuickBooksClient(accessTokenObj);
    debug('qbo.sendEstimatePdf:::estimateId:::', estimateId);
    debug('qbo.sendEstimatePdf:::sendTo:::', sendTo);
    // Create Estimate
    qbo.sendEstimatePdf(estimateId, sendTo, (err, estimate = {}) => {
        if (err) {
            debug('qbo.sendEstimatePdf:::ERROR:::%e', err);
            reject(err);
        }
        debug('qbo.sendEstimatePdf:::ESTIMATE Sent:::', estimate);
        resolve(estimate);
    });
});

module.exports = {
    getAuthorizationCodeFromIntuit,
    saveAuthorizationCodeFromIntuit,
    findCustomersInQuickBooks,
    createCustomerInQuickBooks,
    createEstimateInQuickBooks,
    sendEstimatePdf,
};

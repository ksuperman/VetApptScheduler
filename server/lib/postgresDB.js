const debug = require('debug')('vetapptschduler:Postgres');
const { Pool } = require('pg');
const PostgresError = require('../helpers/errors/PostgresError');

/**
 * Postgres Database handler Class.
 */
class Postgres {
    static __defaultOptions = {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    };

    /**
     * Constructor to create an instance of Postgres SQL database handler.
     */
    constructor(options = {}) {
        debug('constructor::options::', options);
        this.options = { ...Postgres.__defaultOptions, ...options };
        this.__pool = this.__createPool();
        this.__subscribePoolEvents();
    }

    /**
     * Internal Method to create the pool instance with options.
     */
    __createPool() {
        debug('__createPool::pool_created');
        return new Pool(this.options);
    }

    /**
     * Internal Method to subscribe to pool events.
     */
    __subscribePoolEvents() {
        // the pool will emit an error on behalf of any idle clients
        // it contains if a backend error or network partition happens
        this.__pool.on('error', this.__poolErrorHandler);
        debug('__subscribePoolEvents::subscribed_to_events');
    }

    __poolErrorHandler(err) {
        const details = {
            totalCount: this.__pool.totalCount,
            idleCount: this.__pool.idleCount,
            waitingCount: this.__pool.waitingCount,
        };
        throw new PostgresError(err.name, err.message, details);
    }

    /**
     * Method to get the Client instance from the connection pool.
     */
    getDBClientFromPool = async () => this.__pool.connect();
}

module.exports = Postgres;

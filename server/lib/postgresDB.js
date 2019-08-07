const debug = require('debug')('vetapptschduler:Postgres');
const { Pool } = require('pg');
const PostgresError = require('../helpers/errors/PostgresError');
const { isEmpty } = require('../utils/objectUtils');
const { getSQLTimeStampFromDate } = require('../utils/dateUtils');
/**
 * Postgres Database handler Class.
 */
class PostgresDBHandler {
    /**
     * Default options to connect to the postgres server
     */
    static get __defaultOptions() {
        return {
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        };
    }

    formatFieldValueForFieldType(fieldType, fieldValue) {
        if (fieldType) {
            const currentFieldDefaultValueType = this.FIELD_TYPES[fieldType];
            switch (currentFieldDefaultValueType) {
            case 'STRING':
                return fieldValue && fieldValue.toString();
            case 'DATE':
                return getSQLTimeStampFromDate(fieldValue);
            default:
                return currentFieldDefaultValueType;
            }
        }
    }

    /**
     * Field Types Mapping for Postgres SQL.
     */
    get FIELD_TYPES() {
        return {
            SERIAL: 'DEFAULT',
            STRING: 'STRING',
            DATE: 'DATE',
            TIMESTAMP: 'TIMESTAMP',
            NUMBER: 'NUMBER',
            BOOLEAN: 'BOOLEAN',
        };
    }

    /**
     * Constructor to create an instance of Postgres SQL database handler.
     */
    constructor(options = {}) {
        debug('constructor::options::', options);
        this.options = { ...PostgresDBHandler.__defaultOptions, ...options };
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
        debug('PostgresError::', err);
        debug('PostgresError::%e', err);
        throw new PostgresError(err.name, err.message, details);
    }

    /**
     * Method to get the Client instance from the connection pool.
     */
    async getDBClientFromPool() {
        debug('getDBClientFromPool');
        return this.__pool.connect();
    }

    /**
     * Method to fetch or insert One Record.
     */
    async fetchOrInsertOne(query, data) {
        debug('fetchOrInsertOne::query', query);
        debug('fetchOrInsertOne::data', data);
        // Fetch the Data from the Database.
        const result = await this.execute(query, data) || {};
        // Get the row from result
        debug('fetchOrInsertOne::result::rowCount::', result.rowCount);
        const { rows = [] } = result;
        if (!isEmpty(rows)) {
            return rows[0];
        }
        // By Default Return undefined
        return undefined;
    }

    /**
     * Method to fetch or insert One Record.
     */
    async fetchAllRows(query, data) {
        debug('fetchAllRows::query', query);
        debug('fetchAllRows::data', data);
        // Fetch the Data from the Database.
        const result = await this.execute(query, data) || {};
        // Get the row from result
        debug('fetchAllRows::result::rowCount::', result.rowCount);
        const { rows = [] } = result;
        if (!isEmpty(rows)) {
            return rows;
        }
        // By Default Return undefined
        return undefined;
    }


    /**
     * Method to execute an operation on a Database table.
     */
    async execute(query, data) {
        let result;
        let client;
        // Fetch the Data from the Database.
        try {
            client = await this.getDBClientFromPool();
            result = await client.query(query, data) || {};
        } catch (err) {
            debug('PostgresError::execute::', err);
            throw new PostgresError(err.routine, err.constraint, err.details);
        } finally {
            if (client) {
                client.release();
            }
        }
        // By Default Return undefined
        return result;
    }
}

module.exports = PostgresDBHandler;

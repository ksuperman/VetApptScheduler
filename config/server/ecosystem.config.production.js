module.exports = {
    apps: [{
        name: 'vetapptscheduler',
        script: '../../index.js',
        exec_mode: 'cluster',
        instances: 'max',
        max_memory_restart: '2G',
        cwd: '',
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        },
    }],
};

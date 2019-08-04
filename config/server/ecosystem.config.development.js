module.exports = {
    apps: [{
        name: 'vetapptscheduler',
        script: '../../index.js',
        autorestart: true,
        watch: true,
        env_development: {
            NODE_ENV: 'development',
        },
    }],
};

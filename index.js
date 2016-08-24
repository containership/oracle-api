'use strict';

const config = require('./package');
const _ = require('lodash');

function OracleComputeCloudAPI(options) {
    this.options = {
        baseUrl: `https://api-z27.compute.${options.datacenter}.oraclecloud.com`,
        timeout: 10000,
        headers: {
            'User-Agent': `${config.name} ${config.version}`,
            Accept: 'application/oracle-compute-v3+json',
            'Accept-Encoding': 'gzip;q=1.0, identity; q=0.5',
            'Content-Type': 'application/oracle-compute-v3+json'
        },
        pool: {
            maxSockets: Infinity
        },
        json: true,
        identity_domain: options.identity_domain
    };

    this.version = config.version;

    const endpoints = [
        'authentication',
        'instances',
        'machine_image',
        'networking',
        'shapes',
        'ssh_keys',
        'volumes'
    ];

    _.forEach(endpoints, (endpoint) => {
        _.merge(OracleComputeCloudAPI.prototype, require(`${__dirname}/lib/${endpoint}`)(this.options));
    }, this);
}

module.exports = OracleComputeCloudAPI;

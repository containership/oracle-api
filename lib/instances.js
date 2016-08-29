'use strict';

const _ = require('lodash');
const request = require('request');

module.exports = function(options) {
    const resource = 'instance';
    const create_resource = 'launchplan';

    return {

        get_instance(name, fn) {
            //Name leads with a /
            const request_options = _.defaults({
                url: `/instance${name}`,
                method: 'GET'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 200) {
                    return fn(new Error(body.message));
                }else{
                    return fn(undefined, body);
                }
            });
        },

        create_instances(instances, fn) {
            const request_options = _.defaults({
                url: `/${create_resource}/`,
                method: 'POST',
                json: instances
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 201) {
                    return fn(new Error(body.message));
                } else{
                    return fn(undefined, body);
                }
            });
        },

        delete_instance(instance, fn) {
            const request_options = _.defaults({
                url: `/${resource}/${instance}`,
                method: 'DELETE'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 204) {
                    return fn(new Error(body.message));
                } else{
                    return fn(undefined, body);
                }
            });
        }
    };
};

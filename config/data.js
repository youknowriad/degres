"use strict";

module.exports = {

    project1: [
        {
            version: '1',
            deps: {
                project2: { min: '1', max: '2' }
            }
        }
    ],

    project2: [
        {
            version: '2',
            deps: {}
        },
        {
            version: '1',
            deps: {}
        }
    ]
};

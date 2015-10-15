"use strict";

var Resolver = require('../../src/resolver/resolver');
var Graph = require('../../src/model/graph');

describe("Resolver test", () => {
    it("resolve", () => {
        var graph = new Graph({

            'metadata-data-ods': [
                {
                    version: '2.0.0',
                    deps: {
                        metadata: { 'min': '5', 'max': '6' }
                    }
                },
                {
                    version: '1.0.0',
                    deps: {
                        metadata: { 'min': '4', 'max': '5' }
                    }
                }
            ],
            portail: [
                {
                    version: '2.0.1',
                    deps: {
                        metadata: { 'min': '4', 'max': '5' },
                        query: { 'min': '6', 'max': '7' }
                    }
                }
            ],
            query: [
                {
                    version: '6.0.1',
                    deps: {
                        metadata: { 'min': '4', 'max': '5' },
                        superviseur: { 'min': '1', 'max': '2' }
                    }
                }
            ],
            metadata: [
                {
                    version: '5.0.0',
                    deps: {
                        superviseur: { 'min': '1', 'max': '2' }
                    }
                },
                {
                    version: '4.0.0',
                    deps: {
                        superviseur: { 'min': '1', 'max': '2' }
                    }
                }
            ],
            superviseur: [{
                version: '1.0.0',
                deps: {}
            }],
            deliveries: [{
                version: '1.0.0',
                deps: {
                    superviseur: { 'min': '1', 'max': '2' }
                }
            }]
        });

        expect(Resolver.resolve(graph)).toEqual([
            {
                project: 'superviseur',
                release: { version: '1.0.0', deps: {} }
            },
            {
                project: 'metadata',
                release: { version: '4.0.0', deps: { superviseur: { 'min': '1', 'max': '2' } } }
            },
            {
                project: 'metadata-data-ods',
                release: { version: '1.0.0', deps: { metadata: { 'min': '4', 'max': '5' } }}
            },
            {
                project: 'query',
                release: { version: '6.0.1', deps: {
                    metadata: { 'min': '4', 'max': '5' },
                    superviseur: { 'min': '1', 'max': '2' }
                } }
            },
            {
                project: 'portail',
                release: { version: '2.0.1', deps: {
                    metadata: { 'min': '4', 'max': '5' },
                    query: { 'min': '6', 'max': '7' }
                } }
            },
            {
                project: 'deliveries',
                release: { version: '1.0.0', deps: { superviseur: { 'min': '1', 'max': '2' } } }
            }
        ]);
    });
});

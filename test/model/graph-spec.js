"use strict";

var Graph = require('../../src/model/graph');

describe("Graph test", () => {
    it("getProjects", () => {
        let graph = new Graph({
            pr1: [],
            pr2: []
        });

        expect(graph.getProjects()).toEqual(['pr1', 'pr2']);
    });

    it("getProjectReleases", () => {
        let graph = new Graph({
            pr1: [{
                version: '1', deps: {}
            }]
        });

        expect(graph.getProjectReleases('pr1')).toEqual([{
            version: '1', deps: {}
        }]);
    });

    it("dropProject", () => {
        let graph = new Graph({
            pr1: [],
            pr2: []
        });

        let newGraph = graph.dropProject('pr1');
        expect(newGraph.graph).toEqual({
            pr2: []
        });
        expect(newGraph).not.toBe(graph);
    });

    it("dropProjectRelease", () => {
        let graph = new Graph({
            pr1: [
                { version: '1', deps: {} },
                { version: '2', deps: {} }
            ]
        });

        let newGraph = graph.dropProjectRelease('pr1', '2');
        expect(newGraph.graph).toEqual({
            pr1: [{ version: '1', deps: {} }]
        });
        expect(newGraph).not.toBe(graph);
    });
});

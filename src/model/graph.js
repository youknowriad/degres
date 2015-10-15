"use strict";

class Graph {
    constructor(graph) {
        this.graph = graph;
    }

    getProjects() {
        return Object.keys(this.graph);
    }

    getProjectReleases(project) {
        return this.graph[project];
    }

    dropProject(project) {
        var newGraph = {};
        Object.keys(this.graph).forEach(pr => {
            if (pr !== project) {
                newGraph[pr] = this.graph[pr];
            }
        });

        return new Graph(newGraph);
    }

    dropProjectRelease(project, version) {
        var newGraph = {};
        Object.keys(this.graph).forEach(pr => {
            if (pr === project) {
                newGraph[pr] = this.graph[pr].filter(re => re.version !== version);
            } else {
                newGraph[pr] = this.graph[pr];
            }
        });

        return new Graph(newGraph);
    }
}

module.exports = Graph;

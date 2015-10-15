"use strict";

var VersionComparator = require('../utils/version-comparator');
var ConstraintUtils = require('../utils/constraint-utils');

function getProjectReleaseMatchingConstraints(project, releases, constraints, fixedVersions) {
    var projectConstraint = constraints[project];
    var matches = releases.filter(release => {
        return (
            (!projectConstraint || VersionComparator.compare(release.version,  projectConstraint.min) >= 0 && VersionComparator.compare(release.version, projectConstraint.max) < 0)

                // Les dépendances du project courant valide toutes les autres dépendances
            && !Object.keys(release.deps).some(dep => {
                return (
                    (constraints[dep] && !ConstraintUtils.doIntersect(release.deps[dep], constraints[dep])) ||
                    (fixedVersions[dep] && VersionComparator.compare(fixedVersions[dep], release.deps[dep].min) < 0 || VersionComparator.compare(fixedVersions[dep], release.deps[dep].max) >= 0)
                );
            })
        );
    });

    return matches.length === 0 ? false : matches[0];
}

function getNextProject(output, graph, constraints, fixedVersions) {
    var projects = graph.getProjects();
    if (projects.length === 0) return true;

    // Get Leafs
    var leafs = projects.filter(project => {
        var projectReleases = graph.getProjectReleases(project);
        return projectReleases.length !== 0
            && !Object.keys(projectReleases[0].deps).some(pr => !fixedVersions[pr]);
    });

    if (leafs.length === 0) throw 'should not happen';

    var project = leafs[0];
    var release = getProjectReleaseMatchingConstraints(project, graph.getProjectReleases(project), constraints, fixedVersions);
    if (!release) return false;

    var newConstraints = ConstraintUtils.merge(constraints, release.deps);
    var newGraph = graph.dropProject(project);
    var newFixedVersions = JSON.parse(JSON.stringify(fixedVersions));
    newFixedVersions[project] = release.version;
    var newOutput = [];
    if (getNextProject(newOutput, newGraph, newConstraints, newFixedVersions)) {
        output.push({
            project: project,
            release: release
        });
        newOutput.forEach(r => {
            output.push(r);
        });

        return true;
    } else {
        var newGraph2 = graph.dropProjectRelease(project, release.version);
        return getNextProject(output, newGraph2, constraints, fixedVersions);
    }
}


class Resolver {
    static resolve(graph) {
        var output = [];
        getNextProject(output, graph, {}, {});

        return output;
    }
}

module.exports = Resolver;
